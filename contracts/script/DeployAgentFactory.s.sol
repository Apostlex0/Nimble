// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/AgentFactory.sol";

contract DeployAgentFactory is Script {
    function run() external {
        vm.startBroadcast();

        AgentFactory factory = new AgentFactory();

        vm.stopBroadcast();
        console.log("AgentFactory deployed to:", address(factory));
    }
}
