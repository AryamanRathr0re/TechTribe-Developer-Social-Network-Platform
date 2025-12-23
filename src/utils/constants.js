const PROD_URL = "https://techtribe-backend-node-js-express-api.onrender.com";

// Use proxy in dev to keep cookies same-site; fall back to prod URL elsewhere.
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "/api"
    : PROD_URL);

export default BASE_URL;
