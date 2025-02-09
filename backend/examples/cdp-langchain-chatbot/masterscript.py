import re
import requests
import json
import os
from flask import Flask, request, jsonify

app = Flask(__name__)

# 1) Store raw responses from each agent
#    Key = agent_id (e.g. "agent_5000"), Value = last raw response string
agent_responses = {}

# 2) Store parsed results from each agent
#    Key = agent_id, Value = list of dictionaries {eth_amount: tx_link}
parsed_agent_responses = {}

# List of agent endpoints if you also want to broadcast prompts from the master
AGENTS = [
    {"id": "agent_8000", "url": "http://127.0.0.1:8000/chat"},
    {"id": "agent_8001", "url": "http://127.0.0.1:8001/chat"},
    {"id": "agent_8002", "url": "http://127.0.0.1:8002/chat"},
]

# Define the absolute path to logs.json in the project root
LOGS_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logs.json")


def init_logs():
    """
    Initialize the logs file if it doesn't exist by writing an empty list.
    """
    if not os.path.exists(LOGS_FILE):
        with open(LOGS_FILE, "w") as f:
            json.dump([], f, indent=4)


def parse_trade_response(response_text: str) -> dict:
    """
    Parse the agent's response to extract:
      1. The amount of ETH received (float)
      2. The transaction link (URL)
    Returns a dict: { <float ETH amount>: <string transaction link> }
    If parsing fails, returns an empty dict.
    """
    # 1. Regex to find "received/for <float> ETH/eth"
    eth_amount_pattern = re.compile(r"(?:received|for)\s+([\d.]+)\s+(?:ETH|eth)", re.IGNORECASE)
    eth_amount_match = eth_amount_pattern.search(response_text)

    if not eth_amount_match:
        return {}

    eth_amount_str = eth_amount_match.group(1)

    try:
        eth_amount = float(eth_amount_str)
    except ValueError:
        return {}

    # 2. Regex to find first URL starting with https://
    link_pattern = re.compile(r"(https://\S+)", re.IGNORECASE)
    link_match = link_pattern.search(response_text)

    if not link_match:
        return {}

    tx_link = link_match.group(1)

    # Return { ETH_amount: "tx_link" }
    return {eth_amount: tx_link}


def log_callback_to_file(agent_id: str, agent_response: str, parsed_data: dict) -> None:
    """
    Overwrites logs.json with the current callback.
    This ensures that old logs are removed after every new request.
    """
    log_entry = {
        "agent_id": agent_id,
        "agent_response": agent_response,
        "parsed_data": parsed_data
    }
    # Overwrite the file with only the current log entry (as a list)
    with open(LOGS_FILE, "w") as f:
        json.dump([log_entry], f, indent=4)


@app.route("/agent_callback", methods=["POST"])
def agent_callback():
    """
    Agents call this endpoint with JSON:
      {
        "agent_id": "agent_5000",
        "response": "Full text from the agent..."
      }
    We'll store:
      - The raw text in agent_responses[agent_id]
      - The parsed result in parsed_agent_responses[agent_id]
      - Then overwrite logs.json with this new log (removing any old logs)
    """
    data = request.get_json() or {}
    agent_id = data.get("agent_id")
    agent_response = data.get("response")

    if not agent_id or not agent_response:
        return "Missing 'agent_id' or 'response'", 400

    # 1) Store the raw response
    agent_responses[agent_id] = agent_response

    # 2) Parse and store the amount => link
    parsed_data = parse_trade_response(agent_response)
    if parsed_data:
        parsed_agent_responses.setdefault(agent_id, []).append(parsed_data)

    # 3) Log to JSON (this will overwrite old logs)
    log_callback_to_file(agent_id, agent_response, parsed_data)

    return "Received", 200


@app.route("/get_all_responses", methods=["GET"])
def get_all_responses():
    """
    Retrieve both raw and parsed responses so far.
    (Returns JSON; does not print to the console.)
    """
    return jsonify({
        "raw_responses": agent_responses,
        "parsed_responses": parsed_agent_responses
    }), 200


@app.route("/send_prompt", methods=["POST"])
def send_prompt():
    """
    OPTIONAL endpoint: Broadcast a prompt to all agents and return immediate responses.
    JSON request body: {"prompt": "Swap 0.2 ETH..."}
    """
    data = request.get_json() or {}
    prompt = data.get("prompt")

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    immediate_responses = {}
    for agent in AGENTS:
        agent_id = agent["id"]
        agent_url = agent["url"]
        try:
            resp = requests.post(agent_url, json={"prompt": prompt})
            if resp.status_code == 200:
                rjson = resp.json()
                immediate_responses[agent_id] = rjson.get("response", "<no response>")
            else:
                immediate_responses[agent_id] = f"Error {resp.status_code}: {resp.text}"
        except Exception as e:
            immediate_responses[agent_id] = f"Could not reach agent: {e}"

    # (Optional) If you want to log these immediate responses, you could do so here.
    # For example:
    # for agent_id, response in immediate_responses.items():
    #     log_callback_to_file(agent_id, response, parse_trade_response(response))

    return jsonify({
        "immediate_responses": immediate_responses,
        "note": "Agents will callback to /agent_callback with final responses."
    }), 200


def main():
    """
    Start the master server on port 6000.
    """
    # Initialize the log file on startup (if it doesn't already exist)
    init_logs()

    print("Master server running on http://0.0.0.0:6000")
    app.run(host="0.0.0.0", port=6000, debug=True)


if __name__ == "__main__":
    main()