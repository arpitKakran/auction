import React, { useContext } from "react";
import auction_logo from "../assets/auction_logo.png";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { logoutUser,isLoggedIn,setShowLogin } = useContext(AppContext);

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

      {/* Center */}
      <div className="hidden md:flex items-center px-4 py-1.5 bg-slate-100 rounded-full">
        <span className="text-xs font-medium text-slate-600">
          College Event Edition
        </span>
      </div>

      {/* Right: Logout */}
      {isLoggedIn ? (
        <button
        onClick={logoutUser}
        className="text-sm px-4 py-1.5 rounded-md text-slate-600 text-white hover:text-red-600 hover:bg-red-50 transition bg-blue-500"
      >
        Logout
      </button>
      ): (<button
        onClick={()=>setShowLogin(true)}
        className="text-sm px-4 py-1.5 rounded-md text-slate-600 text-white hover:text-green-600 hover:bg-green-50 transition bg-blue-500"
      >
        Login
      </button>)}

    </nav>
  );
};

export default Navbar;
