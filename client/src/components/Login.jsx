import React, { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Login = () => {
  const [mode, setMode] = useState("login"); // login | signup
  const { setShowLogin, loginUser, registerUser } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "login") {
      const res = await loginUser({ email, password });
      if (res) {
        toast.success("Login successful");
        setShowLogin(false);
      }
    } else {
      const res = await registerUser({ name, email, password });
      if (res) {
        toast.success("Registration successful");
        setShowLogin(false);
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white w-[340px] rounded-xl p-8 relative"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800">
          {mode === "login" ? "Log in" : "Sign up"}
        </h2>

        <p className="text-sm text-center text-gray-500 mt-1">
          {mode === "login"
            ? "Welcome back! Please login"
            : "Create your admin account"}
        </p>

        {mode === "signup" && (
          <div className="mt-5 border rounded-full px-5 py-2 flex gap-2">
            <img src={assets.profile_icon} width={18} />
            <input
              className="outline-none text-sm w-full"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="mt-4 border rounded-full px-5 py-2 flex gap-2">
          <img src={assets.email_icon} width={18} />
          <input
            type="email"
            className="outline-none text-sm w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mt-4 border rounded-full px-5 py-2 flex gap-2">
          <img src={assets.lock_icon} width={16} />
          <input
            type="password"
            className="outline-none text-sm w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-900 text-white py-2 rounded-full text-sm"
        >
          {mode === "login" ? "Login" : "Create Account"}
        </button>

        <p className="text-sm text-center mt-5 text-gray-600">
          {mode === "login" ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
            className="text-blue-700 cursor-pointer font-medium"
          >
            {mode === "login" ? "Sign up" : "Log in"}
          </span>
        </p>

        <img
          src={assets.cross_icon}
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 w-4 cursor-pointer"
        />
      </motion.form>
    </div>
  );
};

export default Login;
