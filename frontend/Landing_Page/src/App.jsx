import React, { useEffect, useRef, useState } from "react";
import BaseLogo from "./assets/base.svg";
import PolygonLogo from "./assets/polygon.svg";
import ArbitrumLogo from "./assets/arbitrum.svg";
import OptimismLogo from "./assets/optimism.svg";
import UniswapLogo from "./assets/uniswap.svg";
import CowLogo from "./assets/cow.png";
import DydxLogo from "./assets/dydx.svg";
import InchLogo from "./assets/1inch.svg";
import BalancerLogo from "./assets/balancer.svg";
import SushiLogo from "./assets/sushiswap.svg";
import NimbleLogo from "./assets/logo.jpeg";
import Before from "./assets/before.jpeg";
import After from "./assets/after.jpeg";
import Eth from "./assets/ethereumlogo.webp";
import Sol from "./assets/solanalogo.svg";
import Arb from "./assets/arbitrumlogo.webp";
import Base from "./assets/baselogo.svg";
import Poly from "./assets/polygonlogo.svg";
import Attest from "./assets/attestation.jpeg";
import AppCard from "./components/AppCard.jsx";
import GetStartedStep from "./components/GetStartedStep.jsx";
import ContactSection from "./components/ContactSection.jsx";
import BenefitCard from "./components/BenefitCard.jsx";
import AppIcon from "./components/AppIcon.jsx";
import NFTCard from "./components/NFTCard.jsx";

