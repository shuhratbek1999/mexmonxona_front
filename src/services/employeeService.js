import api from "./api";

export const employeeService = {
  // Barcha mijozlarni olish
  async getAll(params = {}) {
    try {
      const response = await api.get("/employees/all", { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Mijozi ID bo'yicha olish
  async getById(id) {
    try {
      const response = await api.get(`/employees/one/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Yangi mijoz qo'shish
  async create(clientData) {
    try {
      const response = await api.post("/employees/create", clientData);
      // console.log(response.data, clientData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Mijozi yangilash
  async update(id, clientData) {
    try {
      const response = await api.patch(`/employees/update/${id}`, clientData);
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
