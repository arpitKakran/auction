import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Auction = () => {
  const { auctionId } = useParams();
  const { getAuctionById } = useContext(AppContext);

  const [auction, setAuction] = useState(null);
  const [bidState, setBidState] = useState(null);

  const token = localStorage.getItem("token");

  const fetchBidState = async () => {
    try {
      const { data } = await axios.get(
        `/api/bidstate/${auctionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBidState(data.bidState);
    } catch (err) {
      console.log("No active bid state");
    }
  };

  useEffect(() => {
    const loadAuction = async () => {
      const data = await getAuctionById(auctionId);
      setAuction(data);
    };
    loadAuction();
    fetchBidState();
  }, [auctionId]);

  const handleNextPlayer = async () => {
    await axios.post(
      "/api/bidstate/next",
      { auctionId, role: "all" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchBidState();
  };

  const handleIncrement = async (teamId, amount) => {
    await axios.post(
      "/api/bidstate/increment",
      { auctionId, teamId, increment: amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchBidState();
  };

  const handleSold = async () => {
    await axios.post(
      "/api/bidstate/sold",
      { auctionId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchBidState();
  };

  if (!auction) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const currentPlayer = bidState?.currentPlayer?.player;
  const leadingTeam = bidState?.leadingTeam;

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* ================= LEFT SIDE ================= */}
      <aside className="w-[22%] bg-white border-r p-4 flex flex-col justify-between">

        {/* TOP - Leading Team Logo */}
        <div className="flex flex-col items-center">
          {leadingTeam?.globalTeam?.logo ? (
            <>
              <img
                src={leadingTeam.globalTeam.logo}
                alt="Leading Team"
                className="w-20 h-20 object-contain"
              />
              <p className="mt-2 font-semibold">
                {leadingTeam.globalTeam.shortCode}
              </p>
            </>
          ) : (
            <p className="text-slate-500">No Leading Team</p>
          )}
        </div>

        {/* BOTTOM CONTROLS */}
        <div className="space-y-3">

          <button
            onClick={handleNextPlayer}
            className="w-full bg-slate-900 text-white py-2 rounded"
          >
            NEXT PLAYER
          </button>

          {auction.teams.slice(0, 2).map((team) => (
            <div key={team._id} className="space-y-2">
              <p className="font-semibold">
                {team.globalTeam.shortCode}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[1000000, 2000000, 2500000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleIncrement(team._id, amt)}
                    className="bg-blue-600 text-white py-1 rounded text-sm"
                  >
                    +{amt / 100000}L
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleSold}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            SOLD
          </button>
        </div>
      </aside>

      {/* ================= CENTER ================= */}
      <main className="w-[56%] flex flex-col items-center justify-center text-center px-6">

        {currentPlayer ? (
          <>
            <img
              src={currentPlayer.imageUrl}
              alt={currentPlayer.name}
              className="w-64 h-64 object-contain"
            />
            <h1 className="text-3xl font-bold mt-4">
              {currentPlayer.name}
            </h1>
            <p className="text-slate-500">
              {currentPlayer.role}
            </p>

            <p className="text-6xl font-extrabold text-blue-700 mt-6">
              ₹ {bidState?.currentBid || currentPlayer.basePrice}
            </p>
          </>
        ) : (
          <p className="text-xl text-slate-500">
            Click NEXT PLAYER to start
          </p>
        )}
      </main>

      {/* ================= RIGHT SIDE ================= */}
      <aside className="w-[22%] bg-white border-l p-4 overflow-y-auto">
        <h2 className="font-semibold mb-4">Remaining Purse</h2>

        {auction.teams.map((team) => {
          const percent =
            (team.remainingPurse / team.totalPurse) * 100;

          return (
            <div key={team._id} className="mb-4">
              <div className="flex items-center gap-2">
                <img
                  src={team.globalTeam.logo}
                  alt={team.globalTeam.shortCode}
                  className="w-8 h-8 object-contain"
                />
                <span className="font-semibold">
                  {team.globalTeam.shortCode}
                </span>
              </div>

              <p className="text-lg font-bold">
                ₹ {team.remainingPurse}
              </p>

              <div className="h-2 bg-slate-200 rounded-full">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </aside>
    </div>
  );
};

export default Auction;
