import { defineStore } from "pinia";
import { ref } from "vue";
import { bookingService } from "@/services/bookings";

export const useBookingStore = defineStore("bookings", () => {
  const bookings = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const currentBooking = ref(null);
  const stats = ref(null);

  const getUserBookings = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingService.getUserBooking();
      bookings.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  // Getters
  const cancelBooking = async (bookingId) => {
    try {
      const response = await bookingService.cancelBooking(bookingId);
      // Ro'yxatni yangilash
      await this.getUserBookings();
      // Joriy bronni yangilash
      if (this.currentBooking && this.currentBooking.id === bookingId) {
        await this.getBookingDetails(bookingId);
      }
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Bekor qilishda xatolik"
      );
    }
  };
  const getBookingDetails = async (bookingId) => {
    try {
      const response = await bookingService.getBookingDetails(bookingId);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Bron ma'lumotlarini yuklashda xatolik"
      );
    }
  };
  const activeBookings = () => {
    return bookings.value.filter(
      (booking) => booking.status == "approved" || booking.status == "pending"
    );
  };
  // BookingStore ga qo'shimcha metod
  const fetchBookingsByClient = async ({ mijoz_id }) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingService.getByClientId(mijoz_id);
      // console.log(response.data, mijoz_id);
      // Mavjud bookings ga qo'shish yoki almashtirish
      const newBookings = response.data;
      // console.log(response.data);

      newBookings.forEach((newBooking) => {
        const index = bookings.value.findIndex((b) => b.id === newBooking.id);
        // console.log(index, "index");
        if (index !== -1) {
          bookings.value[index] = newBooking;
        } else {
          bookings.value.push(newBooking);
        }
      });
      // console.log(bookings.value);

      return response.data;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const confirmedBookings = () => {
    return bookings.value.filter((booking) => booking.status === "confirmed");
  };

  const pendingBookings = () => {
    return bookings.value.filter((booking) => booking.status === "pending");
  };

  const cancelledBookings = () => {
    return bookings.value.filter((booking) => booking.status === "cancelled");
  };

  const completedBookings = () => {
    return bookings.value.filter((booking) => booking.status === "completed");
  };

  const getBookingById = (id) => {
    return bookings.value.find((booking) => booking.id === id);
  };

  const getBookingsByClient = (clientId) => {
    return bookings.value.filter((booking) => booking.mijoz_id === clientId);
  };

  const getBookingsByRoom = (roomId) => {
    return bookings.value.filter((booking) => booking.roomId === roomId);
  };

  const todayRevenue = () => {
    const today = new Date().toISOString().split("T")[0];
    return bookings.value
      .filter(
        (booking) => booking.checkIn === today && booking.status === "confirmed"
      )
      .reduce((total, booking) => total + booking.totalPrice, 0);
  };

  // Actions
  const fetchBookings = async (params = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingService.getAll(params);
      // console.log(response.data);
      bookings.value = response.data;
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchBooking = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingService.getById(id);
      currentBooking.value = response.data;
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createBooking = async (bookingData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingService.create(bookingData);
      bookings.value.push(response.data);
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const createBookingClient = async (bookingData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingService.createClient(bookingData);
      bookings.value.push(response.data);
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const updateBooking = async (id, bookingData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingService.update(id, bookingData);
      const index = bookings.value.findIndex((booking) => booking.id === id);

      if (index !== -1) {
        bookings.value[index] = response.data;
      }

      if (currentBooking.value && currentBooking.value.id === id) {
        // console.log(response.data);

        currentBooking.value = response.data;
      }

      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteBooking = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingService.delete(id);
      bookings.value = bookings.value.filter((booking) => booking.id !== id);

      if (currentBooking.value && currentBooking.value.id === id) {
        currentBooking.value = null;
      }

      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateBookingStatus = async (id, status) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingService.updateStatus(id, status);
      const index = bookings.value.findIndex((booking) => booking.id === id);

      if (index !== -1) {
        bookings.value[index].status = status;
      }

      if (currentBooking.value && currentBooking.value.id === id) {
        currentBooking.value.status = status;
      }

      return response.data;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updatePaymentStatus = async (id, paymentStatus) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingService.updatePaymentStatus(
        id,
        paymentStatus
      );
      const index = bookings.value.findIndex((booking) => booking.id === id);

      if (index !== -1) {
        bookings.value[index].paymentStatus = paymentStatus;
      }

      if (currentBooking.value && currentBooking.value.id === id) {
        currentBooking.value.paymentStatus = paymentStatus;
      }

      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const checkAvailability = async (checkIn, checkOut, roomType = null) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingService.checkAvailability(
        checkIn,
        checkOut,
        roomType
      );
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchDailyStats = async (date) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingService.getDailyStats(date);
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchMonthlyStats = async (year, month) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingService.getMonthlyStats(year, month);
      return response;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  const clearCurrentBooking = () => {
    currentBooking.value = null;
  };

  return {
    // State
    bookings,
    loading,
    error,
    currentBooking,
    stats,
    fetchBookingsByClient,
    // Getters
    activeBookings,
    confirmedBookings,
    pendingBookings,
    cancelledBookings,
    completedBookings,
    getBookingById,
    getBookingsByClient,
    getBookingsByRoom,
    todayRevenue,

    // Actions
    fetchBookings,
    fetchBooking,
    createBooking,
    updateBooking,
    deleteBooking,
    updateBookingStatus,
    updatePaymentStatus,
    checkAvailability,
    fetchDailyStats,
    fetchMonthlyStats,
    clearError,
    clearCurrentBooking,
    createBookingClient,
    getUserBookings,
    cancelBooking,
    getBookingDetails,
  };
});
