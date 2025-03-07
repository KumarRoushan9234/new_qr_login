import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "../api/api";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      partners: [],

      fetchUserProfile: async () => {
        try {
          const { data } = await API.get("/users/profile");
          set({ user: data.user });
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      },

      fetchAllPartners: async () => {
        try {
          const { data } = await API.get("/users/partners");
          set({ partners: data.partners });
        } catch (error) {
          console.error("Error fetching partners:", error);
        }
      },
    }),
    { name: "user-store" }
  )
);

export default useUserStore;
