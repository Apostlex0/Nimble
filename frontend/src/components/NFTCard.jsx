import React from "react";

const NFTCard = ({ title, collection, buttonText }) => (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5 p-4">
      <div className="bg-purple-900/20 rounded-xl mb-4 aspect-[4/3] overflow-hidden">
        <img src="/api/placeholder/300/225" alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="space-y-1">
        <h4 className="font-semibold text-gray-100">{title}</h4>
        <p className="text-sm text-gray-400">{collection}</p>
        {buttonText && (
          <button className="mt-2 bg-purple-400 text-gray-900 text-sm px-4 py-1 rounded-full shadow-lg shadow-purple-500/50 hover:bg-purple-300 transition-colors">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );

export default NFTCard;