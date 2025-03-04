import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginPartner } from "../api/api";

const usePartnerStore = create(
  persist(
    (set) => ({
      partner: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const { data } = await loginPartner(email, password);
          localStorage.setItem("partner-token", data.token);
          set({
            partner: data.partner,
            token: data.token,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error("Partner login failed", error);
        }
      },

      logout: () => {
        localStorage.removeItem("partner-token");
        set({ partner: null, token: null, isAuthenticated: false });
      },
    }),
    { name: "partner-store" }
  )
);

export default usePartnerStore;