function App() {
  const chains = [
    { name: "BASE", logo: BaseLogo },
    { name: "Polygon", logo: PolygonLogo },
    { name: "Arbitrum", logo: ArbitrumLogo },
    { name: "OP", logo: OptimismLogo },
  ];

  const currentPage = "home";

  const chainLogos = {
    base: {
      logo: Base,
      name: "Base Chain",
    },
    poly: {
      logo: Poly,
      name: "Polygon",
    },
    eth: {
      logo: Eth,
      name: "Ethereum",
    },
    arb: {
      logo: Arb,
      name: "Arbitrum",
    },
    sol: {
      logo: Sol,
      name: "Solana",
    },
  };

  const apps = [
    {
      name: "Uniswap",
      bgColor: "bg-gray-900",
      logo: UniswapLogo,
    },
    {
      name: "CoW AMM",
      bgColor: "bg-gray-900",
      logo: CowLogo,
    },
    {
      name: "1inch",
      bgColor: "bg-gray-900",
      logo: InchLogo,
    },
    {
      name: "DyDx",
      bgColor: "bg-gray-900",
      logo: DydxLogo,
    },
    {
      name: "Balancer",
      bgColor: "bg-gray-900",
      logo: BalancerLogo,
    },
    {
      name: "Sushiswap",
      bgColor: "bg-gray-900",
      logo: SushiLogo,
    },
  ];

  const steps = [
    "CCIP Protocol is used to settle intents across chains.",
    "Agents are built using CDP kit which search a chain for the best price.",
    "Agents quote the best price they can find across venues like 1inch",
    "The swap contract then sends user's funds to the auction winning agent.",
  ];

  const NavLink = ({ href, isActive, children }) => (
    <a
      href={href}
      className={`transition-colors duration-300 ${
        isActive
          ? "text-white font-medium"
          : "text-gray-400 hover:text-gray-200"
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
          <NavLink href="/" isActive={currentPage === "architecture"}>
            Architecture
          </NavLink>
          <NavLink href="/docs" isActive={currentPage === "docs"}>
            Docs
          </NavLink>
          <a href="" target="_blank" rel="noopener noreferrer">
            <button className="px-6 py-2 rounded-full border border-purple-400 text-purple-400 hover:bg-purple-400/10 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40">
              Launch App
            </button>
          </a>
        </div>
      </nav>
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-20 text-center relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"></div>
        </div>

        <h1 className="relative text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-8 mt-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500 animate-pulse-slow">
            AI agent powered
            <br />
            Intent Settlement Network
          </span>
          <div className="absolute -inset-2 bg-purple-400/20 blur-3xl -z-10"></div>
        </h1>

        <p className="text-2xl md:text-3xl mb-12 max-w-4xl mx-auto neon-purple-subtle">
          Any Token | Any Chain | Instantly
        </p>
        <a href="https://artemis-fp48.vercel.app" target="blank">
          <button className="bg-purple-400 text-gray-900 px-8 py-3 rounded-full text-lg font-medium hover:bg-purple-300 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/75 transform hover:-translate-y-0.5">
            Launch App
          </button>
        </a>

        {/* Blockchain Section */}
        <div className="mt-16 text-center relative">
          <h2 className="text-4xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">
            Trade Atomically Across
          </h2>

          {/* Scrolling Logo Container with enhanced styling */}
          <div className="relative w-full overflow-hidden mb-24">
            <div className="absolute inset-0 via-transparent to-gray-950 z-10"></div>
            <div className="flex whitespace-nowrap animate-scroll">
              {/* First set of logos */}
              <div className="flex items-center gap-20 mx-10">
                {chains.map((chain) => (
                  <div
                    key={chain.name}
                    className="w-48 h-24 flex items-center flex-shrink-0 rounded-xl p-2"
                  >
                    <img
                      src={chain.logo}
                      alt={chain.name}
                      className="w-full h-full opacity-90"
                    />
                  </div>
                ))}
              </div>
              {/* Duplicate set for seamless scrolling */}
              <div className="flex items-center gap-20 mx-10">
                {chains.map((chain) => (
                  <div
                    key={`${chain.name}-duplicate`}
                    className="w-48 h-24 flex items-center flex-shrink-0 rounded-xl p-2"
                  >
                    <img
                      src={chain.logo}
                      alt={chain.name}
                      className="w-full h-full opacity-90"
                    />
                  </div>
                ))}
              </div>
              {/* Third set for seamless scrolling */}
              <div className="flex items-center gap-20 mx-10">
                {chains.map((chain) => (
                  <div
                    key={`${chain.name}-triplicate`}
                    className="w-48 h-24 flex items-center flex-shrink-0 rounded-xl p-2"
                  >
                    <img
                      src={chain.logo}
                      alt={chain.name}
                      className="w-full h-full opacity-90"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Token Balance Text */}
          <h2 className="text-4xl mt-[-20px] font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">
            Let AI agents find the best price before you can even blink.
          </h2>

          {/* Coming Soon Badge */}
          <div className="inline-block mt-4 bg-gray-900/80 backdrop-blur-sm text-purple-400 px-6 py-2 rounded-full text-sm border border-purple-900/30 shadow-lg shadow-purple-500/20">
            Supports 3+ EVM chains
          </div>

          {/* Working system comparision */}

          {/* Try Chain Abstraction Section */}
          <section className="max-w-7xl mx-auto px-4 py-20 relative">
            {/* Add decorative background elements for depth */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-40 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
            </div>

            <h2 className="text-4xl mt-[-50px] font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500 animate-pulse-slow relative">
              Agents solve across
              <div className="absolute -inset-2 bg-purple-400/10 blur-3xl -z-10"></div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {apps.map((app, index) => (
                <AppCard
                  key={index}
                  name={app.name}
                  bgColor={app.bgColor}
                  logo={app.logo}
                />
              ))}
            </div>
          </section>

          {/* Get Started Section */}
          <section className="max-w-7xl mx-auto px-4 py-20 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm relative">
            {/* Add animated border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-transparent to-violet-500/20 opacity-20"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              {/* Left side - Video/Network Visualization */}
              <div className="relative group">
                <div className="aspect-video bg-gray-900/50 rounded-3xl border border-purple-900/30 shadow-lg shadow-purple-500/5 overflow-hidden transition-all duration-300 group-hover:shadow-purple-500/20">
                  {/* Background design elements */}
                  <div className="absolute inset-0">
                    <div className="absolute -bottom-20 -left-20">
                      <svg
                        width="200"
                        height="200"
                        viewBox="0 0 200 200"
                        fill="none"
                      >
                        <path
                          d="M0 200L200 0M50 200L200 50M100 200L200 100"
                          stroke="rgba(167, 139, 250, 0.1)"
                          strokeWidth="1"
                          className="animate-pulse-slow"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Video section with gradient overlay */}
                  <div className="relative">
                    {/* <video
                      className="w-full h-full object-cover opacity-80"
                      playsInline
                      muted
                      loop
                      autoPlay
                    >
                      <source src={Video} type="video/mp4" />
                    </video> */}

                    {/* Gradient overlay on top of the video */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Right side - Get Started Steps */}
              <div className="lg:pl-12">
                <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">
                  How Nimble Works
                </h2>

                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <GetStartedStep
                      key={index}
                      number={index + 1}
                      text={step}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* Learn More Section */}
          <section className="max-w-7xl mx-auto px-4 py-20 text-center relative">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-10 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500 animate-pulse-slow">
                Learn more about the magic behind Nimble's AI Agents and its
                Cross-Chain settlement features
                <div className="absolute -inset-2 bg-purple-400/10 blur-3xl -z-10"></div>
              </h2>

              <button className="mt-4 bg-purple-400 text-gray-900 px-8 py-3 rounded-full text-lg font-medium hover:bg-purple-300 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/75 transform hover:-translate-y-0.5">
                Click Here
              </button>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="max-w-7xl mx-auto px-4 py-20 text-center bg-gradient-to-b from-gray-900/50 to-gray-950/50 backdrop-blur-sm relative">
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-transparent to-violet-500/20 opacity-20"></div>

            <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">
                Benefits Beyond Money
              </h2>
            </div>
          </section>

          {/* Benefits Grid Section */}
          <section className="max-w-7xl mx-auto px-4 py-20 relative">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-900/50 to-gray-950/50 backdrop-blur-sm"></div>
              <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              {/* Left Column - Benefits 1 & 2 */}
              <div className="flex flex-col gap-8">
                <div className="flex-1">
                  <BenefitCard
                    title="Benefit 1"
                    description="Swap any token from any chain to get another token on any other chain"
                    animationDelay={0}
                  >
                    <div className="flex gap-4">
                      {["base", "poly", "eth", "arb", "sol"].map((chainId) => (
                        <AppIcon
                          key={chainId}
                          src={chainLogos[chainId].logo}
                          alt={chainLogos[chainId].name}
                        />
                      ))}
                    </div>
                  </BenefitCard>
                </div>

                <div className="flex-1">
                  <BenefitCard
                    title="Benefit 2"
                    description="AI Agents execute actions in LIT Protcol's MPC-TEE environment."
                    animationDelay={200}
                  ></BenefitCard>
                </div>
              </div>

              {/* Right Column - Benefit 3 */}
              <div className="h-full">
                <BenefitCard
                  title="Benefit 3"
                  description="Your swaps are executed by trusted AI Agents who hold on-chain attestaions as their reputation."
                  animationDelay={400}
                  className="h-full"
                >
                  <div className="h-full flex flex-col">
                    <img src={Attest} className="rounded-3xl"></img>
                  </div>
                </BenefitCard>
              </div>
            </div>
          </section>
          {/* Contact Section wrapper */}
          <div className="w-full relative">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-950 to-transparent"></div>
            </div>
            <ContactSection />
          </div>
        </div>
      </main>
    </div>
  );
}

const style = `
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }

  .animate-scroll {
    animation: scroll 20s linear infinite;
  }

  @keyframes pulse-slow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }

  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }

  @keyframes neonFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .neon-purple-subtle {
    background: linear-gradient(
      90deg,
      #a78bfa,  /* Purple base */
      #8b5cf6,  /* Slightly muted purple */
      #7c3aed,  /* Deep purple */
      #a78bfa   /* Back to base */
    );
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    text-shadow: 
      0 0 1px rgba(255, 255, 255, 0.8),
      0 0 3px rgba(167, 139, 250, 0.5);
    animation: neonFlow 8s linear infinite;
    position: relative;
    z-index: 1;
    transition: all 0.2s ease;
  }

  .neon-purple-subtle:hover {
    text-shadow: 
      0 0 1px rgba(255, 255, 255, 0.9),
      0 0 3px rgba(167, 139, 250, 0.7);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = style;
document.head.appendChild(styleSheet);

export default App;
