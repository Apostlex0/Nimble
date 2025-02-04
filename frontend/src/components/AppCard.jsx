import React from "react"; 

function AppCard({ name, bgColor, logo, isEmptyCard }) {
    if (isEmptyCard) {
      return (
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-purple-900/30 shadow-lg shadow-purple-500/5 overflow-hidden hover:shadow-purple-500/10 transition-all duration-300">
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2 text-gray-200">Is your favourite app not listed here?</h3>
            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Tell Us.</a>
          </div>
        </div>
      );
    }
  
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-purple-900/30 shadow-lg shadow-purple-500/5 overflow-hidden hover:shadow-purple-500/10 transition-all duration-300">
        <div className={`h-40 ${bgColor} bg-opacity-20 flex items-center justify-center backdrop-blur-sm`}>
          <img src={logo} alt={`${name} logo`} className="w-20 h-20 rounded-full" />
        </div>
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-200">{name}</h3>
        </div>
      </div>
    );
  };

export default AppCard;