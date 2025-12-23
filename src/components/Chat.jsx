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
  const socketRef = useRef(null);
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
    socketRef.current = socket;

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

    return () => {
      socket.off("messageReceived");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId, user?.firstName]);

  const sendMessage = (e) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;

    const socket = socketRef.current || createSocketConnection();
    socketRef.current = socket;

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

  return (
    <div className="flex flex-col h-[100dvh] bg-gradient-to-br from-gray-950 via-purple-950 to-pink-900">
      {/* Chat Header */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/30 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center gap-4 shadow-lg"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/connections")}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
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
              className="w-11 h-11 rounded-full border-2 border-pink-500 object-cover shadow-md"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-white font-semibold text-base truncate">
                {targetUser.firstName} {targetUser.LastName}
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <p className="text-white/60 text-xs">
                  {targetUser.isOnline ? "Online now ✨" : "Last seen recently"}
                </p>
              </div>
            </div>
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-white/15 transition-colors"
          type="button"
        >
          <FaEllipsisV className="text-sm" />
        </motion.button>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full"
            />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-white/70">
            <p className="text-lg font-semibold mb-2">
              Say hi and start the conversation 👋
            </p>
            <p className="text-sm max-w-xs">
              Your first message can be about their skills, projects, or tech
              interests.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((msg, index) => {
              const isOwnMessage = msg.userId === userId;
              const showAvatar =
                index === 0 || messages[index - 1].userId !== msg.userId;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 sm:gap-3 ${
                    isOwnMessage ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  {showAvatar && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden flex-shrink-0 shadow-md">
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
                  {!showAvatar && <div className="w-7 sm:w-8" />}

                  {/* Message Bubble */}
                  <div
                    className={`flex flex-col ${
                      isOwnMessage ? "items-end" : "items-start"
                    } max-w-[75%] sm:max-w-[70%]`}
                  >
                    {showAvatar && (
                      <span className="text-white/50 text-[11px] mb-0.5 px-1">
                        {msg.firstName} {msg.lastName}
                      </span>
                    )}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className={`rounded-2xl px-3.5 py-2.5 shadow-lg text-sm leading-relaxed whitespace-pre-wrap ${
                        isOwnMessage
                          ? "bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-tr-sm"
                          : "bg-white/10 backdrop-blur-md text-white rounded-tl-sm border border-white/10"
                      }`}
                    >
                      {msg.text}
                    </motion.div>
                    <div className="flex items-center gap-1 mt-0.5 px-1">
                      <span className="text-white/35 text-[10px]">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {isOwnMessage && (
                        <span className="text-white/35 text-[10px] flex items-center gap-0.5">
                          {msg.read ? (
                            <>
                              <span className="text-blue-300">✓✓</span> Read
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
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <motion.form
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onSubmit={sendMessage}
        className="bg-black/40 backdrop-blur-xl border-t border-white/10 px-3 sm:px-4 py-3 pb-4 sm:pb-5"
      >
        <div className="flex items-center gap-2 sm:gap-3 max-w-3xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <FaSmile className="text-lg" />
          </motion.button>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 sm:px-5 py-2.5 text-sm sm:text-base text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Type a message... 💬"
          />
          <motion.button
            whileHover={{ scale: newMessage.trim() ? 1.05 : 1 }}
            whileTap={{ scale: newMessage.trim() ? 0.95 : 1 }}
            type="submit"
            disabled={!newMessage.trim()}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
              newMessage.trim()
                ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg hover:shadow-xl"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
          >
            <FaPaperPlane className="text-sm sm:text-base" />
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default Chat;
