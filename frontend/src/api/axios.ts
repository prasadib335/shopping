import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: configuredBaseUrl,
    headers : {
          "Content-Type" : "application/json",
    },
});

export default api;