<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Orqaga qaytish -->
      <div class="mb-6">
        <button
          @click="$router.back()"
          class="flex items-center text-blue-600 hover:text-blue-500 font-medium"
        >
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
          Orqaga
        </button>
      </div>

      <!-- Asosiy karta -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Header -->
        <div
          class="bg-gradient-to-r from-blue-600 to-purple-700 px-6 py-8 text-white"
        >
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h1 class="text-3xl font-bold mb-2">{{ booking.roomName }}</h1>
              <p class="text-blue-100 text-lg">{{ booking.roomType }}</p>
            </div>
            <div class="mt-4 md:mt-0">
              <span
                :class="[
                  'inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold',
                  statusClasses[booking.status],
                ]"
              >
                <component
                  :is="statusIcons[booking.status]"
                  class="w-5 h-5 mr-2"
                />
                {{ statusLabels[booking.status] }}
              </span>
            </div>
          </div>
        </div>

        <!-- Ma'lumotlar -->
        <div class="p-6">
          <!-- Bron raqami -->
          <div class="mb-6 p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Bron raqami</h3>
                <p class="text-2xl font-bold text-blue-600">
                  #{{ booking.id }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-500">Yaratilgan sana</p>
                <p class="text-gray-700">{{ formatDate(booking.createdAt) }}</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Chap qism - Asosiy ma'lumotlar -->
            <div>
              <h2 class="text-xl font-semibold text-gray-900 mb-4">
                Bron tafsilotlari
              </h2>

              <!-- Sana va vaqt -->
              <div class="space-y-4">
                <div
                  class="flex items-center p-4 border border-gray-200 rounded-lg"
                >
                  <CalendarIcon class="w-6 h-6 text-blue-500 mr-4" />
                  <div>
                    <p class="font-medium text-gray-900">Kirish - Chiqish</p>
                    <p class="text-gray-600">
                      {{ formatDate(booking.checkIn) }} -
                      {{ formatDate(booking.checkOut) }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ calculateNights(booking.checkIn, booking.checkOut) }}
                      kecha-kun
                    </p>
                  </div>
                </div>

                <!-- Mehmonlar -->
                <div
                  class="flex items-center p-4 border border-gray-200 rounded-lg"
                >
                  <UserGroupIcon class="w-6 h-6 text-green-500 mr-4" />
                  <div>
                    <p class="font-medium text-gray-900">Mehmonlar soni</p>
                    <p class="text-gray-600">
                      {{ booking?.room?.capacity }} kishi
                    </p>
                  </div>
                </div>

                <!-- Narx -->
                <div
                  class="flex items-center p-4 border border-gray-200 rounded-lg"
                >
                  <CurrencyDollarIcon class="w-6 h-6 text-yellow-500 mr-4" />
                  <div>
                    <p class="font-medium text-gray-900">Umumiy narx</p>
                    <p class="text-2xl font-bold text-gray-900">
                      {{ formatPrice(booking.totalPrice) }} USD
                    </p>
                  </div>
                </div>
              </div>

              <!-- To'lov holati -->
              <div class="mt-6 p-4 border border-gray-200 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">
                  To'lov ma'lumotlari
                </h3>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">To'lov holati:</span>
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-sm font-medium',
                      paymentStatusClasses[booking.paymentStatus],
                    ]"
                  >
                    {{ paymentStatusLabels[booking.paymentStatus] }}
                  </span>
                </div>
                <div class="mt-2 flex justify-between">
                  <span class="text-gray-600">To'lov usuli:</span>
                  <span class="text-gray-900">{{ booking.paymentMethod }}</span>
                </div>
              </div>
            </div>

            <!-- O'ng qism - Qo'shimcha ma'lumotlar -->
            <div>
              <!-- Xona tavsifi -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">
                  Xona tavsifi
                </h3>
                <div class="space-y-2 text-gray-600">
                  <div class="flex justify-between">
                    <span>Xona Turi:</span>
                    <span class="font-bold">{{ booking.roomType }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Nechinchi qavat:</span>
                    <span>{{ booking.floor }} - qavat</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Nech kishilik:</span>
                    <span>{{ booking.room?.capacity }} kishi</span>
                  </div>
                </div>
              </div>

              <!-- Qulayliklar -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">
                  Qulayliklar
                </h3>
                <div class="grid grid-cols-2 gap-2">
                  <div
                    v-for="amenity in booking?.room?.amenities"
                    :key="amenity"
                    class="flex items-center text-gray-600"
                  >
                    <CheckIcon class="w-4 h-4 text-green-500 mr-2" />
                    <span class="text-sm">{{ amenity }}</span>
                  </div>
                </div>
              </div>
              <!-- Aloqa ma'lumotlari -->
              <div class="border-t pt-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-3">
                  Aloqa ma'lumotlari
                </h3>
                <div class="space-y-2 text-gray-600">
                  <div class="flex items-center">
                    <PhoneIcon class="w-4 h-4 mr-2" />
                    <span>{{ booking.user?.phone }}</span>
                  </div>
                  <div class="flex items-center">
                    <EnvelopeIcon class="w-4 h-4 mr-2" />
                    <span>{{ booking.user?.email }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Amallar paneli -->
          <div class="mt-8 pt-6 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                v-if="
                  booking.status === 'active' &&
                  isFutureBooking(booking.checkIn)
                "
                @click="cancelBooking"
                class="px-6 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
              >
                Bronni bekor qilish
              </button>

              <button
                v-if="booking.status === 'completed' && !booking.hasReview"
                @click="leaveReview"
                class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Sharh qoldirish
              </button>

              <button
                @click="printDetails"
                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Chop etish
              </button>

              <button
                @click="contactSupport"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Yordam so'rash
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Xarita (agar mavjud bo'lsa) -->
      <div
        v-if="booking.location"
        class="mt-8 bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Joylashuv</h2>
        <div
          class="h-64 bg-gray-200 rounded-lg flex items-center justify-center"
        >
          <p class="text-gray-500">
            Xarita ko'rsatiladi: {{ booking.location }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBookingStore } from "@/stores/bookings";

const route = useRoute();
const router = useRouter();
const bookingStore = useBookingStore();

const booking = ref({
  id: "",
  roomName: "",
  roomType: "",
  status: "",
  checkIn: "",
  checkOut: "",
  guests: 0,
  totalPrice: 0,
  paymentStatus: "",
  paymentMethod: "",
  roomSize: "",
  floor: "",
  capacity: 0,
  amenities: [],
  specialRequests: "",
  contactPhone: "",
  contactEmail: "",
  createdAt: "",
  location: "",
});

// Status ma'lumotlari
const statusLabels = {
  active: "Faol",
  completed: "Tugagan",
  cancelled: "Bekor qilingan",
  pending: "Kutilmoqda",
};

const statusClasses = {
  active: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
};

const paymentStatusLabels = {
  paid: "To'langan",
  pending: "Kutilmoqda",
  failed: "Xatolik",
  refunded: "Qaytarilgan",
};

const paymentStatusClasses = {
  paid: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-blue-100 text-blue-800",
};

// Ikonlar
const ArrowLeftIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>`,
};

const CalendarIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>`,
};

const UserGroupIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>`,
};

const CurrencyDollarIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>`,
};

const CheckIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>`,
};

const PhoneIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>`,
};

const EnvelopeIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>`,
};

const statusIcons = {
  active: CheckIcon,
  completed: CheckIcon,
  cancelled: {
    template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>`,
  },
  pending: {
    template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`,
  },
};

onMounted(async () => {
  const bookingId = route.params.id;
  await loadBookingDetails(bookingId);
});

const loadBookingDetails = async (bookingId) => {
  try {
    const bookingData = await bookingStore.getBookingDetails(bookingId);
    booking.value = bookingData;
  } catch (error) {
    console.error("Bron ma'lumotlarini yuklashda xatolik:", error);
    router.push("/my-bookings");
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("uz-UZ").format(price);
};

const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const isFutureBooking = (checkInDate) => {
  return new Date(checkInDate) > new Date();
};

const cancelBooking = async () => {
  if (confirm("Haqiqatan ham bronni bekor qilmoqchimisiz?")) {
    try {
      await bookingStore.cancelBooking(booking.value.id);
      await loadBookingDetails(booking.value.id);
    } catch (error) {
      alert("Bekor qilishda xatolik: " + error.message);
    }
  }
};

const leaveReview = () => {
  router.push(`/review/${booking.value.id}`);
};

const printDetails = () => {
  window.print();
};

const contactSupport = () => {
  // Yordam xizmatiga bog'lanish
  window.location.href = `tel:+998901234567`;
};
</script>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
