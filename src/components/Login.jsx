import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaLock,
  FaEnvelope,
  FaUser,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("rahul@gmail.com");
  const [password, setPassword] = useState("@12Aryaman");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          Email: emailId,
          password,
        },
        { withCredentials: true }
      );
      
      // Store JWT token if present in response
      const token = res.data?.token || res.data?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      
      dispatch(addUser(res.data));
      navigate("/onboarding");
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "❌ Something went wrong! Please try again."
      );
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          LastName: lastName,
          Email: emailId,
          password,
        },
        { withCredentials: true }
      );
      
      // Store JWT token if present in response
      const token = res.data?.token || res.data?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      
      dispatch(addUser(res.data.data));
      return navigate("/onboarding");
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "❌ Something went wrong! Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-pink-500/30 rounded-full blur-3xl top-20 left-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl bottom-20 right-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="bg-gradient-to-r from-pink-500 to-red-500 p-4 rounded-full shadow-lg mb-4"
            >
              <FaRocket className="text-white text-4xl" />
            </motion.div>
            <h1 className="text-4xl font-black text-white mb-2">
              {isLoginForm ? "Welcome Back! 👋" : "Join TechTribe 🚀"}
            </h1>
            <p className="text-white/70 text-center">
              {isLoginForm
                ? "Sign in to find your tech match! 💫"
                : "Create your account and start connecting! ✨"}
            </p>
          </motion.div>

          {/* Form */}
          <form
            className="space-y-5"
            onSubmit={isLoginForm ? handleLogin : handleSignUp}
          >
            {/* First & Last Name for Signup */}
            {!isLoginForm && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-white/90 mb-2 font-semibold text-sm">
                    <FaUser className="inline mr-2" /> First Name
                  </label>
                  <input
                    value={firstName}
                    className="input input-bordered w-full bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    type="text"
                    placeholder="John"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/90 mb-2 font-semibold text-sm">
                    Last Name
                  </label>
                  <input
                    value={lastName}
                    className="input input-bordered w-full bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    type="text"
                    placeholder="Doe"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isLoginForm ? 0.3 : 0.4 }}
            >
              <label className="block text-white/90 mb-2 font-semibold text-sm">
                <FaEnvelope className="inline mr-2" /> Email
              </label>
              <input
                className="input input-bordered w-full bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                type="email"
                placeholder="you@example.com"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isLoginForm ? 0.4 : 0.5 }}
            >
              <label className="block text-white/90 mb-2 font-semibold text-sm">
                <FaLock className="inline mr-2" /> Password
              </label>
              <div className="relative">
                <input
                  className="input input-bordered w-full bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 pr-12"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </motion.div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="alert alert-error bg-red-500/20 backdrop-blur-sm border-red-500/50 text-white rounded-xl"
              >
                <span className="font-semibold">{error}</span>
              </motion.div>
            )}

            {/* Auth Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-between text-sm"
            >
              <button
                type="button"
                className="text-white/70 hover:text-white hover:underline"
              >
                Forgot password? 🔑
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLoginForm(!isLoginForm);
                  setError("");
                }}
                className="text-pink-300 hover:text-pink-200 hover:underline font-semibold"
              >
                {isLoginForm ? "✨ Sign up instead" : "👋 Login instead"}
              </button>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn w-full bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 text-white border-none text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
            >
              {isLoginForm ? "🚀 Login" : "✨ Sign Up"}
            </motion.button>
          </form>

          {/* Social Login Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/60">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {["🔵", "⚫", "🔴"].map((emoji, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-2xl hover:bg-white/20 transition-colors"
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-white/60 text-sm mt-6"
        >
          By continuing, you agree to TechTribe's Terms of Service & Privacy
          Policy 📜
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
