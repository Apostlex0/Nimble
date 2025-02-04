import React, { useEffect, useRef, useState } from 'react';
import BaseLogo from './assets/base.svg';
import PolygonLogo from './assets/polygon.svg';
import ArbitrumLogo from './assets/arbitrum.svg';
import OptimismLogo from './assets/optimism.svg';
import UniswapLogo from './assets/uniswap.svg';
import CowLogo from './assets/cow.png';
import DydxLogo from './assets/dydx.svg';
import InchLogo from './assets/1inch.svg';
import BalancerLogo from './assets/balancer.svg';
import SushiLogo from './assets/sushiswap.svg';
import NimbleLogo from './assets/logo.jpeg';
import Before from './assets/before.jpeg';
import After from './assets/after.jpeg';
import Eth from './assets/ethereumlogo.webp';
import Sol from './assets/solanalogo.svg';
import Arb from './assets/arbitrumlogo.webp';
import Base from './assets/baselogo.svg';
import Poly from './assets/polygonlogo.svg';
import Attest from './assets/attestation.jpeg';

  function App() {
    const chains = [
      { name: 'BASE', logo: BaseLogo },
      { name: 'Polygon', logo: PolygonLogo },
      { name: 'Arbitrum', logo: ArbitrumLogo },
      { name: 'OP', logo: OptimismLogo }
    ];
  
    const currentPage = 'home';
  
    const chainLogos = {
      base: {
        logo: Base,
        name: 'Base Chain',
      },
      poly: {
        logo: Poly,
        name: 'Polygon',
      },
      eth: {
        logo: Eth,
        name: 'Ethereum',
      },
      arb: {
        logo: Arb,
        name: 'Arbitrum',
      },
      sol: {
        logo: Sol,
        name: 'Solana',
      }
    };
  
    const apps = [
      {
        name: 'Uniswap',
        bgColor: 'bg-gray-900',
        logo: UniswapLogo
      },
      {
        name: 'CoW AMM',
        bgColor: 'bg-gray-900',
        logo: CowLogo
      },
      {
        name: '1inch',
        bgColor: 'bg-gray-900',
        logo: InchLogo
      },
      {
        name: 'DyDx',
        bgColor: 'bg-gray-900',
        logo: DydxLogo
      },
      {
        name: 'Balancer',
        bgColor: 'bg-gray-900',
        logo: BalancerLogo
      },
      {
        name: 'Sushiswap',
        bgColor: 'bg-gray-900',
        logo: SushiLogo
      }
    ];

    const NavLink = ({ href, isActive, children }) => (
      <a 
        href={href}
        className={`transition-colors duration-300 ${
          isActive 
            ? 'text-white font-medium' 
            : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        {children}
      </a>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-gray-950">
       {/* Navigation Bar */}
       <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-2 bg-[#0a032d] backdrop-blur-sm border-b border-purple-900/30">
        <div className="flex items-center">
          <img 
            src={NimbleLogo}
            alt="Nimble Wallet Logo"
            className="h-12 opacity-90"
          />
        </div>
        <div className="flex items-center gap-8">
          <NavLink 
            href="https://github.com/x-senpai-x/Artemis?tab=readme-ov-file#architecture-of-the-orderflow" 
            isActive={currentPage === 'architecture'}
          >
            Architecture
          </NavLink>
          <NavLink 
            href="/docs" 
            isActive={currentPage === 'docs'}
          >
            Docs
          </NavLink>
          <a 
            href="https://artemis-fp48.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button className="px-6 py-2 rounded-full border border-purple-400 text-purple-400 hover:bg-purple-400/10 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40">
              Launch App
            </button>
          </a>
        </div>
      </nav>
    </div>
  )
}

export default App
