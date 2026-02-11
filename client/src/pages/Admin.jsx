import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TEAMS = [
  { name: "Chennai Super Kings", code: "CSK" },
  { name: "Deccan Chargers", code: "DCG" },
  { name: "Delhi Capitals", code: "DC" },
  { name: "Gujarat Titans", code: "GT" },
  { name: "Kolkata Knight Riders", code: "KKR" },
  { name: "Lucknow Super Giants", code: "LSG" },
  { name: "Mumbai Indians", code: "MI" },
  { name: "Punjab Kings", code: "PBKS" },
  { name: "Rajasthan Royals", code: "RR" },
  { name: "Royal Challengers Bengaluru", code: "RCB" },
  { name: "Sunrisers Hyderabad", code: "SRH" },
  { name: "Kochi Tuskers Kerala", code: "KTK" },
];

const Admin = () => {
  const navigate = useNavigate();
  const { createAuction } = useContext(AppContext);

  const [name, setName] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [maxPlayers, setMaxPlayers] = useState("");
  const [purse, setPurse] = useState("");

  const toggleTeam = (code) => {
    setSelectedTeams((prev) =>
      prev.includes(code) ? prev.filter((t) => t !== code) : [...prev, code]
    );
  };

  const handleStartAuction = async () => {
    const auctionId = await createAuction({
      name,
      teamShortCodes: selectedTeams,
      rules: {
        maxPlayersPerTeam: Number(maxPlayers),
        pursePerTeam: Number(purse),
      },
    });

    if (auctionId) navigate(`/auction/${auctionId}`);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-14">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-10 space-y-10 shadow">

        <div>
          <h1 className="text-3xl font-bold">Auction Setup</h1>
          <p className="text-sm text-slate-500">
            Configure teams and rules
          </p>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Auction Name"
          className="w-full border rounded-lg px-4 py-3"
        />

        <div className="grid grid-cols-2 gap-3">
          {TEAMS.map((t) => {
            const active = selectedTeams.includes(t.code);
            return (
              <div
                key={t.code}
                onClick={() => toggleTeam(t.code)}
                className={`cursor-pointer px-4 py-3 border rounded-lg ${
                  active ? "bg-blue-50 border-blue-600" : "border-slate-300"
                }`}
              >
                {t.name} ({t.code})
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Max players per team"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(e.target.value)}
            className="border rounded-lg px-4 py-3"
          />
          <input
            type="number"
            placeholder="Purse per team"
            value={purse}
            onChange={(e) => setPurse(e.target.value)}
            className="border rounded-lg px-4 py-3"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleStartAuction}
            className="px-10 py-3 bg-blue-700 text-white rounded-lg"
          >
            Start Auction
          </button>
        </div>

      </div>
    </div>
  );
};

export default Admin;
