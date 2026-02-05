import React from "react";
import bhindi from "../assets/bhindi.png";

// NOTE: In real app, `totalPurse` comes from Admin config
const TOTAL_PURSE = 100; // assume 100L for demo

const teams = [
  { name: "CSK", purse: 72.5, active: true },
  { name: "MI", purse: 68.0 },
  { name: "RCB", purse: 80.0 },
  { name: "KKR", purse: 55.0 },
  { name: "RR", purse: 60.5 },
  { name: "SRH", purse: 70.0 },
  { name: "DC", purse: 65.0 },
  { name: "PBKS", purse: 58.5 },
  { name: "GT", purse: 75.0 },
  { name: "LSG", purse: 73.0 },
  { name: "PWI", purse: 69.5 },
  { name: "Team Z", purse: 62.0 },
];

const Auction = () => {
  return (
    <div className="min-h-[93vh] bg-slate-100 flex overflow-hidden">

      {/* ================= LEFT : CONTROLS ================= */}
      <aside className="w-[22%] bg-white border-r border-slate-200 p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">Auction Controls</h2>

          {/* Bidding Teams */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">Bidding Teams</p>
            <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm">
              <option>Team A</option>
              {teams.map((t) => <option key={t.name}>{t.name}</option>)}
            </select>
            <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm">
              <option>Team B</option>
              {teams.map((t) => <option key={t.name}>{t.name}</option>)}
            </select>
          </div>

          {/* Toggle */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">Current Bid Holder</p>
            <div className="flex border border-slate-300 rounded-lg overflow-hidden">
              <button className="flex-1 py-2 text-sm bg-blue-600 text-white">Team A</button>
              <button className="flex-1 py-2 text-sm bg-white text-slate-700">Team B</button>
            </div>
          </div>

          {/* Increment */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">Increase Bid</p>
            <div className="grid grid-cols-3 gap-2">
              {["+5L", "+10L", "+20L"].map((inc) => (
                <button
                  key={inc}
                  className="border border-slate-300 rounded-md py-2 text-sm hover:bg-slate-100"
                >
                  {inc}
                </button>
              ))}
            </div>
            <button className="w-full py-2 border border-slate-300 rounded-md text-sm hover:bg-slate-100">
              ↩ Undo Last Increment
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-4 border-t border-slate-200">
          <button className="w-full py-2.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
            SOLD
          </button>
          <button className="w-full py-2.5 bg-red-600 text-white rounded-md text-sm hover:bg-red-700">
            UNSOLD
          </button>
          <button className="w-full py-2.5 bg-slate-900 text-white rounded-md text-sm hover:bg-slate-800">
            NEXT PLAYER
          </button>
        </div>
      </aside>

      {/* ================= CENTER : PLAYER ================= */}
      {/* ================= CENTER : PLAYER ================= */}
<main className="w-[56%] bg-slate-50 flex flex-col items-center justify-center px-8 text-center gap-2">

  {/* Player Image (bigger, dominant) */}
  <div className="w-100 h-100 flex items-center justify-center bg-white border border-slate-200 rounded-2xl">
    <img
      src={bhindi}
      alt="Player"
      className="max-w-full max-h-full object-contain"
    />
  </div>

  {/* Player Info */}
  <h1 className="text-3xl font-semibold text-slate-900">
    Virat Kohli
  </h1>
  <p className="text-sm text-slate-500">
    Batter • Right Hand
  </p>

  {/* Current Bid (very dominant) */}
  <div className="mt-1">
    <p className="text-sm text-slate-500">
      Current Bid
    </p>
    <p className="text-6xl font-extrabold text-blue-700 leading-tight">
      ₹ 18,00,00,000
    </p>
    <p className="text-sm text-slate-600">
      Leading Team: <span className="font-medium">CSK</span>
    </p>
  </div>

  {/* Skills (compressed, secondary) */}
  <div className="grid grid-cols-3 gap-6 bg-white border border-slate-200 rounded-xl px-6 py-2">
    {[
      { label: "Batting", value: 92 },
      { label: "Bowling", value: 35 },
      { label: "Fielding", value: 78 },
    ].map((stat) => (
      <div key={stat.label} className="text-center">
        <p className="text-[10px] uppercase tracking-wide text-slate-500">
          {stat.label}
        </p>
        <p className="text-xl font-bold text-slate-900">
          {stat.value}
        </p>
      </div>
    ))}
  </div>

  {/* Base Price (least dominant) */}
  <div className="px-4 py-1 bg-slate-200 rounded-full">
    <p className="text-xs font-medium text-slate-700">
      Base Price:{" "}
      <span className="font-semibold text-slate-900">
        ₹2,00,000
      </span>
    </p>
  </div>
</main>


      {/* ================= RIGHT : REMAINING PURSE ================= */}
      <aside className="w-[22%] bg-white border-l border-slate-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Remaining Purse</h2>

        <div className="grid grid-cols-2 gap-3">
          {teams.map((team) => {
            const percent = Math.max(0, Math.min(100, (team.purse / TOTAL_PURSE) * 100));
            const barColor =
              percent >= 60 ? "bg-green-600" : percent >= 30 ? "bg-yellow-500" : "bg-red-600";

            return (
              <div
                key={team.name}
                className={`rounded-lg border p-3 ${
                  team.active ? "border-blue-600 bg-blue-50" : "border-slate-200"
                }`}
              >
                <p className="text-lg font-semibold text-slate-800">{team.name}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">₹ {team.purse} L</p>

                {/* Progress Bar */}
                <div className="mt-2 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColor} rounded-full transition-all`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </aside>

    </div>
  );
};

export default Auction;
