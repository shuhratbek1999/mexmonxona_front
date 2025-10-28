import api from "./api";

export const departmentService = {
  async getAll() {
    try {
      const response = await api.get("/department/all");
      // console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Departmentlarni olishda xatolik"
      );
    }
  },

  async create(departmentData) {
    try {
      const response = await api.post("/department/create", departmentData);
      // console.log(response, departmentData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Department yaratishda xatolik"
      );
    }
  },

  async update(id, departmentData) {
    try {
      const response = await api.patch(
        `/department/update/${id}`,
        departmentData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Departmentni yangilashda xatolik"
      );
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`/department/delete/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Departmentni o'chirishda xatolik"
      );
    }
  },
};
