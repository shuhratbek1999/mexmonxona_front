<template>
  <div class="availability-check bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Xona Mavjudligini Tekshirish</h2>

    <form @submit.prevent="checkAvailability" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Kirish Sana</label
          >
          <input
            v-model="availabilityParams.checkIn"
            type="date"
            required
            :min="minDate"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Chiqish Sana</label
          >
          <input
            v-model="availabilityParams.checkOut"
            type="date"
            required
            :min="availabilityParams.checkIn || minDate"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Xona Turi</label
          >
          <select
            v-model="availabilityParams.roomType"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Hamma</option>
            <option value="standard">Standard</option>
            <option value="lux">Lyuks</option>
            <option value="vip">VIP</option>
          </select>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <button
          type="submit"
          :disabled="loadingAvailability"
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          <span v-if="loadingAvailability">
            <i class="fas fa-spinner fa-spin mr-2"></i>Tekshirilmoqda...
          </span>
          <span v-else>
            <i class="fas fa-search mr-2"></i>Mavjudlikni Tekshirish
          </span>
        </button>

        <div v-if="availabilityResult" class="text-sm text-gray-600">
          {{ availabilityResult.total_available }} ta xona mavjud
        </div>
      </div>
    </form>

    <!-- Natijalar -->
    <div
      v-if="availabilityResult && availabilityResult.available_rooms.length > 0"
      class="mt-6"
    >
      <h3 class="text-lg font-medium mb-3">Mavjud Xonalar</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="room in availabilityResult.available_rooms"
          :key="room.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start mb-2">
            <h4 class="font-semibold text-gray-800">Xona {{ room.numbers }}</h4>
            <span
              class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
            >
              {{ roomTypeText(room.tur) }}
            </span>
          </div>
          <p class="text-gray-600 text-sm mb-2">{{ room.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold text-blue-600">
              {{ formatCurrency(room.price) }}
            </span>
            <span class="text-sm text-gray-500"
              >Kishi: {{ room.capacity }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="availabilityResult"
      class="mt-6 text-center py-8 text-gray-500"
    >
      <i class="fas fa-bed text-4xl mb-3"></i>
      <p>Tanlangan sanalarda mavjud xona yo'q</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useBookingStore } from "@/stores/bookings";

const bookingStore = useBookingStore();

const availabilityParams = ref({
  checkIn: "",
  checkOut: "",
  roomType: "",
});

const availabilityResult = ref(null);
const loadingAvailability = ref(false);

const minDate = computed(() => new Date().toISOString().split("T")[0]);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const roomTypeText = (type) => {
  const typeMap = {
    standard: "Standard",
    lux: "Lyuks",
    vip: "VIP",
  };
  return typeMap[type] || type;
};

const checkAvailability = async () => {
  loadingAvailability.value = true;
  try {
    const result = await bookingStore.checkAvailability(
      availabilityParams.value.checkIn,
      availabilityParams.value.checkOut,
      availabilityParams.value.roomType || null
    );
    availabilityResult.value = result.data;
  } catch (error) {
    console.error("Mavjudlik tekshirishda xatolik:", error);
  } finally {
    loadingAvailability.value = false;
  }
};
</script>
