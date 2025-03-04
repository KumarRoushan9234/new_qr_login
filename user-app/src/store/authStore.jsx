import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const { data } = await axios.post("/api/auth/login", {
            email,
            password,
          });
          const decoded = jwtDecode(data.token);
          set({ user: decoded, token: data.token, isAuthenticated: true });
        } catch (error) {
          console.error("Login failed", error);
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: "auth-store" }
  )
);

export default useAuthStore;
