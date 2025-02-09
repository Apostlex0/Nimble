// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/AgentFactory.sol";
import "../src/Agent.sol";

contract AgentTest is Test {
    AgentFactory factory;

    function setUp() public {
        // Deploy a new AgentFactory for testing.
        factory = new AgentFactory();
    }

    function testCreateChatbotAgent() public {
        // Dummy IPFS hash and functionality (chatbot).
        string memory dummyHash = "QmDummyIPFSHash";
        string memory functionality = "chatbot";

        // Create a new Agent via the factory.
        factory.createAgent(dummyHash, functionality);

        // Retrieve the list of deployed agents.
        Agent[] memory agents = factory.getAgents();
        assertEq(agents.length, 1);

        Agent newAgent = agents[0];
        // In testing, msg.sender is address(this)
        assertEq(newAgent.owner(), address(this));
        assertEq(newAgent.promptIPFSHash(), dummyHash);
        assertEq(newAgent.functionality(), functionality);
    }
}
