import os
import sys
import time
import json

from flask import Flask, request, jsonify
from dotenv import load_dotenv
import requests

from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent

# Import CDP AgentKit LangChain extensions (new imports)
from coinbase_agentkit import (
    AgentKit,
    AgentKitConfig,
    EthAccountWalletProvider,
    EthAccountWalletProviderConfig,
    erc20_action_provider,
    pyth_action_provider,
    wallet_action_provider,
    weth_action_provider,
)
from coinbase_agentkit_langchain import get_langchain_tools
from eth_account import Account

# Configure a file to persist the agent's wallet data
wallet_data_file = "wallet2.json"
app = Flask(__name__)
load_dotenv()
MASTER_URL = "http://127.0.0.1:6000"  # The master server's endpoint
AGENT_ID = "agent_8001"
agent_executor = None
agent_config = None

# Define supported chains with their IDs and RPC URLs
CHAINS = {
    "1": {
        "name": "Ethereum Mainnet",
        "rpc_url": os.getenv("ETH_MAINNET_RPC_URL", "https://ethereum.publicnode.com")
    },
    "8453": {
        "name": "Base Mainnet",
        "rpc_url": os.getenv("BASE_MAINNET_RPC_URL", "https://mainnet.base.org")
    },
    "42161": {
        "name": "Arbitrum Mainnet",
        "rpc_url": os.getenv("ARBITRUM_MAINNET_RPC_URL", "https://arb1.arbitrum.io/rpc")
    },
    "10": {
        "name": "Optimism Mainnet",
        "rpc_url": os.getenv("OPTIMISM_MAINNET_RPC_URL", "https://mainnet.optimism.io")
    },
    "84532": {
        "name": "Base Sepolia",
        "rpc_url": os.getenv("BASE_SEPOLIA_RPC_URL", "https://sepolia.base.org")
    }
}

# Current chain ID - can be changed via API
CURRENT_CHAIN_ID = os.getenv("CHAIN_ID", "84532")  # Default to Base Sepolia

def initialize_agent(chain_id=None):
    """Initialize the agent with CDP AgentKit and return the agent + config."""
    global CURRENT_CHAIN_ID
    
    # Use provided chain_id or fall back to current chain ID
    if chain_id:
        CURRENT_CHAIN_ID = chain_id
    
    # Initialize LLM
    llm = ChatOpenAI(model="gpt-4o")

    # Load existing wallet data if available
    wallet_data = {}
    if os.path.exists(wallet_data_file):
        try:
            with open(wallet_data_file) as f:
                wallet_data = json.load(f)
                print(f"Loading existing wallet from {wallet_data_file}")
        except json.JSONDecodeError:
            print(f"Warning: Invalid wallet data")
            wallet_data = {}

    # Get or generate private key
    private_key = (
        os.getenv("PRIVATE_KEY")  # First priority: Environment variable
        or wallet_data.get("private_key")  # Second priority: Saved wallet file
        or Account.create().key.hex()  # Third priority: Generate new key
    )

    # Ensure private key has 0x prefix
    if not private_key.startswith("0x"):
        private_key = f"0x{private_key}"

    # Create Ethereum account from private key
    account = Account.from_key(private_key)

    # Get chain info
    if CURRENT_CHAIN_ID not in CHAINS:
        print(f"Warning: Chain ID {CURRENT_CHAIN_ID} not found in supported chains. Defaulting to Ethereum Mainnet.")
        CURRENT_CHAIN_ID = "1"  # Default to Ethereum Mainnet if invalid
    
    chain_info = CHAINS[CURRENT_CHAIN_ID]
    print(f"Initializing agent for {chain_info['name']} (Chain ID: {CURRENT_CHAIN_ID})")

    # Create the wallet provider config with RPC URL
    wallet_provider_config = EthAccountWalletProviderConfig(
        account=account,
        chain_id=CURRENT_CHAIN_ID,
        rpc_url=chain_info['rpc_url']
    )

    # Initialize Ethereum Account Wallet Provider
    wallet_provider = EthAccountWalletProvider(config=wallet_provider_config)

    # Initialize AgentKit
    agentkit = AgentKit(
        AgentKitConfig(
            wallet_provider=wallet_provider,
            action_providers=[
                erc20_action_provider(),
                pyth_action_provider(),
                wallet_action_provider(),
                weth_action_provider(),
            ],
        )
    )

    # Get tools for the agent
    tools = get_langchain_tools(agentkit)

    # Store buffered conversation history in memory
    memory = MemorySaver()
    config = {"configurable": {"thread_id": "Chatbot 2"}}

    # Save the wallet data after successful initialization
    new_wallet_data = {
        "private_key": private_key,
        "chain_id": CURRENT_CHAIN_ID,
        "created_at": time.strftime("%Y-%m-%d %H:%M:%S")
        if not wallet_data
        else wallet_data.get("created_at"),
    }

    with open(wallet_data_file, "w") as f:
        json.dump(new_wallet_data, f, indent=2)
        print(f"Wallet data saved to {wallet_data_file}")

    # Create ReAct Agent using the LLM and Ethereum Account Wallet tools
    chain_name = CHAINS[CURRENT_CHAIN_ID]['name']
    return (
        create_react_agent(
            llm,
            tools=tools,
            checkpointer=memory,
            state_modifier=(
                f"You are a helpful agent that can interact onchain using an Ethereum Account Wallet on {chain_name}. "
                f"You are currently connected to {chain_name} (Chain ID: {CURRENT_CHAIN_ID}). "
                "You are empowered to interact onchain using your tools. If you ever need funds, you can request "
                "them from the faucet if you are on network ID 'base-sepolia'. If not, you can provide your wallet "
                "details and request funds from the user. Before executing your first action, get the wallet details "
                "to see what network you're on. If there is a 5XX (internal) HTTP error code, ask the user to try "
                "again later. If someone asks you to do something you can't do with your currently available tools, "
                "you must say so, and encourage them to implement it themselves using the CDP SDK + Agentkit, "
                "recommend they go to docs.cdp.coinbase.com for more information. Be concise and helpful with your "
                "responses. Refrain from restating your tools' descriptions unless it is explicitly requested. "
                "If someone asks you to deposit or withdraw funds from a morpho vault or the best vault or the "
                "best morpho vault you will use this address to do the action. The address is going to be "
                "0xc1256Ae5FF1cf2719D4937adb3bbCCab2E00A2Ca for the vault on base mainnet. The address for USDC on "
                "base mainnet is 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913."
            ),
        ),
        config,
    )

