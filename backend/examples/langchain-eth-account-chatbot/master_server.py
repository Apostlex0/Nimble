import os
import json
from flask import Flask, request, jsonify, render_template_string
from dotenv import load_dotenv
import requests
import datetime

app = Flask(__name__)
load_dotenv()

# Storage for agent responses
agents = {
    "agent_8000": {"name": "Agent 1", "responses": []},
    "agent_8001": {"name": "Agent 2", "responses": []},
    "agent_8002": {"name": "Agent 3", "responses": []}
}

# Simple HTML template for the dashboard
DASHBOARD_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Multi-Agent Dashboard</title>
    <meta http-equiv="refresh" content="5">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; }
        .card { border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 20px; }
        .card h2 { margin-top: 0; color: #333; }
        .response { background-color: #f9f9f9; padding: 10px; border-radius: 4px; margin-top: 10px; }
        .prompt { color: #0066cc; font-weight: bold; }
        .timestamp { color: #666; font-size: 0.8em; }
        .header { display: flex; justify-content: space-between; align-items: center; }
        .form-container { margin-bottom: 20px; }
        textarea { width: 100%; height: 100px; padding: 10px; margin-bottom: 10px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        select { padding: 8px; width: 100%; max-width: 300px; }
        button { padding: 10px 15px; background-color: #0066cc; color: white; border: none; 
                border-radius: 4px; cursor: pointer; }
        button:hover { background-color: #0052a3; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Multi-Agent Blockchain Dashboard</h1>
        
        <div class="form-container">
            <h2>Send Command to All Agents</h2>
            <form action="/broadcast" method="post">
                <div class="form-group">
                    <textarea name="prompt" placeholder="Enter your command here..."></textarea>
                </div>
                <div class="form-group">
                    <label for="chain">Select Blockchain:</label>
                    <select name="chain" id="chain">
                        <option value="1">Ethereum Mainnet</option>
                        <option value="8453">Base Mainnet</option>
                        <option value="42161">Arbitrum Mainnet</option>
                        <option value="10">Optimism Mainnet</option>
                        <option value="84532">Base Sepolia (Testnet)</option>
                    </select>
                </div>
                <button type="submit">Send to All Agents</button>
            </form>
        </div>
        
        {% for agent_id, agent in agents.items() %}
        <div class="card">
            <div class="header">
                <h2>{{ agent.name }} ({{ agent_id }})</h2>
            </div>
            
            {% for response in agent.responses|reverse %}
            <div class="response">
                <div class="prompt">Prompt: {{ response.prompt }}</div>
                <div>{{ response.message|safe|replace('\n', '<br>') }}</div>
                <div class="timestamp">{{ response.time }}</div>
            </div>
            {% endfor %}
        </div>
        {% endfor %}
    </div>
</body>
</html>
"""

@app.route('/')
def dashboard():
    """Display the dashboard with all agent responses."""
    return render_template_string(DASHBOARD_TEMPLATE, agents=agents)

@app.route('/agent_response', methods=['POST'])
def agent_response():
    """Handle responses from individual agents."""
    data = request.get_json()
    
    if not data or not all(k in data for k in ('agent_id', 'prompt', 'response')):
        return jsonify({"error": "Missing required fields"}), 400
        
    agent_id = data['agent_id']
    prompt = data['prompt']
    response = data['response']
    
    if agent_id in agents:
        # Add the response to the agent's history
        import datetime
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        agents[agent_id]['responses'].append({
            'prompt': prompt,
            'message': response,
            'time': timestamp
        })
        
        # Keep only the last 10 responses
        if len(agents[agent_id]['responses']) > 10:
            agents[agent_id]['responses'] = agents[agent_id]['responses'][-10:]
            
        return jsonify({"status": "success"})
    else:
        return jsonify({"error": f"Unknown agent ID: {agent_id}"}), 404

@app.route('/broadcast', methods=['POST'])
def broadcast():
    """Broadcast a prompt to all agent endpoints."""
    prompt = request.form.get('prompt')
    chain_id = request.form.get('chain', '1')  # Default to Ethereum mainnet if not specified
    
    if not prompt:
        return "No prompt provided", 400
        
    # Map chain IDs to readable names for display
    chain_names = {
        "1": "Ethereum Mainnet",
        "8453": "Base Mainnet",
        "42161": "Arbitrum Mainnet",
        "10": "Optimism Mainnet",
        "84532": "Base Sepolia (Testnet)"
    }
    
    chain_name = chain_names.get(chain_id, f"Chain ID {chain_id}")
    
    # This function doesn't directly call the agents but provides
    # instructions on how to do so in the response
    
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Add a system message to all agents
    for agent_id in agents:
        agents[agent_id]['responses'].append({
            'prompt': f"[BROADCAST] {prompt} (on {chain_name})",
            'message': f"This broadcast command will be sent to all agents when you start them with the 'web' parameter. Chain: {chain_name} (ID: {chain_id})",
            'time': timestamp
        })
        
        # Try to send the command to running agents
        try:
            port = agent_id.split('_')[1]
            agent_url = f"http://127.0.0.1:{port}/chat"
            payload = {
                "prompt": prompt,
                "chain_id": chain_id
            }
            requests.post(agent_url, json=payload, timeout=0.5)  # Non-blocking request
        except Exception as e:
            print(f"Could not reach agent {agent_id}: {e}")
    
    return render_template_string(
        DASHBOARD_TEMPLATE, 
        agents=agents, 
        message=f"Command broadcast successfully on {chain_name}! Agents have been notified if they are running."
    )

if __name__ == '__main__':
    print("Starting Master Server on port 6000")
    app.run(host='0.0.0.0', port=6000, debug=True)
