import api from "./api";

export const bookingService = {
  // Barcha bronlarni olish
  // services/bookings.js fayliga qo'shing
  async getBookingDetails(bookingId) {
    const response = await api.get(`/bron/${bookingId}`);
    return response.data;
  },
  async cancelBooking(bookingId) {
    const response = await api.patch(`/bron/${bookingId}/cancel`);
    return response.data;
  },
  async getUserBooking() {
    try {
      const response = await api.get("/bron/userAll");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getByClientId(clientId) {
    try {
      const response = await api.get(`/bron/client/${clientId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getAll(params = {}) {
    try {
      const response = await api.get("/bron/all", { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Bronni ID bo'yicha olish
  async getById(id) {
    try {
      const response = await api.get(`/bron/one/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Yangi bron qilish
  async create(bookingData) {
    try {
      const response = await api.post("/bron/create/", bookingData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async createClient(bookingData) {
    try {
      const response = await api.post("/bron/create_client/", bookingData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  // Bronni yangilash
  async update(id, bookingData) {
    try {
      const response = await api.patch(`/bron/update/${id}`, bookingData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Bronni o'chirish
  async delete(id) {
    try {
      const response = await api.delete(`/bron/delete/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Bron holatini yangilash
  async updateStatus(id, status) {
    try {
      const response = await api.patch(`/bron/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // To'lov holatini yangilash
  async updatePaymentStatus(id, paymentStatus) {
    try {
      const response = await api.patch(`/bron/${id}/payment-status`, {
        paymentStatus,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Mavjud xonalarni tekshirish
  async checkAvailability(checkIn, checkOut, roomType = null) {
    try {
      const params = { checkIn, checkOut };
      if (roomType) params.roomType = roomType;

      const response = await api.get("/bron/availability", { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Kunlik bronlar statistikasi
  async getDailyStats(date) {
    try {
      const response = await api.get("/bron/stats/daily", {
        params: { date },
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Oylik bronlar statistikasi
  async getMonthlyStats(year, month) {
    try {
      const response = await api.get("/bron/stats/monthly", {
        params: { year, month },
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

      // Bron bilan bog'liq maxsus xatoliklar
      if (status === 409) {
        return new Error("Ushbu sana uchun xona band qilingan");
      }

      return new Error(`${message} (Status: ${status})`);
    } else if (error.request) {
      return new Error("Tarmoq xatosi. Serverga ulanib boʻlmadi.");
    } else {
      return new Error(error.message || "Nomaʼlum xatolik yuz berdi");
    }
  },
};
