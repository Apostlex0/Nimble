import React, { useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { SiDogecoin } from 'react-icons/si';
import { BsCurrencyDollar } from 'react-icons/bs';
import { FiInfo } from 'react-icons/fi';

const VaultCard = ({ icon: Icon, name, date, apy, liquidity, bgColor, onSelect, isSelected }) => (
  <div 
    onClick={onSelect}
    className={`${bgColor} ${isSelected ? 'ring-2 ring-purple-400' : ''} rounded-lg p-6 shadow-xl backdrop-blur-sm bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 cursor-pointer`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-gray-800">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-white font-semibold">{name}</h3>
          <p className="text-gray-400 text-sm">{date}</p>
        </div>
      </div>
      <FaEthereum className="w-5 h-5 text-gray-400" />
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-gray-400 mb-1">APY</p>
        <p className="text-emerald-400 font-bold text-xl flex items-center">
          {apy}% <span className="text-emerald-500 ml-1">⚡</span>
        </p>
      </div>
      <div>
        <p className="text-gray-400 mb-1">Liquidity</p>
        <p className="text-white font-bold text-xl">${liquidity}</p>
      </div>
    </div>
  </div>
);

const ActionButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-lg transition-all duration-300 ${
      active
        ? 'bg-purple-600/40 text-white border border-purple-500/50 shadow-[0_0_10px_rgba(147,51,234,0.3)]'
        : 'text-purple-300 hover:text-purple-200 border border-transparent'
    }`}
  >
    {children}
  </button>
);

const DepositWithdrawForm = ({ selectedVault }) => {
  const [amount, setAmount] = useState('');
  const [action, setAction] = useState('deposit'); // 'deposit' or 'withdraw'
  
  // Simulated values - replace with actual data
  const positionAmount = 1000.00;
  const walletBalance = 5000.00;
  const projectedEarnings = 120.00;

  const handleSubmit = async () => {
    try {
      if (action === 'deposit') {
        // Call the deposit endpoint on our backend
        const response = await fetch('http://localhost:9762/deposit', {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error(`Deposit failed. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Deposit success:", data);
        alert("Deposit successful!");
      } else {
        // Call the withdraw endpoint on our backend
        const response = await fetch('http://localhost:9762/withdraw', {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error(`Withdraw failed. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Withdraw success:", data);
        alert("Withdraw successful!");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-purple-900/20 rounded-xl p-6 backdrop-blur-sm border border-purple-500/20">
      {/* Action Toggle */}
      <div className="flex gap-4 mb-6">
        <ActionButton
          active={action === 'deposit'}
          onClick={() => setAction('deposit')}
        >
          Deposit
        </ActionButton>
        {positionAmount > 0 && (
          <ActionButton
            active={action === 'withdraw'}
            onClick={() => setAction('withdraw')}
          >
            Withdraw
          </ActionButton>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-purple-200">
              {action === 'deposit' ? 'Deposit USDC' : 'Withdraw USDC'}
            </span>
            <div className="flex items-center gap-2">
              <FiInfo className="text-purple-300" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="bg-transparent text-2xl text-white outline-none w-full"
            />
            <button 
              onClick={() => setAmount(action === 'deposit' ? walletBalance.toString() : positionAmount.toString())}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              MAX
            </button>
          </div>
          <div className="text-purple-400 text-sm mt-1">$0</div>
        </div>

        <div className="space-y-3">
          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
            <div className="flex justify-between text-purple-200">
              <span>My position (USDC)</span>
              <span>{positionAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
            <div className="flex justify-between text-purple-200">
              <span>
                {action === 'deposit' 
                  ? 'Projected Earnings / Year (USD)'
                  : 'Current Earnings (USD)'}
              </span>
              <span>{projectedEarnings.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/10">
            <div className="flex justify-between text-purple-200">
              <span>Wallet Balance (USD)</span>
              <span>{walletBalance.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          className="w-full bg-purple-600/40 hover:bg-purple-600/60 text-white mt-10 font-semibold py-3 px-4 rounded-lg transition-all duration-300 border border-purple-500/50 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]"
        >
          {action === 'deposit' ? 'Deposit' : 'Withdraw'}
        </button>
      </div>
    </div>
  );
};
const MyVaults = () => {
  const [selectedVaultIndex, setSelectedVaultIndex] = useState(0);
  
  const vaults = [
    {
      icon: BsCurrencyDollar,
      name: 'Smokehouse USDC',
      date: '24 Apr 2025 (74 days)',
      apy: '12.80',
      liquidity: '24.93M',
      bgColor: 'bg-purple-900',
      externalLink: 'https://app.morpho.org/ethereum/vault/0xBEeFFF209270748ddd194831b3fa287a5386f5bC/smokehouse-usdc'
    },
    {
      icon: SiDogecoin,
      name: 'Steakhouse USDC',
      date: '26 Jun 2025 (137 days)',
      apy: '6.78',
      liquidity: '35.60M',
      bgColor: 'bg-yellow-900',
      externalLink: 'https://app.morpho.org/ethereum/vault/0xBEEF01735c132Ada46AA9aA4c54623cAA92A64CB/steakhouse-usdc'
    },
    {
      icon: BsCurrencyDollar,
      name: 'Gauntlet USDC Core',
      date: '24 Apr 2025 (74 days)',
      apy: '9.32',
      liquidity: '66.80M',
      bgColor: 'bg-orange-900',
      externalLink:'https://app.morpho.org/ethereum/vault/0x8eB67A509616cd6A7c1B3c8C21D48FF57df3d458/gauntlet-usdc-core'
    }
  ];

    const handleVaultClick = (index, externalLink) => {
    setSelectedVaultIndex(index);
    // Open the external link in a new tab
    window.open(externalLink, '_blank', 'noopener noreferrer');
  };

  return (
    <div className="min-h-screen bg-transparent">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            VAULTS
          </h2>
          <p className="text-gray-400">Exit anytime at market price. Liquidity provision with minimal IL.</p>
        </div>
        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            {vaults.map((vault, index) => (
              <VaultCard 
                key={index} 
                {...vault} 
                onSelect={() => handleVaultClick(index, vault.externalLink)}
                isSelected={selectedVaultIndex === index}
              />
            ))}
          </div>
          <div className="w-96">
          <DepositWithdrawForm selectedVault={vaults[selectedVaultIndex]}  />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyVaults;