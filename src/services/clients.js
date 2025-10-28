import api from "./api";

export const clientService = {
  // Barcha mijozlarni olish
  async getAll(params = {}) {
    try {
      const response = await api.get("/clients/all", { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Mijozi ID bo'yicha olish
  async getById(id) {
    try {
      const response = await api.get(`/clients/one/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Yangi mijoz qo'shish
  async create(clientData) {
    try {
      const response = await api.post("/clients/create", clientData);
      console.log(response.data, clientData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Mijozi yangilash
  async update(id, clientData) {
    try {
      const response = await api.patch(`/clients/update/${id}`, clientData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Mijozi o'chirish
  async delete(id) {
    try {
      const response = await api.delete(`/clients/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Mijoz bronlarini olish
  async getBookings(clientId) {
    try {
      const response = await api.get(`/clients/${clientId}/bookings`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Mijoz statistikasini olish
  async getStats(clientId) {
    try {
      const response = await api.get(`/clients/${clientId}/stats`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Mijozlarni qidirish
  async search(query) {
    try {
      const response = await api.get("/clients/search", {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Xatoliklarni boshqarish
  handleError(error) {
    if (error.response) {
      const message = error.response.data?.message || "Server xatosi";
      const status = error.response.status;

      return new Error(`${message} (Status: ${status})`);
    } else if (error.request) {
      return new Error("Tarmoq xatosi. Serverga ulanib boʻlmadi.");
    } else {
      return new Error(error.message || "Nomaʼlum xatolik yuz berdi");
    }
  },
};
