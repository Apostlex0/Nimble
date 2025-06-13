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
wallet_data_file = "wallet1.json"
app = Flask(__name__)
load_dotenv()
MASTER_URL = "http://127.0.0.1:6000"  # The master server's endpoint
AGENT_ID = "agent_8000"
agent_executor = None
agent_config = None

def initialize_agent():
    """Initialize the agent with CDP AgentKit and return the agent + config."""
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

    # Get chain ID from env or use default
    chain_id = os.getenv("CHAIN_ID", "84532")  # Default to Base Sepolia

    # Create the wallet provider config
    wallet_provider_config = EthAccountWalletProviderConfig(
        account=account,
        chain_id=chain_id,
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
    config = {"configurable": {"thread_id": "Chatbot 1"}}

    # Save the wallet data after successful initialization
    new_wallet_data = {
        "private_key": private_key,
        "chain_id": chain_id,
        "created_at": time.strftime("%Y-%m-%d %H:%M:%S")
        if not wallet_data
        else wallet_data.get("created_at"),
    }

    with open(wallet_data_file, "w") as f:
        json.dump(new_wallet_data, f, indent=2)
        print(f"Wallet data saved to {wallet_data_file}")

    # Create ReAct Agent using the LLM and Ethereum Account Wallet tools
    return (
        create_react_agent(
            llm,
            tools=tools,
            checkpointer=memory,
            state_modifier=(
                "You are a helpful agent that can interact onchain using an Ethereum Account Wallet. "
                "You have tools to send transactions, query blockchain data, and interact with contracts. "
                "If you run into a 5XX (internal) error, ask the user to try again later."
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
    global agent_executor, agent_config
    
    if not agent_executor:
        agent_executor, agent_config = initialize_agent()
        
    data = request.get_json()
    if 'prompt' not in data:
        return jsonify({"error": "Missing 'prompt' in request"}), 400
        
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
        app.run(host='0.0.0.0', port=8000)
    else:
        # Run as CLI
        print("Starting Agent...")
        main()
