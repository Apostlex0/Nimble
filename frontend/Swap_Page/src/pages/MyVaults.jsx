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

  const handleSubmit = () => {
    if (action === 'deposit') {
      // Handle deposit logic
      console.log('Depositing:', amount);
    } else {
      // Handle withdraw logic
      console.log('Withdrawing:', amount);
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
      name: 'sUSDA Pool',
      date: '24 Apr 2025 (74 days)',
      apy: '30.54',
      liquidity: '7.01M',
      bgColor: 'bg-purple-900'
    },
    {
      icon: SiDogecoin,
      name: 'scrvUSD Pool',
      date: '26 Jun 2025 (137 days)',
      apy: '29.7',
      liquidity: '115,253',
      bgColor: 'bg-yellow-900'
    },
    {
      icon: BsCurrencyDollar,
      name: 'syrupUSDC Pool',
      date: '24 Apr 2025 (74 days)',
      apy: '21.64',
      liquidity: '12.51M',
      bgColor: 'bg-orange-900'
    }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Vaults
          </h2>
          <p className="text-gray-400">Exit anytime at market price. Liquidity provision with minimal IL.</p>
        </div>

        <div className="flex gap-4 mb-8">
          <button className="px-4 py-2 rounded-lg bg-purple-600 bg-opacity-20 text-purple-400 hover:bg-opacity-30 transition-all">
            🔥 Popular
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800 bg-opacity-20 text-gray-400 hover:bg-opacity-30 transition-all">
            ⭐ Favourites
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800 bg-opacity-20 text-gray-400 hover:bg-opacity-30 transition-all">
            💎 All Active
          </button>
        </div>

        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            {vaults.map((vault, index) => (
              <VaultCard 
                key={index} 
                {...vault} 
                onSelect={() => setSelectedVaultIndex(index)}
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