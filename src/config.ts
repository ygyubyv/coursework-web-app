export const azureConfig = {
  clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
  tenantName: import.meta.env.VITE_AZURE_TENANT_NAME,
  userFlow: import.meta.env.VITE_AZURE_USER_FLOW,
  redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI,
};

export const localeConfig = {
  defaultLocale: import.meta.env.VITE_DEFAULT_LOCALE!,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE!,
};

export const APP_URL = import.meta.env.VITE_APP_URL;
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
export const API_URL = import.meta.env.VITE_API_URL;
