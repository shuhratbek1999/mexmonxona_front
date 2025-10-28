<template>
  <div class="daily-stats bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Kunlik Statistika</h2>

    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Sana</label>
      <input
        v-model="dailyDate"
        type="date"
        @change="fetchDailyStats"
        class="w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>

    <div v-if="loadingDailyStats" class="text-center py-8">
      <i class="fas fa-spinner fa-spin text-2xl text-blue-600"></i>
      <p class="mt-2 text-gray-600">Statistika yuklanmoqda...</p>
    </div>

    <div v-else-if="dailyStats" class="space-y-6">
      <!-- Asosiy ko'rsatkichlar -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-blue-50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">
            {{ dailyStats.total_bookings }}
          </div>
          <div class="text-sm text-blue-800">Jami Bronlar</div>
        </div>

        <div class="bg-green-50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-green-600">
            {{ formatCurrency(dailyStats.total_revenue) }}
          </div>
          <div class="text-sm text-green-800">Jami Daromad</div>
        </div>

        <div class="bg-purple-50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-purple-600">
            {{ dailyStats.bookings.length }}
          </div>
          <div class="text-sm text-purple-800">Faol Bronlar</div>
        </div>
      </div>

      <!-- Statuslar bo'yicha taqsimot -->
      <div>
        <h3 class="text-lg font-medium mb-3">Statuslar Bo'yicha</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div
            v-for="stat in dailyStats.status_stats"
            :key="stat.status"
            class="border border-gray-200 rounded-lg p-3 text-center"
          >
            <div class="text-lg font-bold" :class="getStatusColor(stat.status)">
              {{ stat.count }}
            </div>
            <div class="text-sm text-gray-600">
              {{ getStatusText(stat.status) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Kunlik bronlar ro'yxati -->
      <div>
        <h3 class="text-lg font-medium mb-3">Kunlik Bronlar</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  ID
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Mijoz
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Xona
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Narx
                </th>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="booking in dailyStats.bookings" :key="booking.id">
                <td class="px-4 py-2 text-sm font-medium text-gray-900">
                  #{{ booking.id }}
                </td>
                <td class="px-4 py-2 text-sm text-gray-900">
                  {{ booking.client?.name }}
                  <div class="text-xs text-gray-500">
                    {{ booking.client?.phone }}
                  </div>
                </td>
                <td class="px-4 py-2 text-sm text-gray-900">
                  Xona {{ booking.xona?.numbers }}
                  <div class="text-xs text-gray-500">
                    {{ roomTypeText(booking.xona?.tur) }}
                  </div>
                </td>
                <td class="px-4 py-2 text-sm font-medium text-green-600">
                  {{ formatCurrency(booking.total_price) }}
                </td>
                <td class="px-4 py-2">
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    :class="getStatusClass(booking.status)"
                  >
                    {{ getStatusText(booking.status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-if="dailyStats.bookings.length === 0"
          class="text-center py-8 text-gray-500"
        >
          <i class="fas fa-calendar-day text-4xl mb-3"></i>
          <p>Tanlangan sanada bronlar mavjud emas</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBookingStore } from "@/stores/bookings";

const bookingStore = useBookingStore();

const dailyDate = ref(new Date().toISOString().split("T")[0]);
const dailyStats = ref(null);
const loadingDailyStats = ref(false);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: "USD",
  }).format(amount || 0);
};

const roomTypeText = (type) => {
  const typeMap = {
    standard: "Standard",
    lux: "Lyuks",
    vip: "VIP",
  };
  return typeMap[type] || type;
};

const getStatusClass = (status) => {
  const classes = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getStatusText = (status) => {
  const texts = {
    pending: "Kutilmoqda",
    confirmed: "Tasdiqlangan",
    completed: "Yakunlangan",
    cancelled: "Bekor qilingan",
  };
  return texts[status] || status;
};

const getStatusColor = (status) => {
  const colors = {
    pending: "text-yellow-600",
    confirmed: "text-green-600",
    completed: "text-blue-600",
    cancelled: "text-red-600",
  };
  return colors[status] || "text-gray-600";
};

const fetchDailyStats = async () => {
  loadingDailyStats.value = true;
  try {
    const result = await bookingStore.fetchDailyStats(dailyDate.value);
    dailyStats.value = result.data;
  } catch (error) {
    console.error("Kunlik statistika yuklashda xatolik:", error);
  } finally {
    loadingDailyStats.value = false;
  }
};

onMounted(() => {
  fetchDailyStats();
});
</script>
