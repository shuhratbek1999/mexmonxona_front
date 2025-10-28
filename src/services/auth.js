import api from "./api";

export const authService = {
  // Login qilish
  async login(credentials) {
    try {
      // console.log(credentials);
      const response = await api.post("/employees/login", credentials);
      // console.log(response.data);
      return response.data?.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async clientLogin(credentials) {
    try {
      const response = await api.post("clients/login", credentials);
      return response.data?.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  // Profil ma'lumotlarini olish
  async getProfile() {
    try {
      const response = await api.get("/auth/profile");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Parolni yangilash
  async changePassword(passwordData) {
    try {
      const response = await api.put("/auth/change-password", passwordData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Token yangilash
  async refreshToken() {
    try {
      const response = await api.post("/auth/refresh");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Chiqish
  async logout() {
    try {
      const response = await api.post("/auth/logout");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Xatoliklarni boshqarish
  handleError(error) {
    if (error.response) {
      // Server xatosi
      const message = error.response.data?.message || "Server xatosi";
      const status = error.response.status;

      return new Error(`${message} (Status: ${status})`);
    } else if (error.request) {
      // Tarmoq xatosi
      return new Error("Tarmoq xatosi. Serverga ulanib boʻlmadi.");
    } else {
      // Dastur xatosi
      return new Error(error.message || "Nomaʼlum xatolik yuz berdi");
    }
  },
};
