<template>
  <div class="monthly-stats bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Oylik Statistika</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Yil</label>
        <select
          v-model="selectedYear"
          @change="fetchMonthlyStats"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option v-for="year in years" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Oy</label>
        <select
          v-model="selectedMonth"
          @change="fetchMonthlyStats"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option
            v-for="month in months"
            :key="month.value"
            :value="month.value"
          >
            {{ month.name }}
          </option>
        </select>
      </div>

      <div class="flex items-end">
        <button
          @click="fetchMonthlyStats"
          :disabled="loadingMonthlyStats"
          class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          <span v-if="loadingMonthlyStats">
            <i class="fas fa-spinner fa-spin mr-2"></i>Yuklanmoqda...
          </span>
          <span v-else> <i class="fas fa-chart-bar mr-2"></i>Statistika </span>
        </button>
      </div>
    </div>

    <div v-if="loadingMonthlyStats" class="text-center py-8">
      <i class="fas fa-spinner fa-spin text-2xl text-blue-600"></i>
      <p class="mt-2 text-gray-600">Statistika yuklanmoqda...</p>
    </div>

    <div v-else-if="monthlyStats" class="space-y-6">
      <!-- Asosiy ko'rsatkichlar -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-blue-50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">
            {{ monthlyStats.total_bookings }}
          </div>
          <div class="text-sm text-blue-800">Jami Bronlar</div>
        </div>

        <div class="bg-green-50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-green-600">
            {{ formatCurrency(monthlyStats.total_revenue) }}
          </div>
          <div class="text-sm text-green-800">Jami Daromad</div>
        </div>

        <div class="bg-purple-50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-purple-600">
            {{
              Math.round(
                monthlyStats.total_revenue / monthlyStats.total_bookings
              ) || 0
            }}
          </div>
          <div class="text-sm text-purple-800">O'rtacha Narx</div>
        </div>

        <div class="bg-orange-50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-orange-600">
            {{ monthlyStats.bookings.length }}
          </div>
          <div class="text-sm text-orange-800">Faol Bronlar</div>
        </div>
      </div>

      <!-- Kunlik statistika grafigi -->
      <div>
        <h3 class="text-lg font-medium mb-3">Kunlik Daromad</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-end space-x-1 h-32">
            <div
              v-for="day in monthlyStats.daily_stats"
              :key="day.date"
              class="flex-1 flex flex-col items-center"
            >
              <div
                class="bg-blue-500 rounded-t w-full max-w-8"
                :style="{ height: getBarHeight(day.daily_revenue) + 'px' }"
              ></div>
              <div class="text-xs text-gray-500 mt-1">
                {{ new Date(day.date).getDate() }}
              </div>
              <div class="text-xs font-medium">
                {{ formatCurrencyShort(day.daily_revenue) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statuslar bo'yicha taqsimot -->
      <div>
        <h3 class="text-lg font-medium mb-3">Statuslar Bo'yicha</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div
            v-for="stat in monthlyStats.status_stats"
            :key="stat.status"
            class="border border-gray-200 rounded-lg p-3 text-center"
          >
            <div class="text-lg font-bold" :class="getStatusColor(stat.status)">
              {{ stat.count }}
            </div>
            <div class="text-sm text-gray-600">
              {{ getStatusText(stat.status) }}
            </div>
            <div class="text-xs text-gray-500">
              {{
                Math.round((stat.count / monthlyStats.total_bookings) * 100)
              }}%
            </div>
          </div>
        </div>
      </div>

      <!-- Oylik bronlar ro'yxati -->
      <div>
        <h3 class="text-lg font-medium mb-3">
          Oylik Bronlar ({{ monthlyStats.bookings.length }})
        </h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Sana
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
              <tr v-for="booking in monthlyStats.bookings" :key="booking.id">
                <td class="px-4 py-2 text-sm text-gray-900">
                  {{ formatDate(booking.arrival_date) }}
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useBookingStore } from "@/stores/bookings";

const bookingStore = useBookingStore();

const selectedYear = ref(new Date().getFullYear());
const selectedMonth = ref(new Date().getMonth() + 1);
const monthlyStats = ref(null);
const loadingMonthlyStats = ref(false);

// Yillar ro'yxati (joriy yil -5 dan joriy yilgacha)
const years = computed(() => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);
});

// Oylar ro'yxati
const months = ref([
  { value: 1, name: "Yanvar" },
  { value: 2, name: "Fevral" },
  { value: 3, name: "Mart" },
  { value: 4, name: "Aprel" },
  { value: 5, name: "May" },
  { value: 6, name: "Iyun" },
  { value: 7, name: "Iyul" },
  { value: 8, name: "Avgust" },
  { value: 9, name: "Sentabr" },
  { value: 10, name: "Oktabr" },
  { value: 11, name: "Noyabr" },
  { value: 12, name: "Dekabr" },
]);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: "USD",
  }).format(amount || 0);
};

const formatCurrencyShort = (amount) => {
  if (!amount) return "0";
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1) + "M";
  }
  if (amount >= 1000) {
    return (amount / 1000).toFixed(1) + "K";
  }
  return amount;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("uz-UZ");
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

const getBarHeight = (revenue) => {
  if (!monthlyStats.value) return 0;
  const maxRevenue = Math.max(
    ...monthlyStats.value.daily_stats.map((d) => d.daily_revenue || 0)
  );
  if (maxRevenue === 0) return 0;
  return (revenue / maxRevenue) * 80;
};

const fetchMonthlyStats = async () => {
  loadingMonthlyStats.value = true;
  try {
    const result = await bookingStore.fetchMonthlyStats(
      selectedYear.value,
      selectedMonth.value
    );
    monthlyStats.value = result.data;
  } catch (error) {
    console.error("Oylik statistika yuklashda xatolik:", error);
  } finally {
    loadingMonthlyStats.value = false;
  }
};

onMounted(() => {
  fetchMonthlyStats();
});
</script>
