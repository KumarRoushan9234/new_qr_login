import { create } from "zustand";
import axios from "axios";
import jwtDecode from "jwt-decode";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  // Check if the user is logged in (verify JWT)
  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const response = await axios.get("http://localhost:5000/api/auth/check-auth", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.valid) {
        set({ user: decoded, isAuthenticated: true });
      } else {
        localStorage.removeItem("token");
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      set({ user: null, isAuthenticated: false });
    }
  },

  // Login function
  login: (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    set({ user: decoded, isAuthenticated: true });
  },

  // Logout function
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
