<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Панель управления</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-500">
            <i class="fas fa-bed text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-gray-500">общий комнаты</p>
            <h3 class="text-2xl font-bold">{{ stats.totalRooms }}</h3>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-500">
            <i class="fas fa-calendar-check text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-gray-500">Активные бронирования</p>
            <h3 class="text-2xl font-bold">{{ stats.activeBookings }}</h3>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-500">
            <i class="fas fa-users text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-gray-500">Клиенты</p>
            <h3 class="text-2xl font-bold">{{ stats.totalClients }}</h3>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-500">
            <i class="fas fa-money-bill-wave text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-gray-500">Доход сегодня</p>
            <h3 class="text-2xl font-bold">{{ stats.todayRevenue }} so'm</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">Недавние бронирования</h2>
        <RecentBookings />
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">Состояние комнаты</h2>
        <RoomStatusChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import RecentBookings from "@/components/dashboard/RecentBookings.vue";
import RoomStatusChart from "@/components/dashboard/RoomStatusChart.vue";
import { useBookingStore } from "@/stores/bookings";
import { useRoomStore } from "@/stores/rooms";
import { useClientStore } from "@/stores/clients";

const bookingStore = useBookingStore();
const roomStore = useRoomStore();
const clientStore = useClientStore();

const stats = ref({
  totalRooms: 0,
  activeBookings: 0,
  totalClients: 0,
  todayRevenue: 0,
});

onMounted(async () => {
  await Promise.all([
    roomStore.fetchRooms(),
    bookingStore.fetchBookings(),
    clientStore.fetchClients(),
  ]);
  let activeBooking = [];
  activeBooking = bookingStore.bookings.filter((b) => b.status == "confirmed");
  stats.value = {
    totalRooms: roomStore.rooms?.length > 0 ? roomStore.rooms?.length : 0,
    activeBookings: activeBooking.length,
    totalClients:
      clientStore.clients?.length > 0 ? clientStore.clients.length : 0,
    todayRevenue: 0,
  };
  // console.log(bookingStore.bookings.filter((b) => b.status == "approved"));
});
</script>
