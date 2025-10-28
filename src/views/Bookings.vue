<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Sarlavha va yangi bron qo'shish -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Bronlar Ro'yxati</h1>
      <button
        @click="openCreateModal"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <i class="fas fa-plus mr-2"></i>
        Yangi bron qilish
      </button>
    </div>

    <!-- Filtrlar -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Holati</label
          >
          <select
            v-model="filters.status"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Barchasi</option>
            <option value="pending">Kutilmoqda</option>
            <option value="confirmed">Tasdiqlangan</option>
            <option value="cancelled">Bekor qilingan</option>
            <option value="completed">Yakunlangan</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >To'lov holati</label
          >
          <select
            v-model="filters.payment_status"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Barchasi</option>
            <option value="pending">To'lanmagan</option>
            <option value="partial">Qisman to'langan</option>
            <option value="paid">To'langan</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Sana oraligi</label
          >
          <select
            v-model="filters.dateRange"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Barchasi</option>
            <option value="today">Bugun</option>
            <option value="week">Hafta</option>
            <option value="month">Oy</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Qidiruv</label
          >
          <div class="relative">
            <input
              v-model="filters.search"
              type="text"
              placeholder="Mijoz yoki xona nomi..."
              class="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistik ma'lumotlar -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-full">
            <i class="fas fa-calendar-check text-blue-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-gray-600">Jami bronlar</p>
            <p class="text-2xl font-bold">{{ bookings.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-full">
            <i class="fas fa-check-circle text-green-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-gray-600">Tasdiqlangan</p>
            <p class="text-2xl font-bold">{{ confirmedBookings().length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-full">
            <i class="fas fa-clock text-yellow-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-gray-600">Kutilmoqda</p>
            <p class="text-2xl font-bold">{{ pendingBookings().length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-3 bg-red-100 rounded-full">
            <i class="fas fa-times-circle text-red-600 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-gray-600">Bekor qilingan</p>
            <p class="text-2xl font-bold">{{ cancelledBookings().length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bronlar jadvali -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Yuklash holati -->
      <div v-if="loading" class="p-8 text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"
        ></div>
        <p class="mt-2 text-gray-600">Yuklanmoqda...</p>
      </div>

      <!-- Xatolik xabari -->
      <div
        v-else-if="error"
        class="p-4 bg-red-100 border-l-4 border-red-500 text-red-700"
      >
        <p>{{ error }}</p>
      </div>

      <!-- Bronlar ro'yxati -->
      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Mijoz & Xona
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sana
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Narx
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Holati
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  To'lov
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Harakatlar
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="booking in filteredBookings"
                :key="booking.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center"
                    >
                      <i class="fas fa-user text-blue-600"></i>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ booking.client?.name || "Noma'lum mijoz" }}
                      </div>
                      <div class="text-sm text-gray-500">
                        Xona {{ booking.room?.numbers || booking.xona_id }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ formatDate(booking.arrival_date) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ formatDate(booking.departure_date) }}
                  </div>
                  <div class="text-xs text-gray-400">
                    {{
                      calculateNights(
                        booking.arrival_date,
                        booking.departure_date
                      )
                    }}
                    kecha
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    ${{ booking.total_price }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="statusClass(booking.status)"
                  >
                    {{ statusText(booking.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="paymentStatusClass(booking.payment_status)"
                  >
                    {{ paymentStatusText(booking.payment_status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="viewBooking(booking)"
                      class="text-blue-600 hover:text-blue-900 cursor-pointer"
                      title="Ko'rish"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                    <button
                      @click="editBooking(booking)"
                      class="text-green-600 hover:text-green-900 cursor-pointer"
                      title="Tahrirlash"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      v-if="booking.status !== 'cancelled'"
                      @click="cancelBooking(booking)"
                      class="text-red-600 hover:text-red-900 cursor-pointer"
                      title="Bekor qilish"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Bo'sh holat -->
        <div v-if="filteredBookings.length === 0" class="text-center py-12">
          <i class="fas fa-calendar-times text-4xl text-gray-300 mb-3"></i>
          <h3 class="text-lg font-medium text-gray-700">
            Hech qanday bron topilmadi
          </h3>
          <p class="text-gray-500 mt-1">
            Filtr parametrlarini o'zgartiring yoki yangi bron qo'shing
          </p>
        </div>

        <!-- Paginatsiya -->
        <div
          v-if="filteredBookings.length > 0"
          class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        >
          <div
            class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
          >
            <div>
              <p class="text-sm text-gray-700">
                Ko'rsatilmoqda
                <span class="font-medium">{{
                  (currentPage - 1) * itemsPerPage + 1
                }}</span>
                dan
                <span class="font-medium">{{
                  Math.min(currentPage * itemsPerPage, filteredBookings.length)
                }}</span>
                gacha, jami
                <span class="font-medium">{{ filteredBookings.length }}</span>
                ta
              </p>
            </div>
            <div>
              <nav
                class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span class="sr-only">Oldingi</span>
                  <i class="fas fa-chevron-left"></i>
                </button>

                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    currentPage === page
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                  ]"
                >
                  {{ page }}
                </button>

                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span class="sr-only">Keyingi</span>
                  <i class="fas fa-chevron-right"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bronni ko'rish modali -->
    <div
      v-if="viewingBooking"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white"
      >
        <div class="flex justify-between items-center pb-3 border-b">
          <h3 class="text-xl font-semibold">Bron ma'lumotlari</h3>
          <button
            @click="viewingBooking = null"
            class="text-gray-400 hover:text-gray-600"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="mt-4 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-medium text-gray-700">Mijoz</h4>
              <p class="mt-1">
                {{ viewingBooking.client?.name || "Noma'lum mijoz" }}
              </p>
              <p class="text-sm text-gray-500">
                {{ viewingBooking.client?.phone }}
              </p>
            </div>

            <div>
              <h4 class="font-medium text-gray-700">Xona</h4>
              <p class="mt-1">
                Xona
                {{ viewingBooking.room?.numbers || viewingBooking.xona_id }}
              </p>
              <p class="text-sm text-gray-500">
                {{ roomTypeText(viewingBooking.room?.tur) }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-medium text-gray-700">Sana</h4>
              <p class="mt-1">
                {{ formatDate(viewingBooking.arrival_date) }} -
                {{ formatDate(viewingBooking.departure_date) }}
              </p>
              <p class="text-sm text-gray-500">
                {{
                  calculateNights(
                    viewingBooking.arrival_date,
                    viewingBooking.departure_date
                  )
                }}
                kecha
              </p>
            </div>

            <div>
              <h4 class="font-medium text-gray-700">Narx</h4>
              <p class="mt-1 font-bold">${{ viewingBooking.total_price }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-medium text-gray-700">Holati</h4>
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full mt-1"
                :class="statusClass(viewingBooking.status)"
              >
                {{ statusText(viewingBooking.status) }}
              </span>
            </div>

            <div>
              <h4 class="font-medium text-gray-700">To'lov holati</h4>
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full mt-1"
                :class="paymentStatusClass(viewingBooking.payment_status)"
              >
                {{ paymentStatusText(viewingBooking.payment_status) }}
              </span>
            </div>
          </div>

          <div v-if="viewingBooking.notes">
            <h4 class="font-medium text-gray-700">Qo'shimcha ma'lumotlar</h4>
            <p class="mt-1 text-sm text-gray-600">{{ viewingBooking.notes }}</p>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            @click="viewingBooking = null"
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>

    <!-- Bron qilish/tahrirlash modali -->
    <BookingFormModal
      :show="showBookingModal"
      :booking="editingBooking"
      @close="closeBookingModal"
      @saved="handleBookingSaved"
    />
  </div>
</template>

<script>
import { ref, computed, reactive, onMounted } from "vue";
import { useBookingStore } from "@/stores/bookings";
import { useRoomStore } from "@/stores/rooms";
import { useClientStore } from "@/stores/clients";
import BookingFormModal from "@/components/bookings/BookingFormModal.vue";

export default {
  name: "BookingsList",
  components: {
    BookingFormModal,
  },
  setup() {
    const bookingStore = useBookingStore();
    const roomStore = useRoomStore();
    const clientStore = useClientStore();

    const filters = reactive({
      status: "",
      payment_status: "",
      dateRange: "",
      search: "",
    });

    const viewingBooking = ref(null);
    const editingBooking = ref(null);
    const showBookingModal = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    // Store'dan ma'lumotlarni olish
    const bookings = computed(() => bookingStore.bookings);
    const loading = computed(() => bookingStore.loading);
    const error = computed(() => bookingStore.error);

    // Store getter'lari
    const confirmedBookings = () => bookingStore.confirmedBookings();
    const pendingBookings = () => bookingStore.pendingBookings();
    const cancelledBookings = () => bookingStore.cancelledBookings();

    // Filtrlangan bronlar
    const filteredBookings = computed(() => {
      let result = bookings.value;

      if (filters.status) {
        result = result.filter((booking) => booking.status === filters.status);
      }

      if (filters.payment_status) {
        result = result.filter(
          (booking) => booking.payment_status === filters.payment_status
        );
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        result = result.filter(
          (booking) =>
            (booking.client?.name || "").toLowerCase().includes(searchTerm) ||
            (booking.client?.phone || "").includes(searchTerm) ||
            (booking.room?.numbers || "").toLowerCase().includes(searchTerm)
        );
      }

      // Sana oraligi bo'yicha filtrlash
      if (filters.dateRange) {
        const today = new Date();
        result = result.filter((booking) => {
          const arrivalDate = new Date(booking.arrival_date);

          if (filters.dateRange === "today") {
            return arrivalDate.toDateString() === today.toDateString();
          } else if (filters.dateRange === "week") {
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);

            return arrivalDate >= weekStart && arrivalDate <= weekEnd;
          } else if (filters.dateRange === "month") {
            return (
              arrivalDate.getMonth() === today.getMonth() &&
              arrivalDate.getFullYear() === today.getFullYear()
            );
          }
          return true;
        });
      }

      return result;
    });

    // Paginatsiya
    const totalPages = computed(() =>
      Math.ceil(filteredBookings.value.length / itemsPerPage.value)
    );

    const paginatedBookings = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredBookings.value.slice(start, end);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    // Formatlash funksiyalari
    const formatDate = (dateString) => {
      if (!dateString) return "Noma'lum";
      return new Date(dateString).toLocaleDateString("uz-UZ");
    };

    const calculateNights = (arrival, departure) => {
      if (!arrival || !departure) return 0;
      const arrivalDate = new Date(arrival);
      const departureDate = new Date(departure);
      const diffTime = departureDate - arrivalDate;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const roomTypeText = (type) => {
      const types = {
        standard: "Standard",
        lux: "Lyuks",
        vip: "VIP",
        deluxe: "Deluxe",
      };
      return types[type] || type || "Noma'lum";
    };

    const statusClass = (status) => {
      const classes = {
        pending: "bg-yellow-100 text-yellow-800",
        confirmed: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
        completed: "bg-blue-100 text-blue-800",
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };

    const statusText = (status) => {
      const texts = {
        pending: "Kutilmoqda",
        confirmed: "Tasdiqlangan",
        cancelled: "Bekor qilingan",
        completed: "Yakunlangan",
      };
      return texts[status] || status || "Noma'lum";
    };

    const paymentStatusClass = (status) => {
      const classes = {
        pending: "bg-yellow-100 text-yellow-800",
        partial: "bg-blue-100 text-blue-800",
        paid: "bg-green-100 text-green-800",
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };

    const paymentStatusText = (status) => {
      const texts = {
        pending: "To'lanmagan",
        partial: "Qisman to'langan",
        paid: "To'langan",
      };
      return texts[status] || status || "Noma'lum";
    };

    // Harakatlar
    const viewBooking = (booking) => {
      viewingBooking.value = booking;
    };

    const editBooking = (booking) => {
      editingBooking.value = booking;
      showBookingModal.value = true;
    };

    const cancelBooking = async (booking) => {
      if (
        confirm(`Haqiqatan ham #${booking.id} bronni bekor qilmoqchimisiz?`)
      ) {
        try {
          await bookingStore.updateBookingStatus(booking.id, "cancelled");
        } catch (error) {
          console.error("Bronni bekor qilishda xatolik:", error);
        }
      }
    };

    // Modalni ochish va yopish
    const openCreateModal = () => {
      editingBooking.value = null;
      showBookingModal.value = true;
    };

    const closeBookingModal = () => {
      showBookingModal.value = false;
      editingBooking.value = null;
    };

    const handleBookingSaved = () => {
      closeBookingModal();
      // Kerak bo'lsa yangilashlar
    };

    // Dastlabki ma'lumotlarni yuklash
    onMounted(async () => {
      try {
        await Promise.all([
          bookingStore.fetchBookings(),
          roomStore.fetchRooms(),
          clientStore.fetchClients(),
        ]);
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      }
    });

    return {
      // Ma'lumotlar
      bookings,
      loading,
      error,
      filters,
      viewingBooking,
      showBookingModal,
      editingBooking,
      currentPage,
      itemsPerPage,
      totalPages,

      // Computed
      filteredBookings: paginatedBookings,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,

      // Funksiyalar
      formatDate,
      calculateNights,
      roomTypeText,
      statusClass,
      statusText,
      paymentStatusClass,
      paymentStatusText,
      viewBooking,
      editBooking,
      cancelBooking,
      nextPage,
      prevPage,
      openCreateModal,
      closeBookingModal,
      handleBookingSaved,
    };
  },
};
</script>

<style scoped>
/* Responsive dizayn uchun qo'shimcha stilalar */
@media (max-width: 640px) {
  .table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
