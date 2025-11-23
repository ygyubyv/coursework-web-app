import axios from "axios";
import { API_URL } from "../config";
import { useAuthStore } from "@/stores/auth";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const auth = useAuthStore();
  const token = await auth.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
