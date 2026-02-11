import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";
axios.defaults.baseURL = backendUrl;

const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(false);

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

  // ================= CREATE AUCTION =================
  const createAuction = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post("/api/auction/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Auction created");
      return data.auctionId;
    } catch (err) {
      toast.error(err.response?.data?.message || "Auction creation failed");
      return null;
    }
  };

  // ================= GET AUCTION BY ID =================
  const getAuctionById = async (auctionId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`/api/auction/${auctionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.auction;
    } catch (err) {
      toast.error("Failed to load auction");
      return null;
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
