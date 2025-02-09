# Nimble

Nimble is an AI‐agent‐based solver network that helps users get the best price for swaps and also supports deposits and withdrawals in Morpho vaults. The network is chain‐agnostic and has been demonstrated on [Base](https://base.org/) for this project. The solver agents are built with [Coinbase’s AgentKit](https://github.com/coinbase/agentkit), and the frontend is deployed on OpSec.

### Deployment on OpSec
Click Here to open the [app](https://nimbleland.opsec.run/)

### Arbitrum Mainnet Contracts

| Contracts | Arbitrum Mainnet |
|-----------|------------------|
| [Agent Factory](https://github.com/PureBl00d/Nimble/blob/f98e68414b490ea866b618968a4f04cb877e6102/contracts/src/AgentFactory.sol) | [0xCddCD52F945704f8261A2d728F1EebFcAEEe6097](https://arbiscan.io/address/0xCddCD52F945704f8261A2d728F1EebFcAEEe6097#code) | 
| [Deposit](https://github.com/PureBl00d/Nimble/blob/4002797a2a315b85f81dacb7f4c55573b8ba22ce/contracts/src/Deposit.sol) | [0x3483cf26151F851cb6c4aB38c09ddf76E7c18377](https://arbiscan.io/address/0x3483cf26151F851cb6c4aB38c09ddf76E7c18377#code) | 

| Contracts | Base Mainnet |
|-----------|------------------|
| [Agent Factory](https://github.com/PureBl00d/Nimble/blob/f98e68414b490ea866b618968a4f04cb877e6102/contracts/src/AgentFactory.sol) | [0x7F870b560eBA4da0Ea1C547593e84d9F14CF3A6B](https://basescan.org/address/0x7F870b560eBA4da0Ea1C547593e84d9F14CF3A6B#code) | 
| [Deposit](https://github.com/PureBl00d/Nimble/blob/4002797a2a315b85f81dacb7f4c55573b8ba22ce/contracts/src/Deposit.sol) | [0x9DFCD5f16ea7402B1Ea364C9c23EE0416bbD0d4f](https://basescan.org/address/0x9DFCD5f16ea7402B1Ea364C9c23EE0416bbD0d4f#code) | 


## Table of Contents

1. [Overview](#overview)  
2. [Architecture](#architecture)  
   - [High-Level Flow](#high-level-flow)  
   - [Swap Infrastructure](#swap-infrastructure)  
   - [Deposit and Withdraw Infrastructure](#deposit-and-withdraw-infrastructure)
3. [Features](#features)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Configuration](#configuration)
   - [Running Locally](#running-locally)
5. [Usage](#usage)
   - [Swapping Assets](#swapping-assets)
   - [Depositing to Morpho Vaults](#depositing-to-morpho-vaults)
   - [Withdrawing from Morpho Vaults](#withdrawing-from-morpho-vaults)
6. [Deployment](#deployment)
7. [Project Status](#project-status)
8. [Contributing](#contributing)
9. [License](#license)


## 1. Overview

Nimble orchestrates a network of AI solver agents to:

- Find optimal swap routes for users across multiple liquidity pools and DEXes.
- Automate yield optimization for deposits and withdrawals in Morpho vaults.

This project consists of:
- Nimble Frontend – A user interface that interacts with the backends (Swap, Deposit, Withdraw).
- Swap Backend – Collects quotes from multiple solver agents and executes swaps at the best price.
- Deposit Backend – Finds the best vault for Morpho deposits, ensures optimal yields, and handles the deposit process.
- Withdraw Backend – Retrieves user funds from Morpho vaults, returning tokens seamlessly.


## 2. Architecture

The Nimble architecture has three major components: Swap Infrastructure, Deposit Infrastructure, and Withdraw Infrastructure. These are orchestrated by the Nimble Frontend.

### 2.1 High-Level Flow


User -> Nimble Frontend -> (Swap Backend | Deposit Backend | Withdraw Backend) -> User

1. User interacts with the Nimble Frontend.  
2. Frontend forwards requests to the appropriate backend.  
3. Backend leverages one or more solver agents (built with Coinbase’s AgentKit) to:
   - Run an auction among solver agents.
   - Retrieve best route (for swaps) or best vault (for deposits).
   - Execute the transaction on-chain.
4. Result is returned to the user (swapped assets or updated vault balance).

![image](https://github.com/user-attachments/assets/1c57f852-00f5-4d46-83b0-42f476013ed5)


### 2.2 Swap Infrastructure

The swap flow is:

1. User approves token spending to the Swap Contract.
2. Solver Agents each propose a quote (e.g., price, route, etc.).
3. Swap Contract runs an auction to pick the best solver agent.
4. Winning Solver Agent executes the swap and sends funds back to the user.

![image](https://github.com/user-attachments/assets/9d1c51fb-bb4d-4adf-9335-5d92bc351458)


### 2.3 Deposit and Withdraw Infrastructure

1. User gives approval to the Deposit Contract or Withdraw Contract.
2. Solver Agents propose yields (for deposits) or methods (for withdrawals).
3. Deposit or Withdraw Contract chooses the best agent based on yield or other optimization criteria.
4. Winning Agent finalizes depositing or withdrawing on behalf of the user.

![image](https://github.com/user-attachments/assets/c60113e2-f9a3-49c1-b5c7-f7287fdc8c0c)




## 3. Features

- Multi-Chain Compatibility: Designed to work on any EVM-compatible chain.
- AgentKit Integration: Leverages [Coinbase’s AgentKit](https://github.com/coinbase/agentkit) to build AI-driven solver agents.
- Optimized Swaps: Runs an auction to always secure the best swap price.
- Morpho Vault Deposits/Withdrawals: Automates yield optimization by selecting the highest-yield vault at deposit time and the appropriate vault for withdrawal.
- End-to-End Operational: Deployed on [Base](https://base.org/) for demonstration, with a functioning frontend on OpSec.


## 4. Getting Started

### 4.1 Prerequisites

- Node.js (v16+ recommended)  
- Yarn or npm  
- Git  
- Coinbase or another Web3 wallet for testing on Base or other test networks.

### 4.2 Installation

1. Clone this repository:
   
   git clone https://github.com/purebl00d/nimble.git
   
2. Install dependencies:
   
   cd nimble
   npm install
   

### 4.3 Configuration

- Copy .env.example to .env and fill in the required environment variables:
  
  cp .env.example .env
  
  - CDP_API_KEY_NAME: Key name of the CDP API Key
  - CDP_API_KEY_PRIVATE_KEY: CDP API KEY from coinbase developer kit.
  - OPENAI_API_KEY: you OPEN AI API key for the models 
  - NETWORK_ID: for example base-mainnet

### 4.4 Running Locally

1. Start the local dev server (frontend):
   
   yarn start
   
   This runs the Nimble frontend on [http://localhost:5171](http://localhost:5171).

2. Backends may each have separate start scripts (depending on how you organize your project):
   
   # Example
   yarn run swap-backend
   yarn run deposit-backend
   yarn run withdraw-backend
   


## 5. Usage

### 5.1 Swapping Assets

1. On the Nimble Frontend, connect your wallet (MetaMask or similar).
2. Navigate to the Swap tab.
3. Select tokens to swap.
4. Approve the contract for token spending (if prompted).
5. Click Swap.  
   - Nimble runs an internal auction among solver agents (e.g., agent 1, agent 2, agent 3).
   - The best quote is displayed, and the swap is executed.
6. Receipt of transaction will show up once confirmed.

### 5.2 Depositing to Morpho Vaults

1. Go to the Deposit section in the frontend.
2. Approve the deposit contract (if needed).
3. Enter the amount to deposit.
4. Click Deposit.  
   - The deposit contract finds the best vault (via an auction among the solver agents).
   - Your assets are deposited into the chosen vault for optimal yield.

### 5.3 Withdrawing from Morpho Vaults

1. Navigate to the Withdraw section.
2. Approve if required.
3. Enter the amount (or select “withdraw all”).
4. Click Withdraw.  
   - Nimble chooses the correct vault and handles the withdrawal on your behalf.
   - Funds are returned to your wallet.


## 6. Deployment

- Frontend is deployed on OpSec. If you want to deploy your own instance, configure hosting and run:
  
  npm run dev
  
  Then upload the build artifacts to your hosting service of choice.

- Smart Contracts are on Base (testnet or mainnet). You can adapt the deployment scripts to other EVM chains.


## 7. Project Status

- Alpha Release: The core functionality (swap, deposit, withdraw) is operational on Base for demonstration.  
- Next Steps:
  - Audit and security reviews.
  - Expand solver agent strategies for even better yields and swap quotes.
  - Expand to additional chains (e.g., Ethereum mainnet, Polygon, Arbitrum).

---

## 8. Contributing

We welcome contributions! To get started:

1. [Fork](https://github.com/YourUsername/nimble/fork) the repository.
2. Create a feature or bugfix branch: git checkout -b feature/your-feature.
3. Commit your changes with clear commit messages.
4. Push to your branch: git push origin feature/your-feature.
5. Create a Pull Request against the main branch.

Please open an issue first if you intend to make major changes, so we can coordinate.

---

## 9. License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

### Questions or Feedback?
Feel free to open a [GitHub issue](https://github.com/YourUsername/nimble/issues) or reach out to the Nimble team.

---

*Happy Swapping and Yielding!*
