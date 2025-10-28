<template>
  <div class="recent-bookings">
    <div v-if="loading" class="text-center py-4">
      <i class="fas fa-spinner fa-spin text-blue-500"></i>
      <p class="text-gray-500 mt-2">Yuklanmoqda...</p>
    </div>

    <div v-else-if="bookings.length === 0" class="text-center py-8">
      <i class="fas fa-calendar-times text-gray-300 text-3xl"></i>
      <p class="text-gray-500 mt-2">Бронирование недоступно.</p>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
      >
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-semibold text-gray-800">
              {{ booking.clientName }}
            </h4>
            <p class="text-sm text-gray-600">
              Комната: {{ booking.roomNumber }}
            </p>
            <p class="text-sm text-gray-600">Тел: {{ booking.phone }}</p>
          </div>
          <div class="text-right">
            <span
              class="px-2 py-1 text-xs rounded-full"
              :class="{
                'bg-green-100 text-green-800': booking.status === 'approved',
                'bg-gray-100 text-gray-800': booking.status === 'completed',
                'bg-red-100 text-red-800': booking.status === 'cancelled',
              }"
            >
              {{ getStatusText(booking.status) }}
            </span>
            <p class="text-sm font-medium text-gray-900 mt-1">
              {{ booking.totalAmount }} $
            </p>
          </div>
        </div>
        <div class="flex justify-between items-center mt-2">
          <span class="text-xs text-gray-500">
            {{ formatDate(booking.checkIn) }} -
            {{ formatDate(booking.checkOut) }}
          </span>
          <span class="text-xs text-gray-500">
            {{ booking.nights }} kecha
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBookingStore } from "@/stores/bookings";

const bookingStore = useBookingStore();
const bookings = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    await bookingStore.fetchBookings();
    // So'nggi 5 ta bronni olish
    bookings.value = bookingStore.bookings.slice(0, 5).map((booking) => ({
      id: booking.id,
      clientName: booking.client?.name || "Noma'lum mijoz",
      roomNumber: booking.xona?.numbers || "-",
      phone: booking.client?.phone || "-",
      status: booking.status || "active",
      totalAmount: booking.total_price?.toLocaleString() || "0",
      checkIn: booking.arrival_date,
      checkOut: booking.departure_date,
      nights: calculateNights(booking.arrival_date, booking.departure_date),
    }));
  } catch (error) {
    console.error("Bronlarni yuklashda xato:", error);
  } finally {
    loading.value = false;
  }
});

const calculateNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("uz-UZ");
};

const getStatusText = (status) => {
  const statusMap = {
    active: "Активный",
    completed: "Завершенный",
    cancelled: "Отменено",
  };
  return statusMap[status] || status;
};
</script>

<style scoped>
.recent-bookings {
  max-height: 400px;
  overflow-y: auto;
}
</style>
