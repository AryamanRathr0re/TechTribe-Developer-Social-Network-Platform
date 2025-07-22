import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.LastName,
        userId: senderId?._id, // 👈 Include sender's ID
        text,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

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
        setMessages((messages) => [
          ...messages,
          {
            firstName,
            lastName: LastName,
            text,
            userId: senderId, // 👈 Save sender ID
          },
        ]);
      }
    );

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.LastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    // Add own message to the left too
    setMessages((prev) => [
      ...prev,
      {
        firstName: user.firstName,
        lastName: user.LastName,
        text: newMessage,
        userId, // 👈 Include self userId so we can align it
      },
    ]);

    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600 text-white">Chat</h1>

      <div className="flex-1 overflow-scroll p-5 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${
              msg.userId === userId ? "chat-end" : "chat-start"
            }`} // 👈 always align to left
          >
            <div className="chat-header text-white">
              {msg.firstName} {msg.lastName}
              <time className="text-xs opacity-50 ml-2">just now</time>
            </div>
            <div className="chat-bubble bg-blue-600 text-white">{msg.text}</div>
            <div className="chat-footer opacity-50 text-xs text-white">
              Seen
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2 bg-[#1e293b] focus:outline-none"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
