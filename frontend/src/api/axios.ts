import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const apiBaseUrl = import.meta.env.PROD && (
    !configuredBaseUrl || configuredBaseUrl.includes("localhost")
)
    ? "https://shopping-backend-6l0c.onrender.com"
    : configuredBaseUrl || "http://localhost:8080";

const api = axios.create({
    baseURL: apiBaseUrl,
    headers : {
          "Content-Type" : "application/json",
    },
});

export default api;