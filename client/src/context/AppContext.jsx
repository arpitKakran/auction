import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";
axios.defaults.baseURL = backendUrl;

const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(false);

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // ================= AUTH (UNCHANGED) =================
  const loginUser = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setShowLogin(false);
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return null;
    }
  };

  const registerUser = async ({ name, email, password }) => {
    try {
      const { data } = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setShowLogin(false);
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return null;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out");
  };

  // ================= AUCTION =================
  const createAuction = async (payload) => {
    try {
      const { data } = await axios.post(
        "/api/auction/create",
        payload,
        getAuthHeader()
      );
      toast.success("Auction created");
      return data.auctionId;
    } catch (err) {
      toast.error(err.response?.data?.message || "Auction creation failed");
      return null;
    }
  };

  const getAuctionById = async (auctionId) => {
    try {
      const { data } = await axios.get(
        `/api/auction/${auctionId}`,
        getAuthHeader()
      );
      return data.auction;
    } catch (err) {
      toast.error("Failed to load auction");
      return null;
    }
  };

  // ================= BID STATE =================
  const getBidState = async (auctionId) => {
    try {
      const { data } = await axios.get(
        `/api/bidstate/${auctionId}`,
        getAuthHeader()
      );
      return data.bidState;
    } catch {
      return null;
    }
  };

  const nextPlayer = async (auctionId, role) => {
    try {
      await axios.post(
        "/api/bidstate/next",
        { auctionId, role },
        getAuthHeader()
      );
    } catch (err) {
      toast.error("Failed to load next player");
    }
  };

  const incrementBid = async (auctionId, teamId, increment) => {
    try {
      await axios.post(
        "/api/bidstate/increment",
        { auctionId, teamId, increment },
        getAuthHeader()
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Bid failed");
    }
  };

  const markSold = async (auctionId) => {
    try {
      await axios.post(
        "/api/bidstate/sold",
        { auctionId },
        getAuthHeader()
      );
      toast.success("Player sold");
    } catch {
      toast.error("Failed to mark sold");
    }
  };

  const setBiddingTeams = async (auctionId, teamA, teamB) => {
    try {
      await axios.post(
        "/api/bidstate/set-teams",
        { auctionId, teamA, teamB },
        getAuthHeader()
      );
      toast.success("Bidding teams updated");
    } catch {
      toast.error("Failed to set bidding teams");
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        showLogin,
        setShowLogin,
        loginUser,
        registerUser,
        logoutUser,
        createAuction,
        getAuctionById,
        getBidState,
        nextPlayer,
        incrementBid,
        markSold,
        setBiddingTeams,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
