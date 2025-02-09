// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Agent {
    address public owner;
    string public promptIPFSHash;
    string public functionality; // e.g., "chatbot", "summarizer", etc.

    // Events
    event TaskRequested(address indexed requester, string taskInput);
    event ResultSubmitted(string result);

    constructor(
        address _owner, 
        string memory _promptIPFSHash, 
        string memory _functionality
    ) {
        owner = _owner;
        promptIPFSHash = _promptIPFSHash;
        functionality = _functionality;
    }

    // Anyone can trigger a task.
    function runTask(string memory taskInput) public {
        emit TaskRequested(msg.sender, taskInput);
    }

    // Only the owner can submit a result.
    function submitResult(string memory result) public {
        require(msg.sender == owner, "Only owner can submit results");
        emit ResultSubmitted(result);
    }
}
