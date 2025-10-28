import { defineStore } from "pinia";
import { paymentService } from "@/services/paymentService";
import { ref, computed } from "vue";

export const usePaymentStore = defineStore("payment", () => {
  const payments = ref([]);
  const currentPayment = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Getters
  const totalRevenue = computed(() => {
    return payments.value
      .filter((p) => p.status === "paid")
      .reduce((sum, payment) => sum + parseFloat(payment.amount), 0);
  });

  const pendingPayments = computed(() => {
    return payments.value.filter((p) => p.status === "pending");
  });

  // Actions
  const fetchPayments = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await paymentService.getAll();
      payments.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Xatolik yuz berdi";
    } finally {
      loading.value = false;
    }
  };

  const fetchPayment = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await paymentService.getById(id);
      currentPayment.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Xatolik yuz berdi";
    } finally {
      loading.value = false;
    }
  };

  const fetchPaymentsByBron = async (bronId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await paymentService.getByBronId(bronId);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Xatolik yuz berdi";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const createPayment = async (paymentData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await paymentService.create(paymentData);
      payments.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Xatolik yuz berdi";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updatePayment = async (id, paymentData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await paymentService.update(id, paymentData);
      const index = payments.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        payments.value[index] = response.data;
      }
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Xatolik yuz berdi";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const processPayment = async (paymentData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await paymentService.processPayment(paymentData);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || "To'lov jarayonida xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deletePayment = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await paymentService.delete(id);
      payments.value = payments.value.filter((p) => p.id !== id);
    } catch (err) {
      error.value = err.response?.data?.message || "Xatolik yuz berdi";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    // State
    payments,
    currentPayment,
    loading,
    error,

    // Getters
    totalRevenue,
    pendingPayments,

    // Actions
    fetchPayments,
    fetchPayment,
    fetchPaymentsByBron,
    createPayment,
    updatePayment,
    processPayment,
    deletePayment,
    clearError,
  };
});
