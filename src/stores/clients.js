import { defineStore } from "pinia";
import { ref } from "vue";
import { clientService } from "@/services/clients";

export const useClientStore = defineStore("clients", () => {
  const clients = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const currentClient = ref(null);

  // Getters
  const activeClients = () => {
    return clients.value.filter((client) => client.status === "active");
  };

  const loyalClients = (minBookings = 5) => {
    return clients.value.filter(
      (client) => client.bookingsCount >= minBookings
    );
  };

  const getClientById = (id) => {
    return clients.value.find((client) => client.id === id);
  };

  // Actions
  const fetchClients = async (params = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await clientService.getAll(params);
      clients.value = response.data;
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchClient = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await clientService.getById(id);
      currentClient.value = response.data;
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createClient = async (clientData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await clientService.create(clientData);
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateClient = async (id, clientData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await clientService.update(id, clientData);
      const index = clients.value.findIndex((client) => client.id === id);

      if (index !== -1) {
        clients.value[index] = response.data;
      }

      if (currentClient.value && currentClient.value.id === id) {
        currentClient.value = response.data;
      }

      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteClient = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await clientService.delete(id);
      clients.value = clients.value.filter((client) => client.id !== id);

      if (currentClient.value && currentClient.value.id === id) {
        currentClient.value = null;
      }

      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const searchClients = async (query) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await clientService.search(query);
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getClientBookings = async (clientId) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await clientService.getBookings(clientId);
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getClientStats = async (clientId) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await clientService.getStats(clientId);
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const incrementBookingsCount = (clientId) => {
    const client = clients.value.find((c) => c.id === clientId);
    if (client) {
      client.bookingsCount += 1;
      client.lastBooking = new Date().toISOString();
    }
  };

  const clearError = () => {
    error.value = null;
  };

  const clearCurrentClient = () => {
    currentClient.value = null;
  };

  return {
    // State
    clients,
    loading,
    error,
    currentClient,

    // Getters
    activeClients,
    loyalClients,
    getClientById,

    // Actions
    fetchClients,
    fetchClient,
    createClient,
    updateClient,
    deleteClient,
    searchClients,
    getClientBookings,
    getClientStats,
    incrementBookingsCount,
    clearError,
    clearCurrentClient,
  };
});
