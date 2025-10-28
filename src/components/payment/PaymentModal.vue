<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
    >
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ payment ? "To'lovni Tahrirlash" : "Yangi To'lov" }}
        </h3>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <!-- Mijoz tanlash -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Mijoz *</label
          >
          <select
            v-model="formData.mijoz_id"
            @change="onClientChange"
            required
            :disabled="clientStore.loading"
            class="w-full h-10 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Mijozni tanlang</option>
            <option
              v-for="client in clientStore.clients"
              :key="client.id"
              :value="client.id"
            >
              {{ client.name }} - {{ client.phone }}
            </option>
          </select>
          <div v-if="clientStore.loading" class="text-sm text-gray-500 mt-1">
            <i class="fas fa-spinner fa-spin mr-1"></i> Mijozlar yuklanmoqda...
          </div>
          <div v-if="clientStore.error" class="text-sm text-red-500 mt-1">
            {{ clientStore.error }}
          </div>
        </div>

        <!-- Bron tanlash -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Bron *</label
          >
          <select
            v-model="formData.bron_id"
            @change="onBronChange"
            required
            :disabled="!formData.mijoz_id || loadingBookings"
            class="w-full border h-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Bronni tanlang</option>
            <option
              v-for="booking in clientBookings"
              :key="booking.id"
              :value="booking.id"
            >
              Bron #{{ booking.id }} - {{ formatDate(booking.arrival_date) }} -
              {{ formatDate(booking.departure_date) }} -
              {{ formatCurrency(booking.total_price) }}
            </option>
          </select>
          <div v-if="loadingBookings" class="text-sm text-gray-500 mt-1">
            <i class="fas fa-spinner fa-spin mr-1"></i> Bronlar yuklanmoqda...
          </div>
          <div
            v-if="
              formData.mijoz_id &&
              clientBookings.length === 0 &&
              !loadingBookings
            "
            class="text-sm text-yellow-600 mt-1"
          >
            Tanlangan mijozning bronlari topilmadi
          </div>
        </div>

        <!-- To'lov miqdori -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >To'lov Miqdori *</label
          >
          <div class="relative">
            <input
              type="number"
              step="0.01"
              v-model="formData.amount"
              required
              class="w-full h-10 indent-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
              :class="{ 'bg-gray-100': autoAmount }"
            />
            <span
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              $
            </span>
          </div>
          <div v-if="autoAmount" class="text-sm text-green-600 mt-1">
            Miqdor bron narxidan avtomatik olingan
          </div>
        </div>

        <!-- To'lov turi -->
        <div class="status flex gap-2 w-full items-center justify-between">
          <div class="w-[40%]">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >To'lov Turi *</label
            >
            <select
              v-model="formData.type"
              required
              class="w-full border h-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="cash">Naqd</option>
              <option value="card">Karta</option>
              <option value="transfer">Bank o'tkazmasi</option>
            </select>
          </div>
          <!-- To'lov holati -->
          <div class="w-[40%]">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >To'lov Holati *</label
            >
            <select
              v-model="formData.status"
              required
              class="w-full h-10 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="pending">Kutilmoqda</option>
              <option value="paid">To'langan</option>
              <option value="failed">Xatolik</option>
              <option value="refunded">Qaytarilgan</option>
            </select>
          </div>
        </div>
        <!-- To'langan sana -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >To'langan Sana</label
          >
          <input
            type="date"
            v-model="formData.paid_date"
            class="w-full h-10 border indent-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <!-- Tanlangan bron ma'lumotlari -->
        <div
          v-if="selectedBron"
          class="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <h4 class="font-medium text-blue-800 mb-2">Bron Ma'lumotlari:</h4>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span class="text-gray-600">Kirish:</span>
              <span class="font-medium ml-2">{{
                formatDate(selectedBron.arrival_date)
              }}</span>
            </div>
            <div>
              <span class="text-gray-600">Chiqish:</span>
              <span class="font-medium ml-2">{{
                formatDate(selectedBron.departure_date)
              }}</span>
            </div>
            <div>
              <span class="text-gray-600">Umumiy narx:</span>
              <span class="font-medium ml-2">{{
                formatCurrency(selectedBron.total_price)
              }}</span>
            </div>
            <div>
              <span class="text-gray-600">Bron holati:</span>
              <span
                class="font-medium ml-2"
                :class="getBronStatusClass(selectedBron.status)"
              >
                {{ getBronStatusText(selectedBron.status) }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
            :disabled="loading"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
            :disabled="loading || !formData.mijoz_id || !formData.bron_id"
          >
            <span v-if="loading">
              <i class="fas fa-spinner fa-spin mr-2"></i>
              {{ payment ? "Yangilanmoqda..." : "Yaratilmoqda..." }}
            </span>
            <span v-else>
              {{ payment ? "Yangilash" : "Yaratish" }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { useClientStore } from "@/stores/clients";
import { useBookingStore } from "@/stores/bookings";

const props = defineProps({
  payment: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["save", "close"]);

// Store'lar
const clientStore = useClientStore();
const bookingStore = useBookingStore();

// Local state
const clientBookings = ref([]);
const selectedBron = ref(null);
const loading = ref(false);
const loadingBookings = ref(false);
const autoAmount = ref(false);

// Form ma'lumotlari
const formData = ref({
  mijoz_id: "",
  bron_id: "",
  amount: "",
  type: "cash",
  status: "pending",
  paid_date: new Date().toISOString().split("T")[0],
});

// Computed
// const clientBookingsComputed = computed(() => {
//   if (!formData.value.mijoz_id) return [];
//   return bookingStore.getBookingsByClient(parseInt(formData.value.mijoz_id));
// });

// Formatlash funksiyalari
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: "USD",
  }).format(amount || 0);
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("uz-UZ");
};

