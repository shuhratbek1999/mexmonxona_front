import { defineStore } from "pinia";
import { ref } from "vue";
import { authService } from "@/services/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("token"));
  const isAuthenticated = ref(!!token.value);
  const loading = ref(false);
  const error = ref(null);

  // Login qilish
  const login = async (credentials) => {
    loading.value = true;
    error.value = null;

    try {
      if (credentials.user_type == "employee") {
        const response = await authService.login(credentials);
        // Backend response formatiga qarab sozlaymiz
        user.value = response.user || response.data || response.name;
        token.value = response.token || response.access_token;
        isAuthenticated.value = true;

        localStorage.setItem("token", token.value);

        // Agar backend user ma'lumotlarini qaytarsa, uni saqlaymiz
        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
        } else if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response;
      } else {
        const response = await authService.clientLogin(credentials);

        // Backend response formatiga qarab sozlaymiz
        user.value = response.user || response.data || response.name;
        token.value = response.token || response.access_token;
        isAuthenticated.value = true;
        // console.log(response, "login");

        localStorage.setItem("token", token.value);
        localStorage.setItem("userId", Number(response.id));
        // Agar backend user ma'lumotlarini qaytarsa, uni saqlaymiz
        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
        } else if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response;
      }
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Profil ma'lumotlarini olish
  const getProfile = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.getProfile();
      user.value = response;

      // User ma'lumotlarini localStorage ga saqlaymiz
      localStorage.setItem("user", JSON.stringify(response));

      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Chiqish
  const logout = async () => {
    loading.value = true;

    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      user.value = null;
      token.value = null;
      isAuthenticated.value = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      loading.value = false;
    }
  };

  // Token yangilash
  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken();
      token.value = response.token;
      localStorage.setItem("token", token.value);
      return response;
    } catch (err) {
      logout();
      throw err;
    }
  };

  // Parolni yangilash
  const changePassword = async (passwordData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.changePassword(passwordData);
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Foydalanuvchi ma'lumotlarini yuklash
  const loadUser = () => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        user.value = JSON.parse(savedUser);
        token.value = savedToken;
        isAuthenticated.value = true;
      } catch (e) {
        console.error("User ma'lumotlarini parse qilishda xatolik:", e);
        logout();
      }
    }
  };

  // Admin tekshiruvi
  const isAdmin = () => {
    return user.value?.role === "Admin" || user.value?.user_type === "admin";
  };

  // Xodim tekshiruvi
  const isEmployee = () => {
    // console.log(user.value === "Admin");
    return (
      user.value?.user_type === "employee" ||
      user.value === "Admin" ||
      user.value?.role === "manager" ||
      user.value?.role === "reception"
    );
  };

  // Mijoz tekshiruvi
  const isClient = () => {
    return user.value?.user_type === "client" || user.value?.role === "client";
  };

  // Rol bo'yicha tekshirish
  const hasRole = (role) => {
    return user.value?.role === role || user.value?.user_type === role;
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    getProfile,
    refreshToken,
    changePassword,
    loadUser,
    isAdmin,
    isEmployee,
    isClient,
    hasRole,
  };
});
