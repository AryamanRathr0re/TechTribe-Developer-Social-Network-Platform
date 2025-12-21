import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBell,
  FaHeart,
  FaComments,
  FaUserPlus,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

const NotificationCenter = ({ notifications = [], onClose, isOpen }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unread = notifications.filter((n) => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const markAsRead = (id) => {
    // This would call an API endpoint to mark notification as read
    console.log("Mark as read:", id);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "match":
        return <FaHeart className="text-pink-500" />;
      case "message":
        return <FaComments className="text-blue-500" />;
      case "connection_request":
        return <FaUserPlus className="text-green-500" />;
      default:
        return <FaBell className="text-yellow-500" />;
    }
  };

  const getNotificationMessage = (notification) => {
    switch (notification.type) {
      case "match":
        return `🎉 It's a match! ${notification.userName} also likes you!`;
      case "message":
        return `💬 ${notification.userName} sent you a message`;
      case "connection_request":
        return `👋 ${notification.userName} wants to connect`;
      case "profile_view":
        return `👀 ${notification.userName} viewed your profile`;
      default:
        return notification.message || "New notification";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Notification Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaBell className="text-2xl text-pink-400" />
                <h2 className="text-2xl font-black text-white">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-2 px-2 py-1 bg-red-500 rounded-full text-xs">
                      {unreadCount}
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FaBell className="text-6xl text-white/30 mb-4" />
                  <p className="text-white/70 text-lg">No notifications yet</p>
                  <p className="text-white/50 text-sm mt-2">
                    You'll see updates here when something happens! 🔔
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:border-pink-500/50 transition-all cursor-pointer ${
                      !notification.read
                        ? "bg-pink-500/10 border-pink-500/30"
                        : ""
                    }`}
                    onClick={() =>
                      !notification.read && markAsRead(notification.id)
                    }
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm">
                          {getNotificationMessage(notification)}
                        </p>
                        <p className="text-white/60 text-xs mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md border-t border-white/20 p-4">
                <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all">
                  Mark All as Read
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;
