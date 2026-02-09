import React, { useContext } from "react";
import auction_logo from "../assets/auction_logo.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { isLoggedIn, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= BEFORE LOGIN ================= */}
      {!isLoggedIn && (
        <>
          {/* HERO */}
          <section className="bg-white border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <img src={auction_logo} alt="Auction Logo" className="w-24 mb-6" />

                <h1 className="text-4xl font-semibold text-slate-900">
                  IPL Auction System
                </h1>

                <p className="mt-4 text-slate-600 max-w-lg">
                  A reliable and distraction-free platform built to conduct
                  live cricket auctions smoothly during college events.
                </p>

                <button
                  onClick={() => setShowLogin(true)}
                  className="mt-8 px-8 py-3 bg-blue-700 text-white rounded-md text-sm font-medium hover:bg-blue-800 transition"
                >
                  Go to Admin Login
                </button>
              </div>

              <div className="hidden md:block">
                <div className="bg-slate-100 rounded-xl p-10 border border-slate-200">
                  <h3 className="text-lg font-medium text-slate-800">
                    Why this system?
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-600">
                    <li>• Clean and controlled bidding flow</li>
                    <li>• Designed for live projector use</li>
                    <li>• Supports paused & resumed auctions</li>
                    <li>• Built for college-level events</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ================= AFTER LOGIN ================= */}
      {isLoggedIn && (
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

          <div>
            <h2 className="text-3xl font-semibold text-slate-900">
              Admin Home
            </h2>
            <p className="mt-2 text-slate-500">
              Manage and continue your auction rooms
            </p>
          </div>

          {/* Create Auction */}
          <section>
            <h3 className="text-xl font-medium text-slate-800 mb-4">
              Start New Auction
            </h3>

            <div className="bg-white rounded-xl border border-slate-200 p-6 flex justify-between items-center">
              <div>
                <h4 className="font-medium text-slate-800">
                  Create a New Auction Room
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  Configure teams, purse, and player pool before starting.
                </p>
              </div>

              <button
                onClick={() => navigate("/admin")}
                className="px-6 py-2 bg-blue-700 text-white rounded-md text-sm hover:bg-blue-800 transition"
              >
                Create Auction
              </button>
            </div>
          </section>

        </div>
      )}
    </div>
  );
};

export default Home;
