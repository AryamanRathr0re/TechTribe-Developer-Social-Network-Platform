import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserLock } from "react-icons/fa";
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
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          LastName:lastName,
          Email:emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {/* Background image with overlay */}
      <img
        src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1500&q=80"
        alt="TechTribe tech background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-base-200 via-base-100 to-base-300 opacity-90 z-10"></div>
      {/* Main content */}
      <div className="relative z-20 w-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-base-100 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(31,41,55,0.15)] w-full max-w-md border border-base-200 relative overflow-hidden"
        >
          {/* Accent Glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl z-0"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl z-0"></div>
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-6 relative z-10">
            <div className="bg-primary p-3 rounded-full shadow-lg mb-2 animate-bounce">
              <FaUserLock className="text-white text-3xl" />
            </div>
            <h3 className="text-3xl font-extrabold text-primary drop-shadow-lg tracking-wide">
              {isLoginForm ? "Welcome Back" : "Welcome to TechTribe"}
            </h3>
            <p className="text-sm text-base-content opacity-70">
              {isLoginForm
                ? "Please login to continue"
                : "Signup to get started"}
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-5 relative z-10"
            onSubmit={isLoginForm ? handleLogin : handleSignUp}
          >
            {/* First & Last Name for Signup */}
            {!isLoginForm && (
              <>
                <div>
                  <label
                    className="block text-base-content mb-1 font-semibold"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    value={firstName}
                    className="input input-bordered w-full bg-base-100 text-base-content focus:ring-2 focus:ring-primary rounded-xl"
                    type="text"
                    id="firstName"
                    placeholder="Enter your first name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    className="block text-base-content mb-1 font-semibold"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    value={lastName}
                    className="input input-bordered w-full bg-base-100 text-base-content focus:ring-2 focus:ring-primary rounded-xl"
                    type="text"
                    id="lastName"
                    placeholder="Enter your last name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label
                className="block text-base-content mb-1 font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="input input-bordered w-full bg-base-100 text-base-content focus:ring-2 focus:ring-primary rounded-xl"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-base-content mb-1 font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="input input-bordered w-full bg-base-100 text-base-content focus:ring-2 focus:ring-primary rounded-xl"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-center font-semibold bg-base-100 rounded-lg py-2 shadow">
                {error}
              </p>
            )}

            {/* Auth navigation */}
            <div className="flex justify-between text-sm text-primary font-semibold">
              <span className="hover:underline cursor-pointer">
                Forgot password?
              </span>
              <span
                className="hover:underline cursor-pointer"
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm ? "Sign up" : "Login"}
              </span>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary w-full mt-2 shadow-lg text-lg font-bold tracking-wide"
              type="submit"
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
