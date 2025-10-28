<template>
  <div class="room-status-chart">
    <div v-if="loading" class="text-center py-4">
      <i class="fas fa-spinner fa-spin text-blue-500"></i>
      <p class="text-gray-500 mt-2">Yuklanmoqda...</p>
    </div>

    <div v-else class="space-y-6">
      <!-- Statistik ma'lumotlar -->
      <div class="grid grid-cols-3 gap-4">
        <div class="text-center p-3 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">
            {{ stats.available }}
          </div>
          <div class="text-sm text-blue-800">Пустой</div>
        </div>
        <div class="text-center p-3 bg-green-50 rounded-lg">
          <div class="text-2xl font-bold text-green-600">
            {{ stats.occupied }}
          </div>
          <div class="text-sm text-green-800">Занятый</div>
        </div>
        <div class="text-center p-3 bg-red-50 rounded-lg">
          <div class="text-2xl font-bold text-red-600">
            {{ stats.maintenance }}
          </div>
          <div class="text-sm text-red-800">В ремонте</div>
        </div>
      </div>

      <!-- Progress barlar -->
      <div class="space-y-3">
        <div
          v-for="(status, index) in statusData"
          :key="index"
          class="flex items-center justify-between"
        >
          <span class="text-sm font-medium text-gray-700 w-24">{{
            status.label
          }}</span>
          <div class="flex-1 mx-3">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="h-2 rounded-full"
                :class="status.color"
                :style="{ width: status.percentage + '%' }"
              ></div>
            </div>
          </div>
          <span class="text-sm font-medium text-gray-700 w-8"
            >{{ status.percentage }}%</span
          >
        </div>
      </div>

      <!-- Xonalar ro'yxati -->
      <div class="mt-6">
        <h3 class="font-semibold text-gray-700 mb-3">Состояние комнаты</h3>
        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="room in rooms"
            :key="room.id"
            class="p-2 rounded text-center text-sm"
            :class="getRoomStatusClass(room.status)"
          >
            {{ room.numbers }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoomStore } from "@/stores/rooms";

const roomStore = useRoomStore();
const rooms = ref([]);
const loading = ref(true);

const stats = computed(() => {
  const available = rooms.value.filter(
    (room) => room.status === "empty"
  ).length;
  const occupied = rooms.value.filter((room) => room.status === "busy").length;
  const maintenance = rooms.value.filter(
    (room) => room.status === "cleaning_need"
  ).length;
  const total = rooms.value.length;

  return {
    available,
    occupied,
    maintenance,
    total,
  };
});

const statusData = computed(() => {
  const total = stats.value.total || 1;
  return [
    {
      label: "Пустой",
      count: stats.value.available,
      percentage: Math.round((stats.value.available / total) * 100),
      color: "bg-blue-500",
    },
    {
      label: "Занятый",
      count: stats.value.occupied,
      percentage: Math.round((stats.value.occupied / total) * 100),
      color: "bg-green-500",
    },
    {
      label: "ремонте",
      count: stats.value.maintenance,
      percentage: Math.round((stats.value.maintenance / total) * 100),
      color: "bg-red-500",
    },
  ];
});

onMounted(async () => {
  try {
    await roomStore.fetchRooms();
    rooms.value = roomStore.rooms.slice(0, 12); // Faqat birinchi 12 ta xonani ko'rsatish
    // console.log(rooms.value);
  } catch (error) {
    console.error("Xonalarni yuklashda xato:", error);
  } finally {
    loading.value = false;
  }
});

const getRoomStatusClass = (status) => {
  const classes = {
    empty: "bg-blue-100 text-blue-800 border border-blue-200",
    busy: "bg-green-100 text-green-800 border border-green-200",
    cleaning_need: "bg-red-100 text-red-800 border border-red-200",
  };
  return classes[status] || "bg-gray-100 text-gray-800 border border-gray-200";
};
</script>
