import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaEye,
  FaHeart,
  FaComments,
  FaChartLine,
  FaArrowUp,
  FaUser,
} from "react-icons/fa";

const ProfileAnalytics = () => {
  const [stats, setStats] = useState({
    profileViews: 0,
    likes: 0,
    matches: 0,
    messages: 0,
    responseRate: 0,
    averageMatchRate: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Fetch analytics data
    // This would call an API endpoint
    setStats({
      profileViews: 245,
      likes: 89,
      matches: 34,
      messages: 156,
      responseRate: 87,
      averageMatchRate: 38,
    });

    setRecentActivity([
      { type: "view", count: 12, date: "Today" },
      { type: "like", count: 5, date: "Today" },
      { type: "match", count: 2, date: "Yesterday" },
      { type: "message", count: 8, date: "This week" },
    ]);
  }, []);

  const StatCard = ({ icon, label, value, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-pink-500/50 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}
        >
          {icon}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-400 text-sm">
            <FaArrowUp /> {trend}%
          </div>
        )}
      </div>
      <h3 className="text-3xl font-black text-white mb-1">{value}</h3>
      <p className="text-white/70 text-sm">{label}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-2">
            Profile <span className="tinder-gradient">Analytics</span> 📊
          </h1>
          <p className="text-white/70 text-xl">
            Track your profile performance and engagement! 📈
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatCard
            icon={<FaEye className="text-white text-xl" />}
            label="Profile Views"
            value={stats.profileViews}
            color="from-blue-500 to-cyan-500"
            trend={12}
          />
          <StatCard
            icon={<FaHeart className="text-white text-xl" />}
            label="Total Likes"
            value={stats.likes}
            color="from-pink-500 to-red-500"
            trend={8}
          />
          <StatCard
            icon={<FaUser className="text-white text-xl" />}
            label="Matches"
            value={stats.matches}
            color="from-green-500 to-emerald-500"
            trend={5}
          />
          <StatCard
            icon={<FaComments className="text-white text-xl" />}
            label="Messages"
            value={stats.messages}
            color="from-purple-500 to-pink-500"
          />
          <StatCard
            icon={<FaChartLine className="text-white text-xl" />}
            label="Response Rate"
            value={`${stats.responseRate}%`}
            color="from-orange-500 to-yellow-500"
            trend={3}
          />
          <StatCard
            icon={<FaChartLine className="text-white text-xl" />}
            label="Match Rate"
            value={`${stats.averageMatchRate}%`}
            color="from-indigo-500 to-purple-500"
            trend={7}
          />
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
            <FaChartLine className="text-pink-400" /> Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500/30 to-red-500/30 flex items-center justify-center">
                    {activity.type === "view" && (
                      <FaEye className="text-pink-400" />
                    )}
                    {activity.type === "like" && (
                      <FaHeart className="text-pink-400" />
                    )}
                    {activity.type === "match" && (
                      <FaUser className="text-green-400" />
                    )}
                    {activity.type === "message" && (
                      <FaComments className="text-blue-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold capitalize">
                      {activity.count} {activity.type}
                      {activity.count !== 1
                        ? activity.type === "match"
                          ? "es"
                          : "s"
                        : ""}
                    </p>
                    <p className="text-white/60 text-sm">{activity.date}</p>
                  </div>
                </div>
                <div className="text-white/40 text-sm">{activity.type}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-pink-500/20 to-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-pink-500/30"
        >
          <h3 className="text-xl font-bold text-white mb-4">
            💡 Tips to Improve
          </h3>
          <ul className="space-y-2 text-white/80">
            <li>✅ Add more photos to increase profile views by 40%</li>
            <li>✅ Complete your bio to get 3x more matches</li>
            <li>✅ Verify your profile to gain trust</li>
            <li>✅ Be active daily to stay visible</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileAnalytics;
