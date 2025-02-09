// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SimpleDepositAndApprove {
    // Mapping to store deposits for each address
    mapping(address => uint256) public balanceOf;

    // Event to log successful deposits
    event Deposit(address indexed depositor, uint256 amount);

    // Event to log approvals
    event Approved(address indexed approver, string message);

    // 1) Deposit function
    // Allows users to send Ether to the contract, 
    // and keeps track of how much each address has deposited.
    function deposit() external payable {
        require(msg.value > 0, "Cannot deposit 0 Ether");
        balanceOf[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // 2) Approve function
    // A simple function to demonstrate an approval action.
    // In a real-world scenario, you'd implement logic related to allowance 
    // or other approval details here.
    function approve() external {
        // Your approval logic can go here if needed
        emit Approved(msg.sender, "Approval successful");
    }
}