const getBronStatusClass = (status) => {
  const classes = {
    confirmed: "text-green-600",
    active: "text-blue-600",
    completed: "text-gray-600",
    cancelled: "text-red-600",
  };
  return classes[status] || "text-gray-600";
};

const getBronStatusText = (status) => {
  const texts = {
    confirmed: "Tasdiqlangan",
    active: "Faol",
    completed: "Yakunlangan",
    cancelled: "Bekor qilingan",
  };
  return texts[status] || status;
};

// Hodisalar
const onClientChange = async () => {
  formData.value.bron_id = "";
  formData.value.amount = "";
  selectedBron.value = null;
  autoAmount.value = false;
  //   console.log(formData.value);
  // console.log(clientBookingsComputed.value, bookingStore.bookings);

  if (formData.value.mijoz_id) {
    loadingBookings.value = true;
    try {
      // BookingStore orqali mijozning bronlarini olish
      const bookings = await bookingStore.fetchBookingsByClient({
        mijoz_id: formData.value.mijoz_id,
      });
      clientBookings.value = bookings;
    } catch (error) {
      console.error("Bronlarni yuklashda xatolik:", error);
      clientBookings.value = [];
    } finally {
      loadingBookings.value = false;
    }
  } else {
    clientBookings.value = [];
  }
};

const onBronChange = async () => {
  if (formData.value.bron_id) {
    try {
      // Bron ma'lumotlarini olish
      await bookingStore.fetchBooking(formData.value.bron_id);
      selectedBron.value = bookingStore.currentBooking;

      // Bron narxini to'lov miqdori sifatida o'rnatish
      if (selectedBron.value && selectedBron.value.total_price) {
        formData.value.amount = selectedBron.value.total_price;
        autoAmount.value = true;
      }
    } catch (error) {
      console.error("Bron ma'lumotlarini yuklashda xatolik:", error);
    }
  } else {
    formData.value.amount = "";
    selectedBron.value = null;
    autoAmount.value = false;
  }
};

const handleSubmit = () => {
  loading.value = true;
  // Faqat kerakli ma'lumotlarni yuborish
  const submitData = {
    bron_id: formData.value.bron_id,
    mijoz_id: formData.value.mijoz_id,
    amount: parseFloat(formData.value.amount),
    type: formData.value.type,
    status: formData.value.status,
    paid_date:
      formData.value.paid_date || new Date().toISOString().split("T")[0],
  };

  emit("save", submitData);
  loading.value = false;
};

// Tahrirlash holati uchun ma'lumotlarni to'ldirish
const loadPaymentData = async () => {
  if (!props.payment) return;

  try {
    // Avval bron ma'lumotlarini olish
    await bookingStore.fetchBooking(props.payment.bron_id);
    const bron = bookingStore.currentBooking;

    if (bron) {
      formData.value.mijoz_id = bron.mijoz_id;
      formData.value.bron_id = props.payment.bron_id;
      formData.value.amount = props.payment.amount;
      formData.value.type = props.payment.type;
      formData.value.status = props.payment.status;
      formData.value.paid_date =
        props.payment.paid_date?.split("T")[0] ||
        new Date().toISOString().split("T")[0];

      // Mijozning bronlarini yuklash
      const bookings = await bookingStore.fetchBookings({
        mijoz_id: bron.mijoz_id,
      });
      clientBookings.value = bookings;

      // Bron ma'lumotlarini yuklash
      selectedBron.value = bron;
    }
  } catch (error) {
    console.error("To'lov ma'lumotlarini yuklashda xatolik:", error);
  }
};

// Komponent yuklanganda
onMounted(async () => {
  // Mijozlarni yuklash
  await clientStore.fetchClients();

  if (props.payment) {
    await loadPaymentData();
  }
});

// Payment prop o'zgarganda yangilash
watch(
  () => props.payment,
  async (newPayment) => {
    if (newPayment) {
      await loadPaymentData();
    } else {
      // Yangi to'lov - formani tozalash
      formData.value = {
        mijoz_id: "",
        bron_id: "",
        amount: "",
        type: "cash",
        status: "pending",
        paid_date: new Date().toISOString().split("T")[0],
      };
      selectedBron.value = null;
      clientBookings.value = [];
      autoAmount.value = false;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* Qo'shimcha stillar */
</style>
