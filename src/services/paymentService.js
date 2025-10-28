import api from "./api";

export const paymentService = {
  async getAll() {
    try {
      const response = await api.get("/payments/all");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/payments/one/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getByBronId(bronId) {
    try {
      const response = await api.get(`/payments/bron/${bronId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async create(paymentData) {
    try {
      // console.log(paymentData);

      const response = await api.post("/payments/create", paymentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async update(id, paymentData) {
    try {
      const response = await api.patch(`/payments/update/${id}`, paymentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`/payments/delete/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async processPayment(paymentData) {
    try {
      const response = await api.post("/payments/process", paymentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
