import React from "react";
import {motion} from "framer-motion";
import auction_logo from "../assets/auction_logo.png";
const Login = () => {
  return (
    <div className="min-h-screen w-full flex bg-white">

      {/* LEFT: Image Section */}
      <div className="hidden md:flex w-3/6 bg-slate-100">
        <img
          src={auction_logo}
          alt="Auction"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT: Login Form */}
      <div className="w-full md:w-3/6 flex items-center justify-center px-8">
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Heading */}
          <h1 className="text-2xl font-semibold text-slate-900">
            Admin Login
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to continue to the auction panel
          </p>

          {/* Email */}
          <div className="mt-6">
            <label className="text-sm text-slate-600">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="mt-1 w-full rounded-md border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="text-sm text-slate-600">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-md border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-blue-700 py-2.5 text-white text-sm font-medium hover:bg-blue-800 transition"
          >
            Login
          </button>

          {/* Footer Text */}
          <p className="mt-6 text-center text-xs text-slate-400">
            College Event • Admin Access Only
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
