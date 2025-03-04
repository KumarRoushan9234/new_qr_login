import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUser, registerUser, googleLogin } from "../api/api";
import { jwtDecode } from "jwt-decode";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const { data } = await loginUser(email, password);
          localStorage.setItem("auth-token", data.token);
          set({ user: data.user, token: data.token, isAuthenticated: true });
        } catch (error) {
          console.error("Login failed", error);
        }
      },

      signup: async (name, email, phone, password) => {
        try {
          const success = await registerUser(name, email, phone, password);
          return success;
        } catch (error) {
          console.error("Signup failed", error);
          return false;
        }
      },

      loginWithGoogle: async () => {
        try {
          const { data } = await googleLogin();
          const decoded = jwtDecode(data.token);
          localStorage.setItem("auth-token", data.token);
          set({ user: decoded, token: data.token, isAuthenticated: true });
        } catch (error) {
          console.error("Google login failed", error);
        }
      },

      logout: () => {
        localStorage.removeItem("auth-token");
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    { name: "auth-store" }
  )
);

export default useAuthStore;
