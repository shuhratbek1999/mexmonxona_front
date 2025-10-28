import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { roomService } from "@/services/rooms";

export const useRoomStore = defineStore("rooms", () => {
  // State
  const rooms = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const currentRoom = ref(null);
  const stats = ref(null);
  const amenitiesAlls = ref([]);

  // Getters (computed properties)
  const availableRooms = computed(() => {
    return rooms.value.filter((room) => room.status === "empty");
  });

  const occupiedRooms = computed(() => {
    return rooms.value.filter((room) => room.status === "busy");
  });

  const maintenanceRooms = computed(() => {
    return rooms.value.filter((room) => room.status === "maintenance");
  });

  const cleaningRooms = computed(() => {
    return rooms.value.filter((room) => room.status === "cleaning_need");
  });

  const roomTypes = computed(() => {
    const types = new Set(rooms.value.map((room) => room.tur));
    return Array.from(types);
  });

  const getRoomById = computed(() => (id) => {
    return rooms.value.find((room) => room.id === id);
  });

  const getRoomsByType = computed(() => (type) => {
    return rooms.value.filter((room) => room.tur === type);
  });

  const getRoomsByStatus = computed(() => (status) => {
    return rooms.value.filter((room) => room.status === status);
  });

  // Actions
  const fetchRooms = async (params = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await roomService.getAll(params);
      rooms.value = response.data;
      return response;
    } catch (err) {
      error.value = err.message || "Xonalarni yuklashda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchRoom = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await roomService.getById(id);
      currentRoom.value = response.data;
      return response;
    } catch (err) {
      error.value = err.message || "Xonani yuklashda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createRoom = async (roomData) => {
    loading.value = true;
    error.value = null;

    try {
      const formData = new FormData();

      // Asosiy ma'lumotlar
      formData.append("numbers", roomData.numbers);
      formData.append("tur", roomData.tur);
      formData.append("price", roomData.price);
      formData.append("capacity", roomData.capacity);
      formData.append("description", roomData.description || "");
      formData.append("status", roomData.status);

      // Rasmlar
      if (roomData.images && roomData.images.length) {
        const imagesData = roomData.images.map((img) => ({
          image_order: img.image_order,
          is_primary: img.is_primary,
        }));
        formData.append("images", JSON.stringify(imagesData));

        // Fayllarni qo'shish
        roomData.images.forEach((img) => {
          if (img.file) {
            formData.append("img", img.file);
          }
        });
      }

      // Qulayliklar
      if (roomData.amenities && roomData.amenities.length) {
        formData.append("amenities", JSON.stringify(roomData.amenities));
      }

      const response = await roomService.create(formData);
      rooms.value.push(response);
      return response;
    } catch (err) {
      error.value = err.message || "Xona yaratishda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateRoom = async (id, roomData) => {
    loading.value = true;
    error.value = null;

    try {
      const formData = new FormData();

      // Asosiy ma'lumotlar
      formData.append("numbers", roomData.numbers);
      formData.append("tur", roomData.tur);
      formData.append("price", roomData.price);
      formData.append("capacity", roomData.capacity);
      formData.append("description", roomData.description || "");
      formData.append("status", roomData.status);

      // Rasmlar
      if (roomData.images && roomData.images.length) {
        const imagesData = roomData.images.map((img) => ({
          id: img.id, // Mavjud rasmlar uchun
          image_order: img.image_order,
          is_primary: img.is_primary,
          tempId: img.tempId, // Yangi rasmlar uchun
        }));
        formData.append("images", JSON.stringify(imagesData));

        // Yangi fayllarni qo'shish
        roomData.images.forEach((img) => {
          if (img.file && !img.id) {
            formData.append("img", img.file);
          }
        });
      }

      // Qulayliklar
      if (roomData.amenities && roomData.amenities.length) {
        formData.append("amenities", JSON.stringify(roomData.amenities));
      }

      const response = await roomService.update(id, formData);

      // Local stateni yangilash
      const index = rooms.value.findIndex((room) => room.id === id);
      if (index !== -1) {
        rooms.value[index] = response.data;
      }

      if (currentRoom.value && currentRoom.value.id === id) {
        currentRoom.value = response.data;
      }

      return response;
    } catch (err) {
      error.value = err.message || "Xonani yangilashda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteRoom = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await roomService.delete(id);
      rooms.value = rooms.value.filter((room) => room.id !== id);

      if (currentRoom.value && currentRoom.value.id === id) {
        currentRoom.value = null;
      }

      return response;
    } catch (err) {
      error.value = err.message || "Xonani o'chirishda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateRoomStatus = async (id, status) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await roomService.updateStatus(id, status);

      // Local stateni yangilash
      const index = rooms.value.findIndex((room) => room.id === id);
      if (index !== -1) {
        rooms.value[index].status = status;
      }

      if (currentRoom.value && currentRoom.value.id === id) {
        currentRoom.value.status = status;
      }

      return response;
    } catch (err) {
      error.value = err.message || "Holatni yangilashda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateRoomPrice = async (id, price) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await roomService.updatePrice(id, price);

      // Local stateni yangilash
      const index = rooms.value.findIndex((room) => room.id === id);
      if (index !== -1) {
        rooms.value[index].price = price;
      }

      if (currentRoom.value && currentRoom.value.id === id) {
        currentRoom.value.price = price;
      }

      return response;
    } catch (err) {
      error.value = err.message || "Narxni yangilashda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchRoomStats = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await roomService.getStats();
      stats.value = response.data;
      return response;
    } catch (err) {
      error.value = err.message || "Statistika yuklashda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const allAmenities = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await roomService.allAmenities();
      amenitiesAlls.value = response.data;
      return response;
    } catch (err) {
      error.value = err.message || "Qulayliklarni yuklashda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchStatsByType = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await roomService.getStatsByType();
      return response;
    } catch (err) {
      error.value = err.message || "Tur bo'yicha statistika yuklashda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const filterRooms = async (filters) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await roomService.filterRooms(filters);
      return response;
    } catch (err) {
      error.value = err.message || "Xonalarni filterlashda xatolik";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  const clearCurrentRoom = () => {
    currentRoom.value = null;
  };

  return {
    // State
    rooms,
    loading,
    error,
    currentRoom,
    stats,
    amenitiesAlls,

    // Getters
    availableRooms,
    occupiedRooms,
    maintenanceRooms,
    cleaningRooms,
    roomTypes,
    getRoomById,
    getRoomsByType,
    getRoomsByStatus,

    // Actions
    fetchRooms,
    fetchRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    updateRoomStatus,
    updateRoomPrice,
    fetchRoomStats,
    fetchStatsByType,
    filterRooms,
    allAmenities,
    clearError,
    clearCurrentRoom,
  };
});
