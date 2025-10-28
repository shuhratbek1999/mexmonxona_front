<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Sarlavha -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Mening bronlarim</h1>
        <p class="text-gray-600 mt-2">
          Sizning barcha bron qilgan xonalaringiz ro'yxati
        </p>
      </div>

      <!-- Filtrlar -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Holati</label
            >
            <select
              v-model="filterStatus"
              class="rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Barchasi</option>
              <option value="active">Faol</option>
              <option value="completed">Tugagan</option>
              <option value="cancelled">Bekor qilingan</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Sanadan</label
            >
            <input
              v-model="filterDateFrom"
              type="date"
              class="rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Sanagacha</label
            >
            <input
              v-model="filterDateTo"
              type="date"
              class="rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            @click="clearFilters"
            class="mt-6 text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            Filtrlarni tozalash
          </button>
        </div>
      </div>

      <!-- Yuklanmoqda -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
      </div>

      <!-- Bronlar ro'yxati -->
      <div v-else class="space-y-6">
        <!-- Bo'sh holat -->
        <div
          v-if="filteredBookings.length === 0"
          class="text-center py-12 bg-white rounded-lg shadow"
        >
          <div class="mx-auto w-24 h-24 text-gray-400 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Hozircha bronlar mavjud emas
          </h3>
          <p class="text-gray-500 mb-4">
            Siz hali hech qanday xona bron qilmagansiz
          </p>
          <router-link
            to="/booking"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Xona bron qilish
          </router-link>
        </div>

        <!-- Bron kartalari -->
        <div
          v-for="booking in filteredBookings"
          :key="booking.id"
          class="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div
              class="flex flex-col lg:flex-row lg:items-center lg:justify-between"
            >
              <!-- Xona ma'lumotlari -->
              <div class="flex-1">
                <div class="flex items-start justify-between">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">
                      xona - {{ booking?.xona?.numbers }}
                    </h3>
                    <p class="text-gray-600 mt-1">{{ booking?.xona?.tur }}</p>
                  </div>
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                      statusClasses[booking?.status],
                    ]"
                  >
                    {{ statusLabels[booking?.status] }}
                  </span>
                </div>

                <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="flex items-center text-gray-600">
                    <CalendarIcon class="h-5 w-5 text-gray-400 mr-2" />
                    <span>
                      {{ formatDate(booking.arrival_date) }} -
                      {{ formatDate(booking.departure_date) }}
                    </span>
                  </div>

                  <div class="flex items-center text-gray-600">
                    <UserGroupIcon class="h-5 w-5 text-gray-400 mr-2" />
                    <span>{{ booking?.client?.name }} </span>
                  </div>

                  <div class="flex items-center text-gray-600">
                    <CurrencyDollarIcon class="h-5 w-5 text-gray-400 mr-2" />
                    <span>{{ formatPrice(booking.total_price) }} USD</span>
                  </div>
                </div>
              </div>

              <!-- Amallar -->
              <div class="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                <button
                  @click="viewBookingDetails(booking.id)"
                  class="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 transition"
                >
                  Batafsil
                </button>

                <button
                  v-if="
                    booking.status === 'active' &&
                    isFutureBooking(booking.checkIn)
                  "
                  @click="cancelBooking(booking.id)"
                  class="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-500 transition"
                >
                  Bekor qilish
                </button>

                <button
                  v-if="booking.status === 'completed'"
                  @click="leaveReview(booking.id)"
                  class="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-500 transition"
                >
                  Sharh qoldirish
                </button>

                <!-- 💳 To'lov tugmasi -->
                <button
                  v-if="
                    booking.payment_status === 'pending' &&
                    booking.status === 'confirmed'
                  "
                  @click="makePayment(booking)"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                >
                  To‘lov qilish
                </button>

                <span
                  v-else-if="booking.payment_status === 'paid'"
                  class="px-4 py-2 text-sm font-medium text-green-600"
                >
                  ✅ To‘langan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredBookings.length > 0" class="mt-8 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-1 rounded-md text-sm font-medium',
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            {{ page }}
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useBookingStore } from "@/stores/bookings";
import { useRouter } from "vue-router";
import axios from "axios";
import {
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";
const router = useRouter();
const bookingStore = useBookingStore();
const loading = ref(false);
const userBookings = ref([]);

const filterStatus = ref("all");
const filterDateFrom = ref("");
const filterDateTo = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(5);

// Holatlar
const statusLabels = {
  confirmed: "Faol",
  completed: "Tugagan",
  cancelled: "Bekor qilingan",
  pending: "Kutilmoqda",
};
const statusClasses = {
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
};

// To‘lov funksiyasi 💳
const makePayment = async (booking) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/create_checkout_session",
      {
        bookingId: booking.id,
        amount: booking.total_price,
        roomName: booking?.xona?.numbers,
      }
    );
    window.location.href = response.data.url;
  } catch (error) {
    console.error("To‘lov yaratishda xatolik:", error);
    alert("To‘lovni boshlashda xatolik yuz berdi.");
  }
};

// Yuklash
onMounted(async () => {
  await loadUserBookings();
});

const loadUserBookings = async () => {
  loading.value = true;
  try {
    userBookings.value = await bookingStore.getUserBookings();
  } catch (error) {
    console.error("Bronlarni yuklashda xatolik:", error);
  } finally {
    loading.value = false;
  }
};

// Filtrlar
const filteredBookings = computed(() => {
  let filtered = userBookings.value;
  if (filterStatus.value !== "all") {
    filtered = filtered.filter(
      (booking) => booking.status === filterStatus.value
    );
  }
  if (filterDateFrom.value) {
    filtered = filtered.filter(
      (booking) => new Date(booking.checkIn) >= new Date(filterDateFrom.value)
    );
  }
  if (filterDateTo.value) {
    filtered = filtered.filter(
      (booking) => new Date(booking.checkOut) <= new Date(filterDateTo.value)
    );
  }
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  return filtered.slice(startIndex, startIndex + itemsPerPage.value);
});

const totalPages = computed(() =>
  Math.ceil(userBookings.value.length / itemsPerPage.value)
);

const formatDate = (d) => new Date(d).toLocaleDateString("uz-UZ");
const formatPrice = (p) => new Intl.NumberFormat("uz-UZ").format(p);
const isFutureBooking = (date) => new Date(date) > new Date();

const clearFilters = () => {
  filterStatus.value = "all";
  filterDateFrom.value = "";
  filterDateTo.value = "";
  currentPage.value = 1;
};

const viewBookingDetails = (id) => router.push(`/booking/${id}`);
const cancelBooking = async (id) => {
  if (confirm("Haqiqatan ham bronni bekor qilmoqchimisiz?")) {
    try {
      await bookingStore.cancelBooking(id);
      await loadUserBookings();
    } catch (e) {
      alert("Bekor qilishda xatolik: " + e.message);
    }
  }
};

const leaveReview = (id) => {
  console.log("Sharh qoldirish:", id);
};
</script>
