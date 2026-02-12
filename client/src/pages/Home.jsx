import React, { useContext, useEffect, useState } from "react";
import auction_logo from "../assets/auction_logo.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { isLoggedIn, setShowLogin, getMyAuctions } =
    useContext(AppContext);

  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      loadAuctions();
    }
  }, [isLoggedIn]);

  const loadAuctions = async () => {
    const data = await getMyAuctions();
    setAuctions(data);
  };

  const liveAuctions = auctions.filter((a) => a.status === "live");
  const completedAuctions = auctions.filter(
    (a) => a.status === "completed"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">

      {/* ================= BEFORE LOGIN ================= */}
      {!isLoggedIn && (
        <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <div>
            <img src={auction_logo} alt="Auction Logo" className="w-24 mb-6" />

            <h1 className="text-4xl font-bold text-slate-900">
              IPL Auction System
            </h1>

            <p className="mt-4 text-slate-600 max-w-lg">
              Conduct live cricket auctions smoothly with structured
              bidding, purse tracking and real-time controls.
            </p>

            <button
              onClick={() => setShowLogin(true)}
              className="mt-8 px-8 py-3 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition"
            >
              Admin Login
            </button>
          </div>

          <div className="hidden md:block bg-white rounded-2xl p-10 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800">
              Features
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              <li>• Structured Admin-Controlled Bidding</li>
              <li>• Live Purse Tracking</li>
              <li>• Category-Based Player Pool</li>
              <li>• Resume & History Support</li>
            </ul>
          </div>
        </section>
      )}

      {/* ================= ADMIN DASHBOARD ================= */}
      {isLoggedIn && (
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h2>
            <p className="mt-2 text-slate-500">
              Manage your live and past auctions
            </p>
          </div>

          {/* ================= LIVE AUCTIONS ================= */}
          <section>
            <h3 className="text-xl font-semibold text-green-700 mb-6">
              Live Auctions
            </h3>

            {liveAuctions.length === 0 ? (
              <p className="text-slate-500">No live auctions</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {liveAuctions.map((auction) => (
                  <div
                    key={auction._id}
                    className="bg-white rounded-2xl p-6 shadow-md border flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-lg font-semibold">
                        {auction.name}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {auction.teams.length} Teams
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/auction/${auction._id}`)
                      }
                      className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                    >
                      Continue
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ================= COMPLETED AUCTIONS ================= */}
          <section>
            <h3 className="text-xl font-semibold text-slate-800 mb-6">
              Completed Auctions
            </h3>

            {completedAuctions.length === 0 ? (
              <p className="text-slate-500">No completed auctions</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedAuctions.map((auction) => (
                  <div
                    key={auction._id}
                    className="bg-white rounded-2xl p-6 shadow-sm border flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-lg font-semibold">
                        {auction.name}
                      </h4>
                      <p className="text-sm text-slate-500">
                        Completed
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/auction/${auction._id}`)
                      }
                      className="px-6 py-2 bg-slate-800 text-white rounded-lg text-sm hover:bg-black"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ================= CREATE NEW ================= */}
          <section className="bg-white rounded-2xl p-8 shadow-lg border flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Start New Auction
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Configure teams, purse, and rules.
              </p>
            </div>

            <button
              onClick={() => navigate("/admin")}
              className="px-8 py-3 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800"
            >
              Create Auction
            </button>
          </section>

        </div>
      )}
    </div>
  );
};

export default Home;
