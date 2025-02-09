// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Agent.sol";

contract AgentFactory {
    // Array to store deployed Agent contracts
    Agent[] public agents;

    // Updated event includes the functionality information.
    event AgentCreated(
        address indexed agentAddress, 
        address owner, 
        string promptIPFSHash, 
        string functionality
    );

    /// @notice Anyone can create a new Agent by providing an IPFS hash for the prompt and the desired functionality.
    function createAgent(
        string memory _promptIPFSHash, 
        string memory _functionality
    ) public {
        Agent newAgent = new Agent(msg.sender, _promptIPFSHash, _functionality);
        agents.push(newAgent);
        emit AgentCreated(address(newAgent), msg.sender, _promptIPFSHash, _functionality);
    }

    /// @notice Optional helper function to retrieve the list of deployed Agents.
    function getAgents() public view returns (Agent[] memory) {
        return agents;
    }
}
