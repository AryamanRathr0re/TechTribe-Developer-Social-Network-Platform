import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import {
  FaHeart,
  FaSadTear,
  FaSpinner,
  FaFilter,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minAge: "",
    maxAge: "",
    gender: "",
    skills: [],
    searchTerm: "",
  });
  const [filteredFeed, setFilteredFeed] = useState([]);

  const getFeed = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res?.data));
      setFilteredFeed(res?.data || []);
      setCurrentIndex(0);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Apply filters when feed or filters change
  useEffect(() => {
    if (!feed || feed.length === 0) {
      setFilteredFeed([]);
      return;
    }

    let filtered = [...feed];

    // Search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.firstName?.toLowerCase().includes(searchLower) ||
          user.LastName?.toLowerCase().includes(searchLower) ||
          user.about?.toLowerCase().includes(searchLower) ||
          user.skills?.some((skill) =>
            skill.toLowerCase().includes(searchLower)
          )
      );
    }

    // Age filter
    if (filters.minAge) {
      filtered = filtered.filter(
        (user) => user.age >= parseInt(filters.minAge)
      );
    }
    if (filters.maxAge) {
      filtered = filtered.filter(
        (user) => user.age <= parseInt(filters.maxAge)
      );
    }

    // Gender filter
    if (filters.gender) {
      filtered = filtered.filter((user) => user.gender === filters.gender);
    }

    // Skills filter
    if (filters.skills.length > 0) {
      filtered = filtered.filter((user) =>
        filters.skills.every((skill) =>
          user.skills?.some((userSkill) =>
            userSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    setFilteredFeed(filtered);
    setCurrentIndex(0);
  }, [feed, filters]);

  // Handle when a user is removed from feed
  useEffect(() => {
    if (
      filteredFeed &&
      filteredFeed.length > 0 &&
      currentIndex >= filteredFeed.length
    ) {
      setCurrentIndex(0);
      if (filteredFeed.length === 0) {
        getFeed();
      }
    }
  }, [filteredFeed, currentIndex]);

  const handleAddSkillFilter = (skill) => {
    if (skill && !filters.skills.includes(skill)) {
      setFilters({ ...filters, skills: [...filters.skills, skill] });
    }
  };

  const handleRemoveSkillFilter = (skillToRemove) => {
    setFilters({
      ...filters,
      skills: filters.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const clearFilters = () => {
    setFilters({
      minAge: "",
      maxAge: "",
      gender: "",
      skills: [],
      searchTerm: "",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full mb-4"
        />
        <p className="text-white text-xl font-semibold">
          Finding awesome people for you... 🚀
        </p>
      </div>
    );
  }

  const currentUser = filteredFeed[currentIndex];
  const remainingCount = filteredFeed.length - currentIndex - 1;
  const hasActiveFilters =
    filters.searchTerm ||
    filters.minAge ||
    filters.maxAge ||
    filters.gender ||
    filters.skills.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Filter Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-black text-white">
              Discover <span className="tinder-gradient">Tech Talent</span> 🚀
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`btn rounded-full px-4 py-2 flex items-center gap-2 ${
                hasActiveFilters
                  ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              } border-0`}
            >
              <FaFilter />
              <span className="hidden md:inline">Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              )}
            </motion.button>
          </div>
          <p className="text-white/70 text-lg">
            {remainingCount > 0 ? (
              <>
                {remainingCount} {remainingCount === 1 ? "person" : "people"}{" "}
                waiting to connect! 💫
              </>
            ) : hasActiveFilters ? (
              "No matches with current filters 🎯"
            ) : (
              "Last one! Make it count! 🎯"
            )}
          </p>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaFilter /> Advanced Filters
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-pink-400 hover:text-pink-300 text-sm font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Search */}
                <div>
                  <label className="block text-white/90 mb-2 text-sm font-semibold">
                    <FaSearch className="inline mr-2" /> Search
                  </label>
                  <input
                    type="text"
                    value={filters.searchTerm}
                    onChange={(e) =>
                      setFilters({ ...filters, searchTerm: e.target.value })
                    }
                    placeholder="Search by name, skills, or bio..."
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                {/* Age Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/90 mb-2 text-sm font-semibold">
                      Min Age
                    </label>
                    <input
                      type="number"
                      value={filters.minAge}
                      onChange={(e) =>
                        setFilters({ ...filters, minAge: e.target.value })
                      }
                      placeholder="18"
                      className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/90 mb-2 text-sm font-semibold">
                      Max Age
                    </label>
                    <input
                      type="number"
                      value={filters.maxAge}
                      onChange={(e) =>
                        setFilters({ ...filters, maxAge: e.target.value })
                      }
                      placeholder="99"
                      className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-white/90 mb-2 text-sm font-semibold">
                    Gender
                  </label>
                  <select
                    value={filters.gender}
                    onChange={(e) =>
                      setFilters({ ...filters, gender: e.target.value })
                    }
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Other</option>
                  </select>
                </div>

                {/* Skills Filter */}
                <div>
                  <label className="block text-white/90 mb-2 text-sm font-semibold">
                    Skills
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {filters.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-pink-500/30 rounded-full text-white text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button
                          onClick={() => handleRemoveSkillFilter(skill)}
                          className="hover:text-red-300"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add skill filter (e.g., React, Python)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value.trim()) {
                        handleAddSkillFilter(e.target.value.trim());
                        e.target.value = "";
                      }
                    }}
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Stack Indicator */}
        {filteredFeed.length > 1 && (
          <div className="flex justify-center gap-2 mb-6">
            {filteredFeed
              .slice(0, Math.min(5, filteredFeed.length))
              .map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-pink-500"
                      : index < currentIndex
                      ? "w-2 bg-pink-500/30"
                      : "w-2 bg-white/20"
                  }`}
                />
              ))}
            {filteredFeed.length > 5 && (
              <div className="w-2 h-1 rounded-full bg-white/20" />
            )}
          </div>
        )}

        {/* Card Container */}
        {filteredFeed.length > 0 ? (
          <div className="relative" style={{ height: "650px" }}>
            <AnimatePresence>
              {currentUser && (
                <motion.div
                  key={currentUser._id || currentIndex}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50, rotate: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <UserCard
                    user={currentUser}
                    onSwipeComplete={() => {
                      setCurrentIndex((prev) => {
                        if (prev < filteredFeed.length - 1) {
                          return prev + 1;
                        }
                        // Re-fetch when we reach the end so new users appear
                        getFeed();
                        return prev;
                      });
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <FaSadTear className="text-6xl text-pink-400 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              No matches found 😢
            </h3>
            <p className="text-white/70 mb-4">
              {hasActiveFilters
                ? "Try adjusting your filters"
                : "Check back later!"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="btn bg-gradient-to-r from-pink-500 to-red-500 text-white border-none rounded-full px-6 py-2"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Quick Actions Hint */}
        {filteredFeed.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-8 text-white/60 text-sm"
          >
            💡 Tip: Swipe right to like, left to pass, or use the buttons below!
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Feed;
