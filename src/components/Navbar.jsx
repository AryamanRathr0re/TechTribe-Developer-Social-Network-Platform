import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import {
  FaRocket,
  FaUser,
  FaComments,
  FaHeart,
  FaBell,
  FaSignOutAlt,
  FaCog,
  FaChartLine,
} from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  // Notification center removed
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50"
    >
      <div className="navbar bg-gradient-to-r from-pink-600 via-red-500 to-pink-600 backdrop-blur-md shadow-2xl px-4 md:px-8 py-3 border-b border-white/10 min-h-[70px]">
        <div className="flex-1 flex items-center">
          <Link
            to="/"
            className="flex items-center gap-2 md:gap-3 text-2xl hover:scale-105 transition-transform duration-300 no-underline h-full"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-white flex items-center"
            >
              <FaRocket className="text-2xl md:text-3xl" />
            </motion.div>
            <span
              className="hidden md:inline font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white text-2xl md:text-3xl tracking-tight leading-none"
              style={{
                fontFamily:
                  "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen', 'Ubuntu', sans-serif",
                textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                letterSpacing: "-0.5px",
              }}
            >
              TechTribe
            </span>
            <span className="text-xl md:text-2xl animate-pulse leading-none">
              🚀
            </span>
          </Link>
        </div>

        <div className="flex-none flex items-center gap-2 md:gap-4 h-full">
          {user ? (
            <>
              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-2 h-full">
                <Link
                  to="/feed"
                  className="flex items-center gap-2 text-white hover:bg-white/25 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 h-full"
                >
                  <FaHeart className="text-lg" />
                  <span className="font-semibold text-sm md:text-base">
                    Discover
                  </span>
                </Link>
                <Link
                  to="/connections"
                  className="flex items-center gap-2 text-white hover:bg-white/25 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 h-full"
                >
                  <FaComments className="text-lg" />
                  <span className="font-semibold text-sm md:text-base">
                    Matches
                  </span>
                </Link>
                <Link
                  to="/request"
                  className="relative flex items-center gap-2 text-white hover:bg-white/25 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 h-full"
                >
                  <FaBell className="text-lg" />
                  <span className="font-semibold text-sm md:text-base">
                    Requests
                  </span>
                </Link>
              </div>

              {/* User Menu */}
              <div
                className="relative flex items-center h-full"
                ref={dropdownRef}
              >
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center hover:ring-2 hover:ring-white/80 transition-all duration-300 p-0 border-0 bg-transparent h-full"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-lg ring-2 ring-white/50 overflow-hidden flex items-center justify-center">
                    <img
                      src={
                        user.profile ||
                        "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(user.firstName) +
                          "&background=ff4458&color=fff"
                      }
                      alt="User"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(user.firstName) +
                          "&background=ff4458&color=fff";
                      }}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 z-[100] p-2 shadow-2xl menu menu-sm bg-white rounded-2xl w-56 border border-gray-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <li className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-red-50 rounded-t-xl">
                        <span className="font-bold text-gray-800 text-base">
                          👋 Hey, {user.firstName}!
                        </span>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 rounded-xl transition-colors text-gray-800 no-underline"
                        >
                          <FaUser className="text-pink-500 text-lg" />
                          <span className="font-semibold">Profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/connections"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 rounded-xl transition-colors text-gray-800 no-underline"
                        >
                          <FaComments className="text-pink-500 text-lg" />
                          <span className="font-semibold">Connections</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/request"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 rounded-xl transition-colors text-gray-800 no-underline"
                        >
                          <FaBell className="text-pink-500 text-lg" />
                          <span className="font-semibold">Requests</span>
                          <span className="badge badge-warning badge-sm text-xs">
                            New
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/analytics"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 rounded-xl transition-colors text-gray-800 no-underline"
                        >
                          <FaChartLine className="text-pink-500 text-lg" />
                          <span className="font-semibold">Analytics</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-gray-800 no-underline"
                        >
                          <FaCog className="text-gray-500 text-lg" />
                          <span className="font-semibold">Settings</span>
                        </Link>
                      </li>
                      <li className="border-t border-gray-200 mt-1">
                        <button
                          onClick={() => {
                            setShowDropdown(false);
                            handleLogout();
                          }}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 rounded-xl transition-colors w-full text-left font-semibold border-0 bg-transparent"
                        >
                          <FaSignOutAlt className="text-lg" />
                          Logout
                        </button>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <div
                className="md:hidden relative flex items-center h-full"
                ref={mobileMenuRef}
              >
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="flex items-center justify-center w-10 h-10 text-white border-0 hover:bg-white/25 rounded-full transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {showMobileMenu && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 z-[100] p-2 shadow-2xl menu menu-sm bg-white rounded-2xl w-52 border border-gray-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <li>
                        <Link
                          to="/feed"
                          onClick={() => setShowMobileMenu(false)}
                          className="font-semibold text-gray-800 no-underline hover:bg-pink-50 rounded-lg px-4 py-2"
                        >
                          💖 Discover
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/connections"
                          onClick={() => setShowMobileMenu(false)}
                          className="font-semibold text-gray-800 no-underline hover:bg-pink-50 rounded-lg px-4 py-2"
                        >
                          💬 Matches
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/request"
                          onClick={() => setShowMobileMenu(false)}
                          className="font-semibold text-gray-800 no-underline hover:bg-pink-50 rounded-lg px-4 py-2"
                        >
                          🔔 Requests
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => setShowMobileMenu(false)}
                          className="font-semibold text-gray-800 no-underline hover:bg-pink-50 rounded-lg px-4 py-2"
                        >
                          👤 Profile
                        </Link>
                      </li>
                      <li className="border-t border-gray-200 mt-1">
                        <button
                          onClick={() => {
                            setShowMobileMenu(false);
                            handleLogout();
                          }}
                          className="text-red-600 font-semibold w-full text-left px-4 py-2 hover:bg-red-50 rounded-lg border-0 bg-transparent"
                        >
                          🚪 Logout
                        </button>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center justify-center bg-white text-pink-600 hover:bg-gray-100 rounded-full px-4 md:px-6 py-2 font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 h-full"
            >
              <span className="text-sm md:text-base">Login</span>
              <span className="ml-1 text-base md:text-lg">🚀</span>
            </Link>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default Navbar;
