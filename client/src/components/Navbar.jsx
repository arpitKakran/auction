import React from "react";
import auction_logo from "../assets/auction_logo.png";

const Navbar = () => {
  return (
    <nav className="w-full h-16 px-6 flex items-center justify-between bg-white border-b border-slate-200">

      {/* Left: Logo + System Name */}
      <div className="flex items-center gap-3">
        <img
          src={auction_logo}
          alt="Auction Logo"
          className="w-8 h-8"
        />

        <div className="leading-tight">
          <p className="text-lg font-semibold text-slate-900">
            IPL Auction
          </p>
          <p className="text-xs text-slate-500">
            Auction Management System
          </p>
        </div>
      </div>

      {/* Center: Neutral Tag */}
      <div className="hidden md:flex items-center px-4 py-1.5 bg-slate-100 rounded-full">
        <span className="text-xs font-medium text-slate-600">
          College Event Edition
        </span>
      </div>

      {/* Right: System Status */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>
        <span className="text-sm text-slate-600">
          System Active
        </span>
      </div>

    </nav>
  );
};

export default Navbar;
