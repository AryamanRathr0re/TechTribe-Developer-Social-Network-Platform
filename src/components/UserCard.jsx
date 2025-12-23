import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import api from "../utils/api";
import {
  FaHeart,
  FaTimes,
  FaStar,
  FaInfoCircle,
  FaCheckCircle,
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const SWIPE_THRESHOLD = 100;
const ROTATION_MULTIPLIER = 0.1;

// Calculate compatibility score
const calculateCompatibility = (currentUser, targetUser) => {
  if (!currentUser || !targetUser) return 0;

  let score = 0;
  const currentSkills = currentUser.skills || [];
  const targetSkills = targetUser.skills || [];

  // Skills match (40%)
  const commonSkills = currentSkills.filter((skill) =>
    targetSkills.some((ts) => ts.toLowerCase() === skill.toLowerCase())
  );
  score +=
    (commonSkills.length /
      Math.max(currentSkills.length, targetSkills.length, 1)) *
    40;

  // Age proximity (20%)
  if (currentUser.age && targetUser.age) {
    const ageDiff = Math.abs(currentUser.age - targetUser.age);
    score += Math.max(0, 20 - ageDiff * 2);
  }

  // Bio similarity (20%)
  if (currentUser.about && targetUser.about) {
    const currentWords = currentUser.about.toLowerCase().split(/\s+/);
    const targetWords = targetUser.about.toLowerCase().split(/\s+/);
    const commonWords = currentWords.filter((word) =>
      targetWords.includes(word)
    );
    score +=
      (commonWords.length /
        Math.max(currentWords.length, targetWords.length, 1)) *
      20;
  }

  // Verification badges (20%)
  const verifications = targetUser.verifications || {};
  const verifiedCount = Object.values(verifications).filter((v) => v).length;
  score += (verifiedCount / 4) * 20; // Max 4 verifications

  return Math.round(Math.min(100, score));
};

const UserCard = ({ user, onSwipeComplete }) => {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showDetails, setShowDetails] = useState(false);
  const [superLikeAvailable, setSuperLikeAvailable] = useState(true);
  const {
    _id,
    firstName,
    LastName,
    profile,
    age,
    gender,
    about,
    skills,
    verifications = {},
    photos = [],
  } = user;
  const currentUser = useSelector((store) => store.user);
  const compatibility = calculateCompatibility(currentUser, user);
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const opacity = useTransform(
    x,
    [-200, -SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD, 200],
    [0, 1, 1, 1, 0]
  );
  const controls = useAnimation();

  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const nopeOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  const handleSendRequest = async (status, userId, isSuperLike = false) => {
    // Guard: Don't make request if no token
    const token = localStorage.getItem("token");
    if (!token) {
      setToast({
        show: true,
        message: "❌ Please log in to send requests.",
        type: "error",
      });
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 2000);
      return;
    }
    
    try {
      // Animate card out
      await controls.start({
        x: status === "interested" ? 500 : -500,
        rotate: status === "interested" ? 30 : -30,
        opacity: 0,
        transition: { duration: 0.3 },
      });

      const endpoint = isSuperLike
        ? "/request/send/superlike/" + userId
        : "/request/send/" + status + "/" + userId;

      const res = await api.post(endpoint, {});

      if (isSuperLike) {
        setSuperLikeAvailable(false);
      }

      setToast({
        show: true,
        message: isSuperLike
          ? "⭐ Super Like sent! Amazing! ✨"
          : status === "interested"
          ? "❤️ Interest sent! ✨"
          : "👋 User ignored",
        type: isSuperLike || status === "interested" ? "success" : "info",
      });
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
      if (onSwipeComplete) {
        setTimeout(() => onSwipeComplete(), 300);
      }
    } catch (error) {
      console.error(error);
      setToast({
        show: true,
        message: "❌ Something went wrong!",
        type: "error",
      });
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 2000);
    }
  };

  const handleDragEnd = async (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > SWIPE_THRESHOLD || Math.abs(velocity) > 500) {
      const swipeDirection = offset > 0 ? "right" : "left";
      const status = swipeDirection === "right" ? "interested" : "ignored";
      await handleSendRequest(status, _id);
    } else {
      // Snap back to center
      controls.start({ x: 0, y: 0, rotate: 0, opacity: 1 });
    }
  };

  return (
    <div
      className="relative w-full max-w-md mx-auto"
      style={{ height: "600px", perspective: "1000px" }}
    >
      {/* Toast Notification */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-2xl text-white font-bold text-lg ${
            toast.type === "success"
              ? "bg-gradient-to-r from-pink-500 to-red-500"
              : toast.type === "error"
              ? "bg-red-600"
              : "bg-gray-600"
          }`}
        >
          {toast.message}
        </motion.div>
      )}

      {/* Card */}
      <motion.div
        ref={cardRef}
        className="absolute inset-0 tinder-card"
        style={{
          x,
          y,
          rotate,
          opacity,
          zIndex: 10,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileDrag={{ cursor: "grabbing" }}
      >
        {/* Swipe Overlays */}
        <motion.div
          className="swipe-overlay like"
          style={{ opacity: likeOpacity }}
        >
          <div className="flex flex-col items-center gap-2">
            <FaHeart className="text-7xl" />
            <span className="text-3xl font-black">LIKE</span>
          </div>
        </motion.div>
        <motion.div
          className="swipe-overlay nope"
          style={{ opacity: nopeOpacity }}
        >
          <div className="flex flex-col items-center gap-2">
            <FaTimes className="text-7xl" />
            <span className="text-3xl font-black">NOPE</span>
          </div>
        </motion.div>

        {/* Profile Image */}
        <div className="relative h-[500px] overflow-hidden">
          <img
            src={
              profile ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"
            }
            alt={`${firstName} ${LastName}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(firstName + " " + LastName) +
                "&background=ff4458&color=fff&size=400";
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Info Button */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="absolute top-4 right-4 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <FaInfoCircle className="text-white text-xl" />
          </button>

          {/* Age Badge & Compatibility Score */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
              <span className="text-white font-bold text-lg">
                {age || "?"} 🎂
              </span>
            </div>
            {compatibility > 0 && (
              <div className="px-4 py-2 bg-gradient-to-r from-green-500/80 to-emerald-500/80 backdrop-blur-md rounded-full">
                <span className="text-white font-bold text-sm">
                  {compatibility}% Match 💚
                </span>
              </div>
            )}
          </div>

          {/* Verification Badges */}
          {(verifications.github ||
            verifications.linkedin ||
            verifications.email ||
            verifications.portfolio) && (
            <div className="absolute top-4 right-16 flex gap-2">
              {verifications.email && (
                <div
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                  title="Email Verified"
                >
                  <FaCheckCircle className="text-white text-sm" />
                </div>
              )}
              {verifications.github && (
                <div
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center"
                  title="GitHub Verified"
                >
                  <FaGithub className="text-white text-sm" />
                </div>
              )}
              {verifications.linkedin && (
                <div
                  className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center"
                  title="LinkedIn Verified"
                >
                  <FaLinkedin className="text-white text-sm" />
                </div>
              )}
              {verifications.portfolio && (
                <div
                  className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center"
                  title="Portfolio Verified"
                >
                  <FaGlobe className="text-white text-sm" />
                </div>
              )}
            </div>
          )}

          {/* Details Panel */}
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-6 max-h-[300px] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {firstName} {LastName}{" "}
                {gender === "male" ? "👨" : gender === "female" ? "👩" : "🧑"}
              </h3>
              <p className="text-white/80 mb-4">{about || "No bio yet..."}</p>

              {skills && skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white text-sm font-semibold"
                    >
                      {skill} ⚡
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Profile Info (Bottom) */}
          {!showDetails && (
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-3xl font-black mb-1 drop-shadow-lg">
                {firstName} {LastName}
                {gender === "male"
                  ? " 👨"
                  : gender === "female"
                  ? " 👩"
                  : " 🧑"}
              </h2>
              <p className="text-lg text-white/90 drop-shadow-md">
                {about
                  ? about.length > 80
                    ? about.substring(0, 80) + "..."
                    : about
                  : "Tech enthusiast 🚀"}
              </p>
              {skills && skills.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {skills.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {skills.length > 3 && (
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                      +{skills.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-6 z-20">
          {/* Nope Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSendRequest("ignored", _id)}
            className="w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center hover:bg-gray-100 transition-all"
            style={{ boxShadow: "0 4px 20px rgba(244, 67, 54, 0.4)" }}
          >
            <FaTimes className="text-3xl text-red-500" />
          </motion.button>

          {/* Super Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (superLikeAvailable) {
                handleSendRequest("interested", _id, true);
              } else {
                setToast({
                  show: true,
                  message:
                    "⭐ You've used all your Super Likes! Upgrade to Premium for unlimited! 💎",
                  type: "info",
                });
                setTimeout(
                  () => setToast({ show: false, message: "", type: "" }),
                  3000
                );
              }
            }}
            disabled={!superLikeAvailable}
            className={`w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center transition-all ${
              superLikeAvailable
                ? "hover:bg-gray-100"
                : "opacity-50 cursor-not-allowed"
            }`}
            style={{ boxShadow: "0 4px 20px rgba(33, 150, 243, 0.4)" }}
            title={
              superLikeAvailable ? "Super Like ⭐" : "Super Likes limit reached"
            }
          >
            <FaStar className="text-3xl text-blue-500" />
          </motion.button>

          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSendRequest("interested", _id)}
            className="w-16 h-16 rounded-full bg-white shadow-2xl flex items-center justify-center hover:bg-gray-100 transition-all"
            style={{ boxShadow: "0 4px 20px rgba(76, 175, 80, 0.4)" }}
          >
            <FaHeart className="text-3xl text-green-500" />
          </motion.button>
        </div>
      </motion.div>

      {/* Hint Text */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm z-0">
        👈 Swipe or tap buttons to connect
      </div>
    </div>
  );
};

export default UserCard;
