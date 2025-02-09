import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Settings, ArrowUpDown, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { BrowserProvider, Contract, parseEther } from 'ethers';

// Transaction steps component

const TransactionProgress = ({ isOpen, currentStep, onClose }) => {
  const [showCelebration, setShowCelebration] = useState(false);
  
  useEffect(() => {
    if (currentStep === 6) {
      setTimeout(() => {
        setShowCelebration(true);
      }, 500);
    }
  }, [currentStep]);

  if (!isOpen) return null;

  const steps = [
    "Query submitted to the agent",
    "Agents finding best venue for swaps",
    "Agents finding the best route for swaps",
    "Agents submitting the best route",
    "Agent auction",
    "Swapping according to winning route",
    "Swap completed"
  ];

  const getStepStatus = (index) => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "current";
    return "pending";
  };

  const Confetti = ({ index }) => {
    const colors = ['#22d3ee', '#a855f7', '#0ea5e9', '#7c3aed', '#06b6d4'];
    const delays = ['0s', '0.2s', '0.4s', '0.6s', '0.8s'];
    const sizes = ['w-2 h-2', 'w-3 h-3', 'w-2 h-2', 'w-4 h-4', 'w-2 h-2'];
    
    return (
      <div
        className={`absolute ${sizes[index % 5]} rounded-full animate-ping`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `-${Math.random() * 20}%`,
          backgroundColor: colors[index % 5],
          animationDuration: `${1 + Math.random() * 2}s`,
          animationDelay: delays[index % 5],
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    );
  };

  if (showCelebration) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-900/90 backdrop-blur-md z-50">
        <div className="relative w-full max-w-2xl mx-4 overflow-hidden">
          <div className="relative bg-slate-900 rounded-3xl border border-cyan-500/20 shadow-2xl p-8">
            {/* Confetti container */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <Confetti key={i} index={i} />
              ))}
            </div>

            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center py-8">
              <div className="w-20 h-20 mb-6 animate-bounce">
                <div className="w-full h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Swap Successful!
                </span>
              </h2>

              <div className="w-full max-w-md space-y-2 mb-6">
                <div className="flex justify-between items-center text-gray-300">
                  <span>You sold</span>
                  <span className="font-medium">0.01 USDC</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>You received</span>
                  <span className="font-medium">0.00000373 ETH</span>
                </div>
              </div>

              {/* Solver Rankings Section */}
              <div className="w-full max-w-md bg-slate-800/50 rounded-2xl p-6 mb-8 border border-cyan-500/10">
                <h3 className="text-gray-300 mb-4">Solver auction rankings</h3>
                <p className="text-sm text-gray-400 mb-4">8 out of 12 solvers submitted a solution</p>
                
                <div className="space-y-3">
                  {/* Winner */}
                  <div className="flex items-center justify-between bg-cyan-500/10 rounded-xl p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400">1</span>
                      <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center">
                        <span className="text-cyan-400 text-sm">F</span>
                      </div>
                      <span className="text-cyan-400">Fulcrum</span>
                    </div>
                    <span className="text-xs text-cyan-400 bg-cyan-400/20 px-3 py-1 rounded-full">
                      Winning solver
                    </span>
                  </div>
                  
                  {/* Runner ups */}
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">2</span>
                      <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">A</span>
                      </div>
                      <span className="text-gray-400">Arishem</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">3</span>
                      <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">T</span>
                      </div>
                      <span className="text-gray-400">Tiamut</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-medium hover:opacity-90 transition-opacity duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 mt-40 backdrop-blur-md bg-slate-900/90 flex items-center justify-center transition-all duration-500 ease-in-out">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 p-8 w-full max-w-2xl mx-4 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        
        <h3 className="text-2xl font-semibold text-gray-100 mb-8 flex items-center">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
            Transaction Progress
          </span>
        </h3>

        <div className="relative space-y-6">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isCompleted = status === 'completed';
            const isCurrent = status === 'current';
            
            return (
              <div key={index} className="relative">
                <div className="flex items-start group">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                        ${isCompleted ? 'bg-cyan-500/20' : isCurrent ? 'bg-purple-500/20' : 'bg-slate-700/30'}
                      `}>
                        {isCompleted && (
                          <CheckCircle2 className="w-6 h-6 text-cyan-400 animate-fadeIn" />
                        )}
                        {isCurrent && (
                          <div className="relative">
                            <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                            <div className="absolute inset-0 w-6 h-6 rounded-full bg-purple-400/20 animate-ping" />
                          </div>
                        )}
                        {!isCompleted && !isCurrent && (
                          <Circle className="w-6 h-6 text-slate-500" />
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className={`font-medium transition-all duration-300
                        ${isCompleted ? 'text-cyan-400' : isCurrent ? 'text-purple-400' : 'text-slate-500'}
                      `}>
                        {step}
                      </div>
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute left-5 top-10 w-px h-8 transition-all duration-500">
                    <div className={`w-full h-full transition-all duration-500 ease-in-out
                      ${isCompleted ? 'bg-gradient-to-b from-cyan-400 to-purple-400' : 'bg-slate-700'}
                    `} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const tokensList = [
  { name: 'Ethereum', symbol: 'ETH', icon: '◊' },
  { name: 'USD Coin', symbol: 'USDC', icon: '$' },
  { name: 'Tether', symbol: 'USDT', icon: 'T' },
  { name: 'Arbitrum', symbol: 'ARB', icon: 'A' },
  { name: 'Polygon', symbol: 'MATIC', icon: 'P' },
];

const chainsList = [
  { name: 'Ethereum', icon: '◊', id: 'ethereum' },
  { name: 'Polygon', icon: 'P', id: 'polygon' },
  { name: 'Base', icon: 'B', id: 'base' },
  { name: 'Arbitrum', icon: 'A', id: 'arbitrum' },
];

const App = () => {
  // Existing states
  const [userAddress, setUserAddress] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [fromTokenDropdownOpen, setFromTokenDropdownOpen] = useState(false);
  const [toTokenDropdownOpen, setToTokenDropdownOpen] = useState(false);
  const [fromChainDropdownOpen, setFromChainDropdownOpen] = useState(false);
  const [toChainDropdownOpen, setToChainDropdownOpen] = useState(false);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState(tokensList[0]);
  const [toToken, setToToken] = useState(tokensList[1]);
  const [fromChain, setFromChain] = useState(chainsList[0]);
  const [toChain, setToChain] = useState(chainsList[1]);
  const [isTransacting, setIsTransacting] = useState(false);
  const [transactionError, setTransactionError] = useState(null);

  const [hasApproved, setHasApproved] = useState(false);
  const [hasDeposited, setHasDeposited] = useState(false);

  // For demonstration, track the user’s wallet address


  // New states for transaction progress
  const [showTransactionProgress, setShowTransactionProgress] = useState(false);
  const [currentTransactionStep, setCurrentTransactionStep] = useState(0);

  const CONTRACT_ADDRESS = '0x7685885e0cb31fef3dddcfbdf6dde9bff6de318c';

const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "approver",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "Approved",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "depositor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

  // Simulate transaction progress
  const simulateTransactionProgress = async () => {
    setShowTransactionProgress(true);
    setCurrentTransactionStep(0);
    
    for (let i = 0; i < 7; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay between steps
      setCurrentTransactionStep(i + 1);
    }
    
    setTimeout(() => {
      setShowTransactionProgress(false);
      setCurrentTransactionStep(0);
      setIsTransacting(false);
    }, 2000);
  };

      const stepInterval = setInterval(() => {
      setCurrentTransactionStep(prev => {
        // Only advance if we're not at the last step
        if (prev < 5) return prev + 1;
        return prev;
      });
    }, 2000); // Move to next step every 2 seconds

  // Modified handleSwap function

  const handleApprove = async () => {
    setTransactionError(null);
    setIsTransacting(true);

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.approve(); // no value needed
      await tx.wait();

      setHasApproved(true);
      setIsTransacting(false);
    } catch (error) {
      console.error("Approve error:", error);
      setTransactionError(error.message);
      setIsTransacting(false);
    }
  };

  // ------------------------------------------------------------------
  // 3) Deposit
  //    - Calls the `deposit()` function with `msg.value`
  //    - fromAmount is the Ether user wants to deposit
  // ------------------------------------------------------------------
  const handleDeposit = async () => {
    setTransactionError(null);
    setIsTransacting(true);

    try {
      if (!fromAmount || parseFloat(fromAmount) <= 0) {
        throw new Error("Invalid deposit amount");
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Convert fromAmount (string) to wei
      const valueInWei = parseEther(fromAmount);

      const tx = await contract.deposit({ value: valueInWei });
      await tx.wait();

      setHasDeposited(true);
      setIsTransacting(false);
    } catch (error) {
      console.error("Deposit error:", error);
      setTransactionError(error.message);
      setIsTransacting(false);
    }
  };

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log('Connected address:', address);
        setUserAddress(address);
        setIsWalletConnected(true);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  const handleSwap = async () => {
    setTransactionError(null);
    setIsTransacting(true);
    setShowTransactionProgress(true);
    setCurrentTransactionStep(0);
  
    // Start the progressive animation
    let currentStep = 0;
    const progressInterval = setInterval(() => {
      currentStep++;
      if (currentStep < 6) { // Don't automatically progress to completion
        setCurrentTransactionStep(currentStep);
      }
    }, 2000); // 2 seconds per step
  
    try {
      // Send a POST request to your backend (port 9762)
      const response = await fetch("http://localhost:9762/run-script", {
        method: "POST",
      });
      
      // Parse the JSON response
      const data = await response.json();
      
      // Clear the progressive interval as transaction is complete
      clearInterval(progressInterval);
      
      // Move to final step
      setCurrentTransactionStep(6);
      
      // Handle completion
      setTimeout(() => {
        setShowTransactionProgress(false);
        setIsTransacting(false);
      }, 5000);
    } catch (error) {
      // Clear the progressive interval on error
      clearInterval(progressInterval);
      
      // Handle error state
      console.error("Swap error:", error);
      setTransactionError(error.message);
      setIsTransacting(false);
      setShowTransactionProgress(false);
    }
  };

  const handleSwapDirection = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);

    const tempChain = fromChain;
    setFromChain(toChain);
    setToChain(tempChain);

    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const getMainButtonAction = () => {
    if (!isWalletConnected) return handleConnectWallet;
    if (!hasApproved) return handleApprove;
    if (!hasDeposited) return handleDeposit;
    return handleSwap;
  };

  const getMainButtonLabel = () => {
    if (!isWalletConnected) return "Connect Wallet";
    if (!hasApproved) return "Approve";
    if (!hasDeposited) return "Deposit";
    return "Swap";
  };

  const TokenDropdown = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;
    
    return (
      <div className="absolute z-50 mt-2 w-64 bg-gray-900/95 backdrop-blur-md rounded-2xl border border-purple-900/30 shadow-lg shadow-purple-500/10">
        <div className="p-4 border-b border-gray-800">
          <input
            type="text"
            placeholder="Search tokens"
            className="w-full bg-gray-800 text-gray-100 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-400/20"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {tokensList.map((token) => (
            <div
              key={token.symbol}
              className="flex items-center gap-3 px-4 py-3 hover:bg-purple-400/5 cursor-pointer group"
              onClick={() => {
                onSelect(token);
                onClose();
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-lg">
                {token.icon}
              </div>
              <div>
                <div className="text-gray-100 group-hover:text-purple-400 transition-colors">
                  {token.symbol}
                </div>
                <div className="text-gray-500 text-sm">{token.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ChainDropdown = ({ isOpen, onClose, onSelect, selectedChain }) => {
    if (!isOpen) return null;
    
    return (
      <div className="absolute z-50 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-2xl border border-purple-900/30 shadow-lg shadow-purple-500/10 right-0">
        {chainsList.map((chain) => (
          <div
            key={chain.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-purple-400/5 cursor-pointer group"
            onClick={() => {
              onSelect(chain);
              onClose();
            }}
          >
            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-lg">
              {chain.icon}
            </div>
            <div className="text-gray-100 group-hover:text-purple-400 transition-colors">
              {chain.name}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const SwapField = ({ 
    label, 
    token, 
    chain,
    amount,
    setAmount,
    isTokenDropdownOpen,
    isChainDropdownOpen,
    setTokenDropdownOpen,
    setChainDropdownOpen,
    onTokenSelect,
    onChainSelect
  }) => (
    <div className="bg-gray-800/50 p-4 rounded-2xl border border-gray-700/30 relative">
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-400 text-sm">{label}</div>
        <div className="text-gray-400 text-sm">Balance: 0.0</div>
      </div>
      
      <div className="flex items-center justify-between gap-4">
        <style>
          {`
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            input[type=number] {
              -moz-appearance: textfield;
            }
          `}
        </style>
        <input 
          type="number" 
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-transparent text-3xl text-gray-100 outline-none w-1/2 font-light"
        />
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <button 
              className="flex items-center gap-2 bg-gray-700/50 hover:bg-purple-400/10 px-4 py-2 rounded-full transition-all duration-300 border border-gray-700/50 hover:border-purple-400/50 group"
              onClick={() => setTokenDropdownOpen(!isTokenDropdownOpen)}
            >
              {token ? (
                <>
                  <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                    {token.icon}
                  </div>
                  <span className="text-gray-100 group-hover:text-purple-400">{token.symbol}</span>
                </>
              ) : (
                <span className="text-gray-100 group-hover:text-purple-400">Select</span>
              )}
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
            </button>
            <TokenDropdown 
              isOpen={isTokenDropdownOpen}
              onClose={() => setTokenDropdownOpen(false)}
              onSelect={onTokenSelect}
            />
          </div>
          
          <div className="relative">
            <button 
              className="flex items-center gap-2 bg-gray-700/50 hover:bg-purple-400/10 px-3 py-2 rounded-full transition-all duration-300 border border-gray-700/50 hover:border-purple-400/50 group"
              onClick={() => setChainDropdownOpen(!isChainDropdownOpen)}
            >
              <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                {chain.icon}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
            </button>
            <ChainDropdown 
              isOpen={isChainDropdownOpen}
              onClose={() => setChainDropdownOpen(false)}
              onSelect={onChainSelect}
              selectedChain={chain}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative h-[90vh]">
        <div className="h-full flex items-center justify-center">
          <div className="max-w-lg w-full px-6">
            <div className="bg-gray-900/70 backdrop-blur-md rounded-3xl border border-purple-500/20 p-6 shadow-lg shadow-purple-500/5 relative">
              {!showTransactionProgress ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-medium text-gray-100">Swap</h2>
                    <button className="w-10 h-10 rounded-xl bg-gray-800/70 hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-all duration-300">
                      <Settings size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* ----- SwapField FROM ----- */}
                    <SwapField
                      label="From"
                      token={fromToken}
                      chain={fromChain}
                      amount={fromAmount}
                      setAmount={setFromAmount}
                      isTokenDropdownOpen={fromTokenDropdownOpen}
                      isChainDropdownOpen={fromChainDropdownOpen}
                      setTokenDropdownOpen={setFromTokenDropdownOpen}
                      setChainDropdownOpen={setFromChainDropdownOpen}
                      onTokenSelect={setFromToken}
                      onChainSelect={setFromChain}
                    />

                    <div className="flex justify-center">
                      <button
                        onClick={handleSwapDirection}
                        className="w-10 h-10 bg-gray-800/90 rounded-xl border border-purple-500/30 flex items-center justify-center text-purple-400 hover:text-purple-300 hover:border-purple-400/50 hover:bg-purple-400/10 transition-all duration-300"
                      >
                        <ArrowUpDown className="w-6 h-6" />
                      </button>
                    </div>

                    {/* ----- SwapField TO ----- */}
                    <SwapField
                      label="To"
                      token={toToken}
                      chain={toChain}
                      amount={toAmount}
                      setAmount={setToAmount}
                      isTokenDropdownOpen={toTokenDropdownOpen}
                      isChainDropdownOpen={toChainDropdownOpen}
                      setTokenDropdownOpen={setToTokenDropdownOpen}
                      setChainDropdownOpen={setToChainDropdownOpen}
                      onTokenSelect={setToToken}
                      onChainSelect={setToChain}
                    />
                  </div>

                  {/* ----- Main Button (Approve / Deposit / Swap) ----- */}
                  <button
                  className={`w-full mt-6 py-4 rounded-2xl font-medium transition-all duration-300 shadow-lg ${
                    isTransacting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-400 text-gray-900 hover:bg-purple-300 shadow-purple-500/50 hover:shadow-purple-500/75"
                  }`}
                  onClick={getMainButtonAction()}
                  disabled={isTransacting}
                >
                  {isTransacting ? "Processing..." : getMainButtonLabel()}
                </button>

                  {/* ----- Show Transaction Errors ----- */}
                  {transactionError && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                      {transactionError}
                    </div>
                  )}
                </>
              ) : (
                <TransactionProgress
                  isOpen={showTransactionProgress}
                  currentStep={currentTransactionStep}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;