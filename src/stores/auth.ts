import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { loginRequest, myMSALObj } from "@/azure/msalConfig";
import type { User } from "@/types/User";
import { delay } from "@/utils/delay";
import { DEFAULT_USER } from "@/constants";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const isInitialized = ref(false);
  const authModalIsVisible = ref(false);
  const bearerToken = ref("");
  const user = ref<User | null>(null);

  const isAdmin = computed(() => {
    return user.value?.roles.includes("admin");
  });

  const login = async () => {
    try {
      if (!myMSALObj) {
        throw new Error("MSAL is not initialized");
      }

      const locale = localStorage.getItem("locale");

      await myMSALObj.loginRedirect({
        ...loginRequest,
        extraQueryParameters: { ui_locales: locale ?? "en" },
      });
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const logout = async () => {
    try {
      if (!myMSALObj) {
        throw new Error("MSAL is not initialized");
      }
      isAuthenticated.value = false;
      isInitialized.value = false;
      await myMSALObj.logoutRedirect();
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const initAuth = async () => {
    if (isInitialized.value) {
      return;
    }

    isInitialized.value = true;

    try {
      await myMSALObj.handleRedirectPromise();
      const accounts = myMSALObj.getAllAccounts();
      if (accounts.length > 0) {
        myMSALObj.setActiveAccount(accounts[0]);
        isAuthenticated.value = true;
        bearerToken.value = accounts[0].idToken!;
        getUser();
      } else {
        isAuthenticated.value = false;
      }
    } catch (error) {
      console.error("Auth init error", error);
      isAuthenticated.value = false;
    }
  };

  const getMsalToken = async () => {
    try {
      const response = await myMSALObj.acquireTokenSilent(loginRequest);
      return response;
    } catch (error) {
      console.error("Token error", error);
    }
  };

  const getUser = async () => {
    if (user.value) {
      return;
    }

    // Temporary
    if (!isAuthenticated.value) {
      return;
    }

    try {
      await delay(400);
      user.value = DEFAULT_USER;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    isAuthenticated,
    isInitialized,
    bearerToken,
    isAdmin,
    user,
    authModalIsVisible,
    login,
    logout,
    initAuth,
    getMsalToken,
    getUser,
  };
});
