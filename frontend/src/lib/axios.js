import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || (import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://chatify-app-v2cc.onrender.com/api"),
  withCredentials: true,
});