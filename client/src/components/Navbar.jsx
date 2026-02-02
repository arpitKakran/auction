import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full h-16 px-6 flex items-center justify-between bg-white border-b border-slate-200">
      
      {/* Left: App Title */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-slate-900">
          IPL Auction
        </span>
        <span className="text-sm text-slate-500">
          Admin Panel
        </span>
      </div>

      {/* Right: Status */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        <span className="text-sm text-slate-600">
          Live Setup
        </span>
      </div>

    </nav>
  );
};

export default Navbar;
