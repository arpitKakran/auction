import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-10 px-6 flex items-center justify-between bg-white border-t border-slate-200">
      
      {/* Left: Copyright */}
      <span className="text-xs text-slate-500">
        © {new Date().getFullYear()} IPL Auction System
      </span>

      {/* Right: Event Info */}
      <span className="text-xs text-slate-400">
        College Event • Admin Use Only
      </span>

    </footer>
  );
};

export default Footer;
