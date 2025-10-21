import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { loginRequest, myMSALObj } from "@/azure/msalConfig";
import type { IdTokenClaimsExtended, Role } from "@/types";
import { useUserStore } from "./user";
import { useI18n } from "vue-i18n";
import { showNotification } from "@/utils";

export const useAuthStore = defineStore("auth", () => {
  const { t } = useI18n();
  const { setUser } = useUserStore();

  const isAuthenticated = ref(false);
  const isInitialized = ref(false);
  const authModalIsVisible = ref(false);
  const bearerToken = ref("");
  const idTokenClaims = ref<IdTokenClaimsExtended | null>(null);

  const hasRole = (role: Role) => {
    const userRoles = idTokenClaims.value!.extension_Role;

    return userRoles!.includes(role);
  };

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
      showNotification("error", t("toasts.error.auth.auth_failed"));
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
      showNotification("error", t("toasts.error.auth.logout_failed"));
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
        const { idToken, idTokenClaims: claims } = accounts[0];
        bearerToken.value = idToken!;
        idTokenClaims.value = claims as IdTokenClaimsExtended;
        await setUser(claims!.sub!);
      } else {
        isAuthenticated.value = false;
      }
    } catch (error) {
      console.error("Auth init error", error);
      isAuthenticated.value = false;
    }
  };

  return {
    isAuthenticated,
    isInitialized,
    bearerToken,
    authModalIsVisible,
    login,
    logout,
    initAuth,
    hasRole,
  };
});
