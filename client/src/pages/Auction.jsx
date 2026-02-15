import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const roles = ["all", "batter", "bowler", "allrounder", "keeper"];

const formatCurrency = (amount) => {
  if (!amount) return "₹ 0";
  const crore = 10000000;
  const lakh = 100000;
  if (amount >= crore) return `₹ ${(amount / crore).toFixed(2)} Cr`;
  if (amount >= lakh) return `₹ ${(amount / lakh).toFixed(0)} L`;
  return `₹ ${amount}`;
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
  const [isSold, setIsSold] = useState(false);

  const refresh = async () => {
    const a = await getAuctionById(auctionId);
    const b = await getBidState(auctionId);
    setAuction(a);
    setBidState(b);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleSold = async () => {
    setIsSold(true);
    await markSold(auctionId);
    setTimeout(() => {
      setIsSold(false);
      refresh();
    }, 2000);
  };

  if (!auction)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="animate-pulse text-2xl font-bold">LOADING AUCTION...</div>
      </div>
    );

  const currentPlayer = bidState?.currentPlayer?.player;
  const leadingTeam = bidState?.leadingTeam;

  return (
    <div className="h-screen w-screen flex bg-[#f0f2f5] overflow-hidden font-sans text-slate-900">
      
      {/* SOLD OVERLAY EFFECT */}
      <AnimatePresence>
        {isSold && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-green-600 text-white px-20 py-10 rounded-2xl shadow-2xl border-4 border-white"
            >
              <h1 className="text-9xl font-black italic tracking-tighter">SOLD!</h1>
              <p className="text-center text-3xl font-bold mt-2 uppercase">{leadingTeam?.globalTeam?.shortCode}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= LEFT PANEL (Admin & Bidding) ================= */}
      <aside className="w-[22%] border-r border-slate-300 bg-white shadow-xl flex flex-col justify-between p-6 z-10">
        <div className="text-center space-y-4">
          <div className="h-64 flex flex-col items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            {leadingTeam ? (
              <motion.div key={leadingTeam.globalTeam._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <img src={leadingTeam.globalTeam.logo} className="w-40 h-40 mx-auto object-contain drop-shadow-md" alt="logo" />
                <p className="text-2xl font-black mt-2 text-blue-900">{leadingTeam.globalTeam.shortCode}</p>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">Leading Bid</span>
              </motion.div>
            ) : (
              <p className="text-slate-400 font-medium">Waiting for Bids...</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Auction Control</p>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-slate-300 rounded-lg p-2 mb-2 bg-white font-semibold outline-none focus:ring-2 ring-blue-500"
            >
              {roles.map((r) => (
                <option key={r} value={r}>{r.toUpperCase()}</option>
              ))}
            </select>
            <button
              onClick={async () => { await nextPlayer(auctionId, selectedRole); refresh(); }}
              className="w-full bg-slate-900 hover:bg-black text-white py-3 rounded-lg font-bold transition-all active:scale-95 shadow-lg"
            >
              NEXT PLAYER
            </button>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Bidding Teams</p>
            <div className="grid grid-cols-2 gap-2 mb-2">
                <select value={teamA} onChange={(e) => setTeamA(e.target.value)} className="border rounded p-2 text-sm">
                    <option value="">Team A</option>
                    {auction.teams.map((t) => <option key={t._id} value={t._id}>{t.globalTeam.shortCode}</option>)}
                </select>
                <select value={teamB} onChange={(e) => setTeamB(e.target.value)} className="border rounded p-2 text-sm">
                    <option value="">Team B</option>
                    {auction.teams.map((t) => <option key={t._id} value={t._id}>{t.globalTeam.shortCode}</option>)}
                </select>
            </div>
            <button onClick={() => setBiddingTeams(auctionId, teamA, teamB)} className="w-full bg-slate-600 text-white py-2 rounded-lg text-sm font-bold mb-2">Set Rivals</button>
            
            <div className="space-y-3">
              {bidState?.biddingTeams?.map((teamId) => {
                const team = auction.teams.find((t) => t._id === teamId);
                if (!team) return null;
                return (
                  <div key={team._id} className="pt-2 border-t border-slate-200">
                    <p className="font-black text-sm text-blue-900 mb-2 underline decoration-blue-300 decoration-2">{team.globalTeam.shortCode} BIDS:</p>
                    <div className="grid grid-cols-3 gap-1">
                      {[2000000, 2500000, 5000000].map((amt) => (
                        <button
                          key={amt}
                          onClick={async () => { await incrementBid(auctionId, team._id, amt); refresh(); }}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-xs font-bold transition-colors"
                        >
                          +{amt / 100000}L
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleSold}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-black text-xl shadow-lg transition-transform active:scale-95"
          >
            SOLD
          </button>
        </div>
      </aside>

      {/* ================= CENTER (The Showcase) ================= */}
      <main className="w-[56%] pb-13 relative flex flex-col items-center justify-center overflow-hidden">
        {/* Universal Background Effect */}
        <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent" />
        </div>

        {currentPlayer ? (
          <div className="z-10 flex flex-col items-center pt-12">
            <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }}
                className="relative"
            >
                <div className="absolute inset-0 bg-blue-600/5 rounded-full scale-110 blur-2xl" />
                <img src={currentPlayer.imageUrl} className="w-[400px] h-[400px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]" alt="player" />
            </motion.div>

            <motion.h1 
                initial={{ scale: 0.9 }} 
                animate={{ scale: 1 }}
                className="text-6xl font-black mt-4 text-slate-900 tracking-tight uppercase"
            >
              {currentPlayer.name}
            </motion.h1>

            <div className="flex items-center gap-4 mt-2">
                <span className="h-[1px] w-12 bg-slate-300" />
                <p className="text-2xl font-bold text-blue-600 uppercase tracking-[0.2em]">
                {currentPlayer.role}
                </p>
                <span className="h-[1px] w-12 bg-slate-300" />
            </div>

            <div className="flex bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-4 gap-12 mt-8 border border-white">
              {[
                { label: "BATTING", val: currentPlayer.batting },
                { label: "BOWLING", val: currentPlayer.bowling },
                { label: "KEEPING", val: currentPlayer.keeping }
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-xs font-black text-slate-400 tracking-widest mb-1">{s.label}</p>
                  <p className="text-3xl font-black text-slate-800">{s.val}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-white px-12 py-4 rounded-2xl shadow-2xl text-center border border-slate-100">
                    <p className="text-8xl font-black text-blue-700 tracking-tighter">
                        {formatCurrency(bidState?.currentBid)} 
                    </p>
                    <p className="text-lg font-bold text-slate-400 uppercase tracking-widest mt-1">Current Bid Value</p>
                </div>
            </div>
          </div>
        ) : (
          <div className="z-10 text-center">
            <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-6 animate-bounce" />
            <p className="text-3xl font-black text-slate-300 uppercase tracking-tighter">
              Ready to start the auction?
            </p>
          </div>
        )}
      </main>

      {/* ================= RIGHT PANEL (Leaderboard) ================= */}
      <aside className="w-[22%] bg-slate-900 text-white p-6 shadow-2xl z-10 overflow-hidden">
        <h2 className="text-center text-xl font-black mb-6 tracking-widest text-blue-400 border-b border-slate-700 pb-4">
          REMAINING PURSE
        </h2>

        <div className="grid grid-cols-2 gap-3 overflow-y-auto h-[90%] pr-1 custom-scrollbar">
          {auction.teams.slice(0, 12).map((team) => (
            <div
              key={team._id}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 flex flex-col justify-between hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <img src={team.globalTeam.logo} className="w-8 h-8 object-contain rounded-md bg-white p-0.5" alt="t-logo" />
                <span className="font-black text-sm text-slate-200 tracking-tighter uppercase">
                  {team.globalTeam.shortCode}
                </span>
              </div>

              <div className="mt-3">
                <p className="text-md font-bold text-green-400 leading-none">
                    {formatCurrency(team.remainingPurse)}
                </p>
                <div className="h-1.5 w-full bg-slate-700 rounded-full mt-2 overflow-hidden">
                    <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(team.remainingPurse / team.totalPurse) * 100}%` }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                    />
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Auction;