def run_autonomous_mode(agent_executor, config, interval=10):
    """Run the agent autonomously with specified intervals."""
    print("Starting autonomous mode...")
    while True:
        try:
            # Provide instructions autonomously
            thought = (
                "Be creative and do something interesting on the blockchain. "
                "Choose an action or set of actions and execute it that highlights your abilities."
            )

            # Run agent in autonomous mode
            for chunk in agent_executor.stream(
                {"messages": [HumanMessage(content=thought)]}, config
            ):
                if "agent" in chunk:
                    print(chunk["agent"]["messages"][0].content)
                elif "tools" in chunk:
                    print(chunk["tools"]["messages"][0].content)
                print("-------------------")

            # Wait before the next action
            time.sleep(interval)

        except KeyboardInterrupt:
            print("Goodbye Agent!")
            sys.exit(0)

def run_chat_mode(agent_executor, config):
    """Run the agent interactively based on user input."""
    print("Starting chat mode... Type 'exit' to end.")
    while True:
        try:
            user_input = input("\nPrompt: ")
            if user_input.lower() == "exit":
                break

            # Run agent with the user's input in chat mode
            for chunk in agent_executor.stream(
                {"messages": [HumanMessage(content=user_input)]}, config
            ):
                if "agent" in chunk:
                    print(chunk["agent"]["messages"][0].content)
                elif "tools" in chunk:
                    print(chunk["tools"]["messages"][0].content)
                print("-------------------")

        except KeyboardInterrupt:
            print("Goodbye Agent!")
            sys.exit(0)

def choose_mode():
    """Choose whether to run in autonomous or chat mode based on user input."""
    while True:
        print("\nAvailable modes:")
        print("1. chat    - Interactive chat mode")
        print("2. auto    - Autonomous action mode")

        choice = input("\nChoose a mode (enter number or name): ").lower().strip()
        if choice in ["1", "chat"]:
            return "chat"
        elif choice in ["2", "auto"]:
            return "auto"
        print("Invalid choice. Please try again.")

@app.route('/chat', methods=['POST'])
def chat():
    global agent_executor, agent_config, CURRENT_CHAIN_ID
    
    data = request.get_json()
    if 'prompt' not in data:
        return jsonify({"error": "Missing 'prompt' in request"}), 400
    
    # Check if chain_id is provided in the request
    chain_id = data.get('chain_id')
    
    # If chain ID changed or agent not initialized, reinitialize
    if (chain_id and chain_id != CURRENT_CHAIN_ID) or not agent_executor:
        print(f"Reinitializing agent for chain ID: {chain_id}")
        agent_executor, agent_config = initialize_agent(chain_id)
        
    prompt = data['prompt']
    responses = []
    
    # Process the prompt through the agent
    for chunk in agent_executor.stream({"messages": [HumanMessage(content=prompt)]}, agent_config):
        if "agent" in chunk:
            responses.append(chunk["agent"]["messages"][0].content)
        elif "tools" in chunk:
            responses.append(chunk["tools"]["messages"][0].content)
            
    # Try to forward to master server
    try:
        master_payload = {
            "agent_id": AGENT_ID,
            "prompt": prompt,
            "response": "\n".join(responses)
        }
        requests.post(f"{MASTER_URL}/agent_response", json=master_payload)
    except Exception as e:
        print(f"Could not reach master server: {e}")
    
    return jsonify({"response": "\n".join(responses)})

def main():
    """Start the chatbot agent."""
    # Set up the agent
    agent_executor, agent_config = initialize_agent()

    # Run the agent in the selected mode
    mode = choose_mode()
    if mode == "chat":
        run_chat_mode(agent_executor=agent_executor, config=agent_config)
    elif mode == "auto":
        run_autonomous_mode(agent_executor=agent_executor, config=agent_config)

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "web":
        # Run as web server
        app.run(host='0.0.0.0', port=8001)
    else:
        # Run as CLI
        print("Starting Agent...")
        main()
