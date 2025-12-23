import axios from "axios";
import BASE_URL from "./constants";
import { store } from "./appStore";
import { removeUser } from "./userSlice";

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage
    const token = localStorage.getItem("token");
    
    // If token exists, attach it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401 errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If 401 Unauthorized, clear token and redirect to login
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      store.dispatch(removeUser());
      
      // Only redirect if not already on login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;

