import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-xl p-10 space-y-14">

        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Auction Configuration
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Select teams and configure rules before starting the auction
          </p>
        </div>

        {/* ================= AUCTION INFO ================= */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-slate-800">
            Auction Details
          </h2>

          <div>
            <label className="text-sm text-slate-600">Auction Name</label>
            <input
              type="text"
              placeholder="College Fest IPL Auction"
              className="mt-1 w-full border border-slate-300 rounded-md px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
          </div>
        </section>

        {/* ================= TEAM SELECTION ================= */}
        <section className="space-y-6">
          <h2 className="text-lg font-medium text-slate-800">
            Select Participating Teams
          </h2>

          <p className="text-sm text-slate-500">
            Choose the teams that will take part in this auction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Chennai Super Kings",
              "Deccan Chargers",
              "Delhi Capitals",
              "Gujarat Titans",
              "Kolkata Knight Riders",
              "Lucknow Super Giants",
              "Mumbai Indians",
              "Pune Warriors India",
              "Punjab Kings",
              "Rajasthan Royals",
              "Royal Challengers Bengaluru",
              "Sunrisers Hyderabad",
             
            ].map((team) => (
              <label
                key={team}
                className="flex items-center gap-3 border border-slate-200 rounded-md px-4 py-3 cursor-pointer hover:border-blue-500 transition"
              >
                <input type="checkbox" className="accent-blue-600" />
                <span className="text-sm text-slate-700">{team}</span>
              </label>
            ))}
          </div>
        </section>

        {/* ================= TEAM RULES ================= */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-slate-800">
            Team Rules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-slate-600">
                Max Players per Team
              </label>
              <input
                type="number"
                placeholder="e.g. 15"
                className="mt-1 w-full border border-slate-300 rounded-md px-4 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-slate-600">
                Purse per Team (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 10000000"
                className="mt-1 w-full border border-slate-300 rounded-md px-4 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </section>

        {/* ================= PLAYER RULES ================= */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-slate-800">
            Player Rules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-slate-600">
                Minimum Base Price (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 200000"
                className="mt-1 w-full border border-slate-300 rounded-md px-4 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-slate-600">
                Allowed Player Categories
              </label>
              <select className="mt-1 w-full border border-slate-300 rounded-md px-4 py-2 text-sm outline-none focus:border-blue-500">
                <option>All Players</option>
                <option>Batters</option>
                <option>Bowlers</option>
                <option>All-Rounders</option>
                <option>Wicket Keepers</option>
              </select>
            </div>
          </div>
        </section>

        {/* ================= SUMMARY ================= */}
        <section className="bg-slate-50 border border-slate-200 rounded-lg p-6">
          <h3 className="font-medium text-slate-800 mb-2">
            Important Note
          </h3>
          <p className="text-sm text-slate-600">
            Once the auction starts, these settings cannot be changed.
            Please review the configuration carefully before proceeding.
          </p>
        </section>

        {/* ================= ACTION ================= */}
        <div onClick={()=> navigate('/auction')} className="pt-6 border-t border-slate-200 flex justify-end">
          <button onClick={()=> navigate('/auction')} className="px-10 py-3 bg-blue-700 text-white rounded-md text-sm font-medium hover:bg-blue-800 transition">
            Start Auction
          </button>
        </div>

      </div>
    </div>
  );
};

export default Admin;
