import { ref } from "vue";
import { defineStore } from "pinia";
import { loginRequest, myMSALObj } from "@/azure/msalConfig";
import type { IdTokenClaimsExtended, Role } from "@/types";
import { useUserStore } from "./user";
import { useI18n } from "vue-i18n";
import { showNotification } from "@/utils";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

export const useAuthStore = defineStore("auth", () => {
  const { t } = useI18n();
  const { setUser } = useUserStore();

  const isAuthenticated = ref(false);
  const isInitialized = ref(false);
  const authModalIsVisible = ref(false);
  const accessToken = ref<string | null>(null);
  const accessTokenExpiresAt = ref<number | null>(null);
  const idTokenClaims = ref<IdTokenClaimsExtended | null>(null);

  const isTokenExpired = () => {
    if (!accessTokenExpiresAt.value) {
      return true;
    }

    const now = Math.floor(Date.now() / 1000);

    return now >= accessTokenExpiresAt.value - 30;
  };

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
        const { idTokenClaims: claims } = accounts[0];
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

  const getAccessToken = async () => {
    const accounts = myMSALObj.getAllAccounts();
    if (!accounts.length) return null;

    if (accessToken.value && !isTokenExpired()) {
      return accessToken.value;
    }

    try {
      const result = await myMSALObj.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });

      accessToken.value = result.accessToken;
      accessTokenExpiresAt.value = result.expiresOn
        ? Math.floor(result.expiresOn.getTime() / 1000)
        : null;

      return accessToken.value;
    } catch (error: any) {
      if (error instanceof InteractionRequiredAuthError) {
        await myMSALObj.acquireTokenRedirect({
          ...loginRequest,
          account: accounts[0],
        });
      }

      console.error("Failed to acquire access token", error);
      return null;
    }
  };

  return {
    isAuthenticated,
    isInitialized,
    authModalIsVisible,
    accessToken,
    accessTokenExpiresAt,
    idTokenClaims,
    login,
    logout,
    initAuth,
    hasRole,
    getAccessToken,
  };
});
