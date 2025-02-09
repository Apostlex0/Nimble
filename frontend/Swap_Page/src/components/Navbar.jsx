import React from 'react';
import { Link } from 'react-router-dom';
import NimbleLogo from '../assets/logo.jpeg';

export default function Navbar() {
  return (
    <nav className="fixed top-0 p-4 flex justify-between items-center w-full backdrop-blur-md z-50 border-b border-purple-900/40">
      <div className="flex items-center px-1 space-x-2">
        {/* <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-lg px-2 flex items-center justify-center transform rotate-45">
          <div className="-rotate-45">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div> */}

        <span className="text-3xl font-['Inter'] font-light px-1 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
        <Link to="/" className='font-bold'> 
          <img 
            src={NimbleLogo}
            alt="Nimble Wallet Logo"
            className="h-12 opacity-90"
          />
        </Link>
        </span>
      </div>
      <div className="space-x-4 flex justify-center items-center">
        <Link to="/swap" className="text-cyan-500/80 px-2 hover:text-blue-400 transition-colors">
        <button className="relative px-6 py-3 text-blue-200/60 rounded-full 
    bg-transparent
    transition-all duration-300
    hover:shadow-[0_0_20px_rgba(129,140,248,0.6)]
    hover:text-indigo-400
    hover:border-indigo-400
    hover:text-bold
    group">
      <div className="relative z-10">
        Swap
      </div>
      <div className="absolute inset-0 rounded-full group-hover:bg-cyan-400/10 transition-all duration-300" />
    </button>
        </Link>
        <Link to="/myvaults" className="text-cyan-500/80 hover:text-blue-400 px-2 transition-colors">
        <button className="relative px-6 py-3 text-blue-200/60 rounded-full 
    bg-transparent
    transition-all duration-300
    hover:shadow-[0_0_20px_rgba(129,140,248,0.6)]
    hover:text-indigo-400
    hover:border-indigo-400
    hover:text-bold
    group">
      <div className="relative z-10">
        MyVaults
      </div>
      <div className="absolute inset-0 rounded-full group-hover:bg-cyan-400/10 transition-all duration-300" />
    </button>
        </Link>
        <Link to="/Dashboard" className="text-cyan-500/80 px-2 hover:text-blue-400 transition-colors">
        <button className="relative px-6 py-3 text-blue-200/60 rounded-full 
    bg-transparent
    transition-all duration-300
    hover:shadow-[0_0_20px_rgba(129,140,248,0.6)]
    hover:text-indigo-400
    hover:border-indigo-400
    hover:text-bold
    group">
      <div className="relative z-10">
        Dashboard
      </div>
      <div className="absolute inset-0 rounded-full group-hover:bg-cyan-400/10 transition-all duration-300" />
    </button>
        </Link>
      </div>
    </nav>
  );
}
