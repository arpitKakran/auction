import React, { useState } from "react";
import auction_logo from "../assets/auction_logo.png";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // UI only

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= BEFORE LOGIN ================= */}
      {!isLoggedIn && (
        <>
          <section className="flex flex-col items-center justify-center text-center px-6 py-24">
            <img src={auction_logo} alt="Auction Logo" className="w-24 mb-6" />

            <h1 className="text-4xl font-semibold text-slate-900">
              IPL Auction System
            </h1>

            <p className="mt-4 text-slate-600 max-w-2xl">
              A clean and controlled platform designed to conduct cricket auctions
              smoothly during college events.
            </p>

            <button className="mt-10 px-8 py-3 bg-blue-700 text-white rounded-md text-sm font-medium hover:bg-blue-800 transition">
              Go to Admin Login
            </button>
          </section>
        </>
      )}

      {/* ================= AFTER LOGIN ================= */}
      {isLoggedIn && (
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

          {/* Header */}
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">
              Admin Home
            </h2>
            <p className="mt-2 text-slate-500">
              Manage and continue your auction rooms
            </p>
          </div>

          {/* INCOMPLETE AUCTIONS */}
          <section>
            <h3 className="text-xl font-medium text-slate-800 mb-4">
              Incomplete Auctions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border-l-4 border-yellow-500 rounded-xl border border-slate-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-slate-800">
                      College Fest Auction
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      Last active: 2 hours ago
                    </p>
                  </div>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                    In Progress
                  </span>
                </div>

                <button className="mt-6 px-5 py-2 bg-blue-700 text-white rounded-md text-sm hover:bg-blue-800 transition">
                  Continue Auction
                </button>
              </div>
            </div>
          </section>

          {/* CREATE NEW AUCTION */}
          <section>
            <h3 className="text-xl font-medium text-slate-800 mb-4">
              Start New Auction
            </h3>

            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="font-medium text-slate-800">
                  Create a New Auction Room
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  Configure teams, purse, and player pool before starting.
                </p>
              </div>

              <button className="px-6 py-2 bg-blue-700 text-white rounded-md text-sm hover:bg-blue-800 transition">
                Create Auction
              </button>
            </div>
          </section>

          {/* COMPLETED AUCTIONS */}
          <section>
            <h3 className="text-xl font-medium text-slate-800 mb-4">
              Completed Auctions
            </h3>

            <div className="bg-white rounded-xl border border-slate-200 divide-y">
              <div className="p-4 flex justify-between text-sm">
                <span className="text-slate-700">Inter-Dept Auction</span>
                <span className="text-slate-400">Completed</span>
              </div>
              <div className="p-4 flex justify-between text-sm">
                <span className="text-slate-700">Freshers League Auction</span>
                <span className="text-slate-400">Completed</span>
              </div>
            </div>
          </section>

        </div>
      )}
    </div>
  );
};

export default Home;
