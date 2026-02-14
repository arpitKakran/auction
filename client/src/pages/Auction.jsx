import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const roles = ["all", "batter", "bowler", "allrounder", "keeper"];

// 💰 Format number to Cr / L
const formatCurrency = (amount) => {
  if (!amount) return "₹ 0";

  const crore = 10000000;
  const lakh = 100000;

  if (amount >= crore) {
    return `₹ ${(amount / crore).toFixed(2)} Cr`;
  } else if (amount >= lakh) {
    return `₹ ${(amount / lakh).toFixed(0)} L`;
  } else {
    return `₹ ${amount}`;
  }
};

const Auction = () => {
  const { auctionId } = useParams();
  const {
    getAuctionById,
    getBidState,
    nextPlayer,
    incrementBid,
    markSold,
    setBiddingTeams,
  } = useContext(AppContext);

  const [auction, setAuction] = useState(null);
  const [bidState, setBidState] = useState(null);
  const [selectedRole, setSelectedRole] = useState("all");
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");

  const refresh = async () => {
    const a = await getAuctionById(auctionId);
    const b = await getBidState(auctionId);
    setAuction(a);
    setBidState(b);
  };

  useEffect(() => {
    refresh();
  }, []);

  if (!auction)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  const currentPlayer = bidState?.currentPlayer?.player;
  const leadingTeam = bidState?.leadingTeam;

  return (
    <div className="h-screen w-screen flex bg-white overflow-hidden">

      {/* ================= LEFT PANEL ================= */}
      <aside className="w-[22%] border-r border-slate-200 flex flex-col justify-between p-6">

        {/* Leading Team */}
        <div className="text-center">
          {leadingTeam ? (
            <>
              <img
                src={leadingTeam.globalTeam.logo}
                className=" w-45 h-45 mx-auto object-contain"
              />
              <p className="text-xl font-bold mt-1 ">
                {leadingTeam.globalTeam.shortCode}
              </p>
              <p className="text-sm text-slate-500 ">
                Leading Bid
              </p>
            </>
          ) : (
            <p className="text-slate-400 text-lg">
              No Leading Team
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-4">

          {/* Pool */}
          <div>
            <p className="text-sm font-semibold mb-1">
              Select Pool
            </p>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border rounded p-2"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Team Selection */}
          <div>
            <p className="text-sm font-semibold mb-1">
              Bidding Teams
            </p>

            <select
              value={teamA}
              onChange={(e) => setTeamA(e.target.value)}
              className="w-full border rounded p-2 mb-2"
            >
              <option value="">Select Team A</option>
              {auction.teams.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.globalTeam.shortCode}
                </option>
              ))}
            </select>

            <select
              value={teamB}
              onChange={(e) => setTeamB(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">Select Team B</option>
              {auction.teams.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.globalTeam.shortCode}
                </option>
              ))}
            </select>

            <button
              onClick={() => setBiddingTeams(auctionId, teamA, teamB)}
              className="w-full bg-slate-800 text-white py-2 mt-3 rounded-lg font-semibold"
            >
              Set Teams
            </button>
          </div>

          <button
            onClick={async () => {
              await nextPlayer(auctionId, selectedRole);
              refresh();
            }}
            className="w-full bg-black text-white py-3 rounded-lg font-bold text-lg"
          >
            NEXT PLAYER
          </button>

          {/* Bid Buttons */}
          {bidState?.biddingTeams?.map((teamId) => {
            const team = auction.teams.find(
              (t) => t._id === teamId
            );
            if (!team) return null;

            return (
              <div key={team._id}>
                <p className="font-bold text-lg mb-1">
                  {team.globalTeam.shortCode}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[1000000, 2000000, 2500000].map((amt) => (
                    <button
                      key={amt}
                      onClick={async () => {
                        await incrementBid(
                          auctionId,
                          team._id,
                          amt
                        );
                        refresh();
                      }}
                      className="bg-blue-600 text-white py-2 rounded-lg font-semibold"
                    >
                      +{amt / 100000}L
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <button
            onClick={async () => {
              await markSold(auctionId);
              refresh();
            }}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg"
          >
            SOLD
          </button>
        </div>
      </aside>

      {/* ================= CENTER ================= */}
      <main className="w-[56%] flex flex-col items-center justify-center text-center px-10">

        {currentPlayer ? (
          <>
            <img
              src={currentPlayer.imageUrl}
              className="w-105 h-105 object-contain"
            />

            <h1 className="text-5xl font-extrabold mt-2">
              {currentPlayer.name}
            </h1>

            <p className="text-xl text-slate-500 capitalize">
              {currentPlayer.role}
            </p>

            {/* Player Stats */}
            <div className="flex bg-slate-100 rounded-2xl p-3 gap-10 mt-3 text-center">
              <div>
                <p className="text-sm text-slate-400">
                  Batting
                </p>
                <p className="text-2xl font-bold">
                  {currentPlayer.batting}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">
                  Bowling
                </p>
                <p className="text-2xl font-bold">
                  {currentPlayer.bowling}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400">
                  Keeping
                </p>
                <p className="text-2xl font-bold">
                  {currentPlayer.keeping}
                </p>
              </div>
            </div>

            {/* Current Bid */}
            <p className=" rounded-2xl shadow-xs bg-slate-100 p-4 text-7xl font-extrabold text-blue-700 mt-7">
              {formatCurrency(bidState?.currentBid)} 
              <p className="text-lg text-black mt-1"> Current Bid</p>
            </p>
            
          </>
        ) : (
          <p className="text-2xl text-slate-400">
            Select Pool & Click NEXT PLAYER
          </p>
        )}
      </main>

      {/* ================= RIGHT PANEL ================= */}
      <aside className="w-[22%] border-l border-slate-200 p-6">

        <h2 className="text-center text-xl font-bold mb-4">
          Remaining Purse
        </h2>

        <div className="grid grid-cols-2 grid-rows-6 gap-4 h-[92%]">
          {auction.teams.slice(0, 12).map((team) => (
            <div
              key={team._id}
              className="border rounded-xl p-4 flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={team.globalTeam.logo}
                  className="w-10 h-10 object-contain"
                />
                <span className="font-semibold">
                  {team.globalTeam.shortCode}
                </span>
              </div>

              <p className="text-lg font-bold mt-2">
                {formatCurrency(team.remainingPurse)}
              </p>

              <div className="h-2 bg-slate-200 rounded-full">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{
                    width: `${
                      (team.remainingPurse /
                        team.totalPurse) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Auction;
