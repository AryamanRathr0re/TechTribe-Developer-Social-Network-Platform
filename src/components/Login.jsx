import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserLock } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("rahul@gmail.com");
  const [password, setPassword] = useState("@12Aryaman");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          Email: emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError(error?.response?.data?.message || "Something Went Wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-base-300 p-8 rounded-xl shadow-2xl w-full max-w-sm"
      >
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-primary p-3 rounded-full shadow-lg mb-2">
            <FaUserLock className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-base-content">
            Welcome Back
          </h2>
          <p className="text-sm text-base-content opacity-70">
            Please login to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-base-content mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="input input-bordered w-full bg-base-100 text-base-content"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-base-content mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="input input-bordered w-full bg-base-100 text-base-content"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-500">{error}</p>
          <div className="flex justify-between text-sm text-primary">
            <span className="hover:underline cursor-pointer">
              Forgot password?
            </span>
            <span className="hover:underline cursor-pointer">Sign up</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary w-full mt-2"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
