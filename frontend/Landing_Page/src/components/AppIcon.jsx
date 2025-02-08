import React from "react";
const AppIcon = ({ src, alt }) => (
    <div className="w-14 h-14 p-2 rounded-xl overflow-hidden border border-purple-900/30 shadow-lg shadow-purple-500/10">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );

  export default AppIcon;