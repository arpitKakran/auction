import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Auction = () => {
  const { auctionId } = useParams();
  const { getAuctionById } = useContext(AppContext);
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    const loadAuction = async () => {
      const data = await getAuctionById(auctionId);
      setAuction(data);
    };
    loadAuction();
  }, [auctionId]);

  if (!auction) {
    return <div className="p-10 text-center">Loading auction...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">{auction.name}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {auction.teams.map((team) => {
          const percent =
            (team.remainingPurse / team.totalPurse) * 100;

          return (
            <div
              key={team._id}
              className="bg-white rounded-xl p-4 border"
            >
              <div className="flex items-center gap-3">
                {team.globalTeam.logo && (
                  <img
                    src={team.globalTeam.logo}
                    alt={team.globalTeam.shortCode}
                    className="w-10 h-10 object-contain"
                  />
                )}
                <h2 className="font-semibold">
                  {team.globalTeam.shortCode}
                </h2>
              </div>

              <p className="mt-2 text-xl font-bold">
                ₹ {team.remainingPurse}
              </p>

              <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Auction;
