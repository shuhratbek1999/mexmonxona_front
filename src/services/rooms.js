import api from "./api";

export const roomService = {
  // Barcha xonalarni olish
  async getAll() {
    try {
      const response = await api.get("/rooms/all");
      // console.log(response);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Xonani ID bo'yicha olish
  async getById(id) {
    try {
      const response = await api.get(`/rooms/one/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Yangi xona qo'shish
  async create(roomData) {
    try {
      // console.log("roooom", roomData);
      // console.log([...roomData.entries()], "rommss");
      const response = await api.post("/rooms/create", roomData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(response.data);

      return response.data?.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Xonani yangilash
  async update(id, roomData) {
    try {
      // console.log(id, roomData, "data");

      const response = await api.patch(`/rooms/update/${id}`, roomData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Xonani o'chirish
  async delete(id) {
    try {
      const response = await api.delete(`/rooms/delete/${id}`);
      // console.log(response.data);

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Xona holatini yangilash
  async updateStatus(id, status) {
    try {
      const response = await api.patch(`/rooms/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Xona narxini yangilash
  async updatePrice(id, price) {
    try {
      const response = await api.patch(`/rooms/${id}/price`, { price });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Xonalar statistikasi
  async getStats() {
    try {
      const response = await api.get("/rooms/stats");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },
  async allAmenities() {
    try {
      const amenities = await api.get("/rooms/amenitiesAll");
      return amenities.data;
    } catch (err) {
      throw this.handleError(err);
    }
  },
  // Xona turlari bo'yicha statistika
  async getStatsByType() {
    try {
      const response = await api.get("/rooms/stats/by-type");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Xonalarni filtrlash
  async filterRooms(filters) {
    try {
      const response = await api.get("/rooms/filter", { params: filters });
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
