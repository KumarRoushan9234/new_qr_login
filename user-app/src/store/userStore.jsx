import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "../api/api";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      partners: [],

      fetchUserProfile: async () => {
        try {
          const { data } = await API.get("/users/profile");
          set({ user: data.user });
          return { success: true, user: data.user };
        } catch (error) {
          console.error("Error fetching user profile:", error);
          return { success: false, message: "Failed to fetch user profile." };
        }
      },

      fetchAllPartners: async () => {
        try {
          // if (get().partners.length > 0) return; // Avoids redundant API calls

          const { data } = await API.get("/users/partners");
          set({ partners: data.partners });
          return { success: true, partners: data.partners };
        } catch (error) {
          console.error("Error fetching partners:", error);
          return { success: false, message: "Failed to fetch partners." };
        }
      },
    }),
    { name: "user-store" }
  )
);

export default useUserStore;
