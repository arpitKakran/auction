import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";
axios.defaults.baseURL = backendUrl;

const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(false);

  const loginUser = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

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
    toast.success("Logged out successfully");
    setIsLoggedIn(false);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
