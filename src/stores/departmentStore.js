import { defineStore } from "pinia";
import { departmentService } from "@/services/departmentService";
import { ref, computed } from "vue";

export const useDepartmentStore = defineStore("department", () => {
  const departments = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const totalDepartments = computed(() => departments.value.length);

  async function fetchDepartments() {
    loading.value = true;
    error.value = null;
    try {
      const response = await departmentService.getAll();
      departments.value = response.data;
    } catch (err) {
      error.value = err.message || "Departmentlarni yuklab bo'lmadi";
    } finally {
      loading.value = false;
    }
  }

  async function addDepartment(departmentData) {
    loading.value = true;
    try {
      const response = await departmentService.create(departmentData);
      departments.value.push(response);
      return response;
    } catch (err) {
      error.value = err.message || "Department qo'shishda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateDepartment(id, departmentData) {
    loading.value = true;
    try {
      const response = await departmentService.update(id, departmentData);
      const index = departments.value.findIndex((dept) => dept.id === id);
      if (index !== -1) {
        departments.value[index] = response.data;
      }
      return response;
    } catch (err) {
      error.value = err.message || "Departmentni yangilashda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteDepartment(id) {
    loading.value = true;
    try {
      await departmentService.delete(id);
      departments.value = departments.value.filter((dept) => dept.id !== id);
    } catch (err) {
      error.value = err.message || "Departmentni o'chirishda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    departments,
    loading,
    error,
    totalDepartments,
    fetchDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  };
});
