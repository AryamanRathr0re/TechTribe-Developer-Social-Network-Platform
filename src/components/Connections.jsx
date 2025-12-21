import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useNavigate } from "react-router-dom";
import { FaComments, FaHeart, FaSpinner, FaSadTear } from "react-icons/fa";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full mb-4"
        />
        <p className="text-white text-xl font-semibold">
          Loading your matches... 💖
        </p>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <FaSadTear className="text-8xl text-pink-400 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-white mb-4">
            No connections yet 😢
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-md">
            Start swiping to find your perfect tech match! Your connections will
            appear here! 🚀
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/feed")}
            className="btn bg-gradient-to-r from-pink-500 to-red-500 text-white border-none rounded-full px-8 py-3 text-lg font-bold shadow-lg hover:shadow-xl"
          >
            💖 Start Swiping
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <FaHeart className="text-5xl text-pink-400 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-black text-white">
              Your <span className="tinder-gradient">Matches</span> 🎉
            </h1>
            <FaHeart className="text-5xl text-pink-400 animate-pulse" />
          </div>
          <p className="text-white/70 text-xl">
            {connections.length}{" "}
            {connections.length === 1
              ? "amazing connection"
              : "amazing connections"}{" "}
            waiting! 💫
          </p>
        </motion.div>

        {/* Connections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {connections.map((connection, idx) => {
              const {
                _id,
                firstName,
                LastName,
                profile,
                age,
                gender,
                about,
                skills,
              } = connection;

              return (
                <motion.div
                  key={_id || idx}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:border-pink-500/50 transition-all duration-300 h-full flex flex-col">
                    {/* Profile Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        alt="profile"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={profile}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://ui-avatars.com/api/?name=" +
                            encodeURIComponent(firstName + " " + LastName) +
                            "&background=ff4458&color=fff&size=400";
                        }}
                      />
                      {/* Match Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full px-3 py-1 shadow-lg">
                        <span className="text-white font-bold text-sm flex items-center gap-1">
                          <FaHeart className="text-xs" /> Match!
                        </span>
                      </div>
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    {/* Profile Info */}
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="mb-4">
                        <h2 className="text-2xl font-black text-white mb-1 flex items-center gap-2">
                          {firstName} {LastName}
                          {gender === "male"
                            ? " 👨"
                            : gender === "female"
                            ? " 👩"
                            : " 🧑"}
                        </h2>
                        <p className="text-white/70 text-sm mb-3">
                          {age || "?"} years old 🎂
                        </p>
                        <p className="text-white/90 text-sm leading-relaxed line-clamp-2">
                          {about ||
                            "Tech enthusiast ready to build amazing things! 🚀"}
                        </p>
                      </div>

                      {/* Skills */}
                      {skills && Array.isArray(skills) && skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {skills.slice(0, 3).map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gradient-to-r from-pink-500/30 to-red-500/30 backdrop-blur-sm rounded-full text-white text-xs font-semibold border border-pink-500/50"
                            >
                              {skill} ⚡
                            </span>
                          ))}
                          {skills.length > 3 && (
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                              +{skills.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Chat Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/chat/${_id}`)}
                        className="mt-auto w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FaComments />
                        Start Chatting 💬
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-white/60"
        >
          <p className="text-lg">
            💡 Found someone interesting? Start a conversation and see where it
            leads! 🚀
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Connections;
