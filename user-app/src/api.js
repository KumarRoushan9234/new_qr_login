import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const loginUser = (email, password) => API.post("/auth/login", { email, password });
export const registerUser = (name, email, phone, password) =>
  API.post("/auth/register", { name, email, phone, password });
export const googleLogin = () => API.get("/auth/google");

export default API;
