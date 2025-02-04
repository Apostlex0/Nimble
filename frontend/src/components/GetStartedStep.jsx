import React from "react"; 

const GetStartedStep = ({ number, text }) => (
    <div className="flex items-start gap-6 mb-6 pl-4">
      <div className="flex-shrink-0 w-8 h-8 bg-purple-400/10 rounded-lg flex items-center justify-center text-purple-400 border border-purple-900/30">
        {number}
      </div>
      <p className="text-lg text-gray-400 text-left max-w-xl">
        {text}
      </p>
    </div>
  );

export default GetStartedStep