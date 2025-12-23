import io from "socket.io-client";

// Always connect sockets directly to the backend server
// (the Vite /api proxy is only for HTTP).
const SOCKET_URL =
  "https://techtribe-backend-node-js-express-api.onrender.com";

export const createSocketConnection = () => {
  return io(SOCKET_URL, {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });
};