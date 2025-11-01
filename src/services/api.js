import axios from "axios";
import { useAuthStore } from "@/stores/auth";
const API_BASE_URL = "http://localhost:5000/api/v1/admin-app";
// const API_BASE_URL = "http://176.53.163.29:7006/api/v1/admin-app";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data?.error_code == 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const authStore = useAuthStore();
      authStore.logout();

      // Login sahifasiga yo'naltirish
      router.push("/login");
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        // Token tozalash
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        const authStore = useAuthStore();
        authStore.logout();

        // Login sahifasiga yo'naltirish
        router.push("/login");

        // Xabar ko'rsatish
        if (router.currentRoute.value.path !== "/login") {
          alert("Session expired. Please login again.");
        }
      }
    }
    return Promise.reject(error);
  }
);
export default api;
