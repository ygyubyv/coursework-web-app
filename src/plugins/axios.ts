import axios from "axios";
import { API_URL } from "../config";
import { useAuthStore } from "@/stores/auth";
import camelcaseKeys from "camelcase-keys";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const auth = useAuthStore();
  const token = await auth.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.params && typeof config.params === "object") {
    Object.keys(config.params).forEach((key) => {
      const value = config.params[key];

      if (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      ) {
        delete config.params[key];
      }
    });
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === "object") {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
