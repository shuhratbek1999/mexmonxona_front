// stores/employeeStore.js
import { defineStore } from "pinia";
import { employeeService } from "@/services/employeeService";
import { departmentService } from "@/services/departmentService";
import { ref, computed } from "vue";

export const useEmployeeStore = defineStore("employee", () => {
  const employees = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const departmentsAll = ref([]);
  const totalEmployees = computed(() => employees.value.length);

  const departments = async () => {
    const deps = await departmentService.getAll();
    departmentsAll.value = deps.data;
  };

  async function fetchEmployees() {
    loading.value = true;
    error.value = null;
    try {
      const response = await employeeService.getAll();
      employees.value = response.data;
    } catch (err) {
      error.value = err.message || "Xodimlarni yuklab bo‘lmadi";
    } finally {
      loading.value = false;
    }
  }

  async function addEmployee(employeeData) {
    loading.value = true;
    try {
      const response = await employeeService.create(employeeData);
      // clients.value.push(response.data);
      employees.value.push(response);
      return response;
    } catch (err) {
      error.value = err.message || "Xodim qo‘shib bo‘lmadi";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateEmployee(id, employeeData) {
    loading.value = true;
    try {
      const response = await clientService.update(id, employeeData);
      const index = employees.value.findIndex(
        (emp) => emp.id === response.data?.id
      );
      if (index !== -1) {
        employees.value[index] = response?.data;
      }
      return response;
    } catch (err) {
      error.value = err.message || "Xodimni yangilab bo‘lmadi";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteEmployee(id) {
    loading.value = true;
    try {
      await employeeService.delete(id);
      employees.value = employees.value.filter((emp) => emp.id !== id);
    } catch (err) {
      error.value = err.message || "Xodimni o‘chirib bo‘lmadi";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    employees,
    loading,
    error,
    totalEmployees,
    departments,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    departmentsAll,
  };
});
