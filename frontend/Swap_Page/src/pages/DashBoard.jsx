import React, { useState } from 'react';
import baseIcon from '../assets/BaseIcon.jpeg';
import { BiDollar } from 'react-icons/bi';
import { FiExternalLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { FaWallet } from 'react-icons/fa';

const BalanceCard = ({ icon: Icon, title, amount, action, actionText }) => (
  <div className="bg-opacity-10 bg-purple-900 rounded-xl p-6 backdrop-blur-sm flex-1 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
    <div className="flex items-center gap-2 text-purple-300 mb-4">
      <Icon className="w-5 h-5" />
      <span>{title}</span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-bold text-white">${amount}</span>
      {action && (
        <button 
          className="px-4 py-1 bg-purple-600/40 hover:bg-purple-600/60 rounded-full text-purple-200 text-sm transition-all duration-300 border border-purple-500/50 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)]"
          onClick={action}
        >
          {actionText}
        </button>
      )}
    </div>
  </div>
);

const TabButton = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 ${
      active 
        ? 'text-white border-b-2 border-purple-500 shadow-[0_4px_10px_rgba(147,51,234,0.3)]' 
        : 'text-purple-300 hover:text-purple-200'
    } transition-all duration-300`}
  >
    {children}
  </button>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Assets');
  const [activeView, setActiveView] = useState('USD');
  
  const walletAddress = '0x9f5461a077d145d2ee1f55f246c19bd3eb52b591';
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

  return (
    <div className="h-[calc(100vh-64px)] mt-5 overflow-y-auto bg-transparent text-white">
      {/* Header */}
      <div className="border-b border-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-full text-purple-200 hover:bg-purple-600/30 transition-all duration-300 border border-purple-500/50 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)]">
              <img src={baseIcon} alt="Base Icon" className="w-5 h-5" />
                Base
              </button>
              <h1 className="text-3xl font-semibold">DASHBOARD</h1>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-full text-purple-200 hover:bg-purple-600/30 transition-all duration-300 border border-purple-500/50 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)]">
            <FaWallet size={20} />
              <span>{shortAddress}</span>
              <FiExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <BalanceCard 
            icon={BiDollar}
            title="My Current Balance"
            amount="0"
          />
          <BalanceCard 
            icon={BiDollar}
            title="My Claimable Yield & Rewards"
            amount="0"
            action={() => {}}
            actionText="Claim"
          />
          <BalanceCard 
            icon={BiDollar}
            title="External Rewards"
            amount="0"
            action={() => {}}
            actionText="Nothing to Claim"
          />
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex justify-between items-center border-b border-purple-900/50">
            <div className="flex gap-3">
              <TabButton 
                active={activeTab === 'My Positions'}
                onClick={() => setActiveTab('My Positions')}
              >
                My Positions
              </TabButton>
            </div>

            <div className="flex items-center gap-2 p-1 bg-purple-600/20 rounded-lg border border-purple-500/30">
              <button 
                onClick={() => setActiveView('USD')}
                className={`px-4 py-1 rounded transition-all duration-300 ${
                  activeView === 'USD' 
                    ? 'bg-purple-600/40 text-white border border-purple-500/50 shadow-[0_0_10px_rgba(147,51,234,0.3)]' 
                    : 'text-purple-300 hover:text-purple-200'
                }`}
              >
                USD
              </button>
              <button 
                onClick={() => setActiveView('Underlying')}
                className={`px-4 py-1 rounded transition-all duration-300 ${
                  activeView === 'Underlying' 
                    ? 'bg-purple-600/40 text-white border border-purple-500/50 shadow-[0_0_10px_rgba(147,51,234,0.3)]' 
                    : 'text-purple-300 hover:text-purple-200'
                }`}
              >
                Underlying
              </button>
            </div>
          </div>

          {/* Position Types */}
          <div className="flex gap-6 mt-4 border-b border-purple-900/50 pb-2">
            <button 
              className="text-white border-b-2 border-purple-500 px-2 shadow-[0_4px_10px_rgba(147,51,234,0.3)]"
            >
              All Assets
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-purple-300 mb-6">You do not have any positions yet.</p>
          <button 
            onClick={() => navigate('/markets')}
            className="px-6 py-2 bg-purple-600/40 hover:bg-purple-600/60 rounded-lg transition-all duration-300 border border-purple-500/50 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] text-purple-200"
          >
            View Markets
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;