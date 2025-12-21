import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";
import {
  FaArrowLeft,
  FaPaperPlane,
  FaSmile,
  FaEllipsisV,
} from "react-icons/fa";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatMessages = async () => {
    try {
      setLoading(true);
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.LastName,
          userId: senderId?._id,
          text,
          timestamp: msg.createdAt || new Date(),
        };
      });

      setMessages(chatMessages || []);

      // Get target user info
      if (chat?.data?.participants) {
        const target = chat.data.participants.find(
          (p) => p._id === targetUserId
        );
        if (target) {
          setTargetUser(target);
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on(
      "messageReceived",
      ({ firstName, LastName, text, userId: senderId }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            firstName,
            lastName: LastName,
            text,
            userId: senderId,
            timestamp: new Date(),
          },
        ]);
      }
    );

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  const sendMessage = (e) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.LastName,
      userId,
      targetUserId,
      text: newMessage.trim(),
    });

    setMessages((prev) => [
      ...prev,
      {
        firstName: user.firstName,
        lastName: user.LastName,
        text: newMessage.trim(),
        userId,
        timestamp: new Date(),
      },
    ]);

    setNewMessage("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      {/* Chat Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-4 flex items-center gap-4 shadow-lg"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/connections")}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <FaArrowLeft />
        </motion.button>

        {targetUser && (
          <>
            <img
              src={
                targetUser.profile ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  targetUser.firstName
                )}&background=ff4458&color=fff`
              }
              alt={targetUser.firstName}
              className="w-12 h-12 rounded-full border-2 border-pink-500 object-cover"
            />
            <div className="flex-1">
              <h2 className="text-white font-bold text-lg">
                {targetUser.firstName} {targetUser.LastName} 💬
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-white/60 text-sm">
                  {targetUser.isOnline ? "Online now ✨" : "Last seen recently"}
                </p>
              </div>
            </div>
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <FaEllipsisV />
        </motion.button>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => {
            const isOwnMessage = msg.userId === userId;
            const showAvatar =
              index === 0 || messages[index - 1].userId !== msg.userId;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex gap-3 ${
                  isOwnMessage ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                {showAvatar && (
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={
                        isOwnMessage
                          ? user?.profile ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user?.firstName
                            )}&background=ff4458&color=fff`
                          : targetUser?.profile ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              msg.firstName
                            )}&background=ff4458&color=fff`
                      }
                      alt={msg.firstName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {!showAvatar && <div className="w-8" />}

                {/* Message Bubble */}
                <div
                  className={`flex flex-col ${
                    isOwnMessage ? "items-end" : "items-start"
                  } max-w-[70%]`}
                >
                  {showAvatar && (
                    <span className="text-white/60 text-xs mb-1 px-2">
                      {msg.firstName} {msg.lastName}
                    </span>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-2xl px-4 py-2.5 shadow-lg ${
                      isOwnMessage
                        ? "bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-tr-sm"
                        : "bg-white/20 backdrop-blur-md text-white rounded-tl-sm border border-white/20"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>
                  </motion.div>
                  <div className="flex items-center gap-2 mt-1 px-2">
                    <span className="text-white/40 text-xs">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {isOwnMessage && (
                      <span className="text-white/40 text-xs flex items-center gap-1">
                        {msg.read ? (
                          <>
                            <span className="text-blue-400">✓✓</span> Read
                          </>
                        ) : (
                          <>
                            <span>✓</span> Sent
                          </>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.form
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onSubmit={sendMessage}
        className="bg-white/10 backdrop-blur-md border-t border-white/20 px-4 py-4"
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <FaSmile className="text-xl" />
          </motion.button>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && !e.shiftKey && sendMessage(e)
            }
            className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Type a message... 💬"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            disabled={!newMessage.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              newMessage.trim()
                ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg hover:shadow-xl"
                : "bg-white/20 text-white/50 cursor-not-allowed"
            }`}
          >
            <FaPaperPlane />
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default Chat;
