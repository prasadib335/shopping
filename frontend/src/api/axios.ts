import axios from "axios";

const BaseUrl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: BaseUrl,
    headers : {
          "Content-Type" : "application/json",
    },
});

export default api;