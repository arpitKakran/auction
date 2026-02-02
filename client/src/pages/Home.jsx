import React, { useState } from "react";
import auction_logo from "../assets/auction_logo.png";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
{ isLoggedIn ? (
  <>
  <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <img
          src={auction_logo}
          alt="Auction Logo"
          className="w-24 mb-6"
        />

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

       <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
            <h3 className="font-medium text-slate-800">Auction Setup</h3>
            <p className="mt-3 text-sm text-slate-500">
              Configure teams, purse limits, and player pools before the auction begins.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
            <h3 className="font-medium text-slate-800">Live Auction</h3>
            <p className="mt-3 text-sm text-slate-500">
              Conduct bidding with full control, clear visuals, and zero confusion.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
            <h3 className="font-medium text-slate-800">Final Teams</h3>
            <p className="mt-3 text-sm text-slate-500">
              View final squads and remaining purse instantly after auction completion.
            </p>
          </div>
        </div>
      </section>
</> 

) : (
  <>
  <section className="px-6 pb-24 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto pt-16">

          {/* Header */}
          <h2 className="text-2xl font-semibold text-slate-900">
            Admin Dashboard
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Create and manage auction rooms
          </p>

          {/* Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Create Auction */}
            <div className="rounded-xl border border-slate-200 p-6 hover:border-blue-500 transition">
              <h3 className="text-lg font-medium text-slate-800">
                Create New Auction
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Start a fresh auction by configuring teams, purse, and rules.
              </p>
              <button className="mt-4 px-5 py-2 bg-blue-700 text-white rounded-md text-sm hover:bg-blue-800 transition">
                Create Auction
              </button>
            </div>

            {/* Previous Auctions */}
            <div className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-medium text-slate-800">
                Previous Auctions
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                View details of auctions created earlier.
              </p>

              {/* Placeholder list */}
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex justify-between">
                  <span>College Fest Auction</span>
                  <span className="text-slate-400">Completed</span>
                </li>
                <li className="flex justify-between">
                  <span>Inter-Dept Auction</span>
                  <span className="text-slate-400">Completed</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>
  </>
)
}
    </div>
  );
};

export default Home;
