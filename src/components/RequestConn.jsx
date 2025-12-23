import api from "../utils/api";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import {
  FaHeart,
  FaTimes,
  FaSpinner,
  FaSadTear,
  FaCheck,
  FaBan,
} from "react-icons/fa";

const RequestConn = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const reviewRequest = async (status, _id) => {
    // Guard: Don't make request if no token
    const token = localStorage.getItem("token");
    if (!token) return;
    
    try {
      setProcessingId(_id);
      const res = await api.post(`/request/review/${status}/${_id}`, {});
      dispatch(removeRequest(_id));
    } catch (error) {
      // 401 is handled by api interceptor
      if (error?.response?.status !== 401) {
        console.error(error.message);
      }
    } finally {
      setProcessingId(null);
    }
  };

  const getRequest = async () => {
    // Guard: Don't make request if no token
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const res = await api.get("/user/requests/recieved");
      console.log(res.data);
      dispatch(addRequests(res.data.data || []));
    } catch (error) {
      // 401 is handled by api interceptor
      if (error?.response?.status !== 401) {
        console.error("Error fetching requests:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequest();
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
          Loading requests... 💌
        </p>
      </div>
    );
  }

  if (!Array.isArray(requests) || requests.length === 0) {
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
            No pending requests 😊
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-md">
            All caught up! When someone shows interest, you'll see it here! 💖
          </p>
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
              Connection <span className="tinder-gradient">Requests</span> 💌
            </h1>
            <FaHeart className="text-5xl text-pink-400 animate-pulse" />
          </div>
          <p className="text-white/70 text-xl">
            {requests.length} {requests.length === 1 ? "person" : "people"}{" "}
            {requests.length === 1 ? "wants" : "want"} to connect! 🎉
          </p>
        </motion.div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {requests.map((request, idx) => {
              const {
                firstName,
                LastName,
                profile,
                age,
                gender,
                about,
                skills,
              } = request.fromUserId || {};
              const isProcessing = processingId === request._id;

              return (
                <motion.div
                  key={request._id || idx}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -100 }}
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
                      {/* Request Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-3 py-1 shadow-lg animate-pulse">
                        <span className="text-white font-bold text-sm flex items-center gap-1">
                          New! ✨
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
                          {about || "Tech enthusiast ready to connect! 🚀"}
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

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-auto">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => reviewRequest("accepted", request._id)}
                          disabled={isProcessing}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <>
                              <FaCheck />
                              Accept 💚
                            </>
                          )}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => reviewRequest("rejected", request._id)}
                          disabled={isProcessing}
                          className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <>
                              <FaBan />
                              Reject
                            </>
                          )}
                        </motion.button>
                      </div>
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
            💡 Accept to start chatting, or reject if it's not a good match! ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestConn;
