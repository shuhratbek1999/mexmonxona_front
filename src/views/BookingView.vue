<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Sarlavha -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Bron Qilish</h1>
    </div>

    <!-- Sana tanlash -->
    <div class="bg-white p-6 rounded-lg shadow mb-6">
      <h2 class="text-lg font-semibold mb-4">Sana va Vaqtni Tanlang</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Kirish sanasi *</label
          >
          <input
            v-model="searchParams.arrival_date"
            type="date"
            required
            :min="minDate"
            @change="findAvailableRooms"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Chiqish sanasi *</label
          >
          <input
            v-model="searchParams.departure_date"
            type="date"
            required
            :min="searchParams.arrival_date || minDate"
            @change="findAvailableRooms"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>

    <!-- Yuklash holati -->
    <div v-if="loading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"
      ></div>
      <p class="mt-2 text-gray-600">Xonalar qidirilmoqda...</p>
    </div>

    <!-- Bo'sh xonalar -->
    <div
      v-else-if="availableRooms.length > 0"
      class="bg-white p-6 rounded-lg shadow"
    >
      <h2 class="text-lg font-semibold mb-4">
        Mavjud Xonalar ({{ availableRooms.length }})
      </h2>
      <p class="text-sm text-gray-600 mb-4">
        {{ formatDate(searchParams.arrival_date) }} -
        {{ formatDate(searchParams.departure_date) }} oralig'ida bo'sh xonalar
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="room in availableRooms"
          :key="room.id"
          class="border rounded-lg p-4 hover:shadow-md transition-shadow"
          :class="{ 'border-blue-500 border-2': selectedRoom?.id === room.id }"
        >
          <div class="h-40 bg-gray-200 rounded-md mb-3 overflow-hidden">
            <img
              :src="getRoomImage(room)"
              :alt="room.name"
              class="w-full h-full object-cover"
            />
          </div>

          <h3 class="font-semibold text-lg">{{ room.name }}</h3>
          <p class="text-gray-600 text-sm mb-2">Xona {{ room.numbers }}</p>

          <div class="flex items-center justify-between mb-3">
            <span class="text-2xl font-bold text-blue-600"
              >${{ room.price }}</span
            >
            <span class="text-sm text-gray-500">kechalik</span>
          </div>

          <div class="mb-3">
            <div class="flex items-center text-sm text-gray-600 mb-1">
              <i class="fas fa-users mr-2"></i>
              {{ room.capacity }} kishi
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <i class="fas fa-bed mr-2"></i>
              {{ roomTypeText(room.tur) }}
            </div>
          </div>

          <div class="mb-3">
            <div class="flex flex-wrap gap-1">
              <span
                v-for="amenity in room.amenities"
                :key="amenity"
                class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
              >
                {{ amenity }}
              </span>
            </div>
          </div>

          <button
            @click="selectRoom(room)"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
            :class="{
              'bg-green-500 hover:bg-green-600': selectedRoom?.id === room.id,
            }"
          >
            {{ selectedRoom?.id === room.id ? "Tanlangan" : "Tanlash" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Bron qilish formasi -->
    <div v-if="selectedRoom" class="bg-white p-6 rounded-lg shadow mt-6">
      <h2 class="text-lg font-semibold mb-4">Bron Ma'lumotlari</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Tanlangan xona -->
        <div>
          <h3 class="font-medium mb-2">Tanlangan Xona</h3>
          <div class="border rounded-lg p-4">
            <div class="flex items-start">
              <img
                :src="getRoomImage(selectedRoom)"
                alt="Xona rasmi"
                class="w-16 h-12 object-cover rounded mr-3"
              />
              <div>
                <h4 class="font-semibold">{{ selectedRoom.name }}</h4>
                <p class="text-sm text-gray-600">
                  Xona {{ selectedRoom.numbers }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ roomTypeText(selectedRoom.tur) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Narx hisobi -->
        <div>
          <h3 class="font-medium mb-2">Narx Hisobi</h3>
          <div class="border rounded-lg p-4">
            <div class="flex justify-between mb-2">
              <span>{{ selectedRoom.price }} $ x {{ stayDays }} kecha</span>
              <span>${{ selectedRoom.price * stayDays }}</span>
            </div>
            <div class="border-t pt-2 font-semibold flex justify-between">
              <span>Jami:</span>
              <span>${{ selectedRoom.price * stayDays }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mijoz ma'lumotlari -->
      <h3 class="font-medium mb-4">Mijoz Ma'lumotlari</h3>

      <!-- Mijoz tanlash -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Mijozi tanlang yoki yangi qo'shing</label
        >
        <div class="flex gap-3 mb-3">
          <select
            v-model="selectedClientId"
            class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            @change="onClientSelect"
          >
            <option value="">Mijozi tanlang</option>
            <option
              v-for="client in clients"
              :key="client.id"
              :value="client.id"
            >
              {{ client.name }} - {{ client.phone }}
            </option>
            <option value="new">+ Yangi mijoz qo'shish</option>
          </select>

          <button
            @click="showClientModal = true"
            class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>

        <!-- Yangi mijoz formasi -->
        <div
          v-if="selectedClientId === 'new'"
          class="bg-gray-50 p-4 rounded-lg border"
        >
          <h4 class="font-medium mb-3">Yangi mijoz ma'lumotlari</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Ism *</label
              >
              <input
                v-model="newClient.name"
                type="text"
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Telefon *</label
              >
              <input
                v-model="newClient.phone"
                type="tel"
                required
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Email</label
              >
              <input
                v-model="newClient.email"
                type="email"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- Tanlangan mijoz ma'lumotlari -->
        <div
          v-else-if="selectedClient"
          class="bg-blue-50 p-4 rounded-lg border border-blue-200"
        >
          <h4 class="font-medium text-blue-800 mb-2">Tanlangan mijoz</h4>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span class="font-medium">Ism:</span> {{ selectedClient.name }}
            </div>
            <div>
              <span class="font-medium">Telefon:</span>
              {{ selectedClient.phone }}
            </div>
            <div>
              <span class="font-medium">Email:</span>
              {{ selectedClient.email || "Mavjud emas" }}
            </div>
          </div>
        </div>
      </div>

      <!-- Qo'shimcha ma'lumotlar -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Qo'shimcha izohlar</label
        >
        <textarea
          v-model="bookingNotes"
          rows="3"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        ></textarea>
      </div>

      <!-- Xatolik xabari -->
      <div
        v-if="errorMessage"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      >
        {{ errorMessage }}
      </div>

      <!-- Tasdiqlash tugmasi -->
      <div class="flex justify-end">
        <button
          @click="confirmBooking"
          :disabled="!isFormValid || bookingLoading"
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="bookingLoading" class="animate-spin inline-block mr-2"
            >⟳</span
          >
          {{ bookingLoading ? "Bron qilinmoqda..." : "Bronni Tasdiqlash" }}
        </button>
      </div>
    </div>

    <!-- Hech qanday xona topilmaganda -->
    <div
      v-else-if="
        !loading && searchParams.arrival_date && searchParams.departure_date
      "
      class="bg-white p-6 rounded-lg shadow text-center"
    >
      <i class="fas fa-bed text-4xl text-gray-300 mb-3"></i>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">
        Hech qanday bo'sh xona topilmadi
      </h3>
      <p class="text-gray-600 mb-4">
        {{ formatDate(searchParams.arrival_date) }} -
        {{ formatDate(searchParams.departure_date) }} oralig'ida barcha xonalar
        band
      </p>
      <button
        @click="resetSearch"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Boshqa Sana Tanlash
      </button>
    </div>

    <!-- Dastlabki ko'rinish -->
    <div v-else class="bg-white p-6 rounded-lg shadow text-center">
      <i class="fas fa-calendar-alt text-4xl text-gray-300 mb-3"></i>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Xona Bron Qilish</h3>
      <p class="text-gray-600">
        Iltimos, bron qilish uchun sana va vaqtni tanlang
      </p>
    </div>

    <!-- Mijozlarni qidirish modali -->
    <div
      v-if="showClientModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white"
      >
        <div class="flex justify-between items-center pb-3 border-b">
          <h3 class="text-xl font-semibold">Mijozlarni Qidirish</h3>
          <button
            @click="showClientModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="my-4">
          <div class="relative">
            <input
              v-model="clientSearch"
              type="text"
              placeholder="Mijoz ismi yoki telefon raqami bo'yicha qidiring..."
              class="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>

        <div class="max-h-60 overflow-y-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Ism
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Telefon
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  Harakat
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="client in filteredClients" :key="client.id">
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ client.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ client.phone }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    @click="selectClientFromModal(client)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Tanlash
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            v-if="filteredClients.length === 0"
            class="text-center py-4 text-gray-500"
          >
            Hech qanday mijoz topilmadi
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, onMounted } from "vue";
import { useBookingStore } from "@/stores/bookings";
import { useRoomStore } from "@/stores/rooms";
import { useClientStore } from "@/stores/clients";

export default {
  name: "RoomBooking",
  setup() {
    const bookingStore = useBookingStore();
    const roomStore = useRoomStore();
    const clientStore = useClientStore();

    const searchParams = reactive({
      arrival_date: "",
      departure_date: "",
    });

    const availableRooms = ref([]);
    const selectedRoom = ref(null);
    const loading = ref(false);
    const bookingLoading = ref(false);
    const errorMessage = ref("");
    const showClientModal = ref(false);
    const clientSearch = ref("");

    const selectedClientId = ref("");
    const bookingNotes = ref("");

    const newClient = reactive({
      name: "",
      phone: "",
      email: "",
    });

    const minDate = new Date().toISOString().split("T")[0];

    // Kechalar sonini hisoblash
    const stayDays = computed(() => {
      if (!searchParams.arrival_date || !searchParams.departure_date) return 0;
      const arrival = new Date(searchParams.arrival_date);
      const departure = new Date(searchParams.departure_date);
      const diffTime = departure - arrival;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    });

    // Tanlangan mijoz
    const selectedClient = computed(() => {
      if (!selectedClientId.value || selectedClientId.value === "new")
        return null;
      return clientStore.clients.find(
        (client) => client.id == selectedClientId.value
      );
    });

    // Filtrlangan mijozlar
    const filteredClients = computed(() => {
      if (!clientSearch.value) return clientStore.clients;

      const searchTerm = clientSearch.value.toLowerCase();
      return clientStore.clients.filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm) ||
          client.phone.includes(searchTerm)
      );
    });

    // Form to'g'ri to'ldirilganligini tekshirish
    const isFormValid = computed(() => {
      // Agar yangi mijoz tanlangan bo'lsa
      if (selectedClientId.value === "new") {
        return newClient.name && newClient.phone;
      }

      // Agar mavjud mijoz tanlangan bo'lsa
      return !!selectedClientId.value;
    });

    // Xona turini matnga aylantirish
    const roomTypeText = (type) => {
      const types = {
        standard: "Standard",
        lux: "Lyuks",
        vip: "VIP",
        deluxe: "Deluxe",
      };
      return types[type] || type;
    };

    // Xona rasmini olish
    const getRoomImage = (room) => {
      return room.images && room.images.length > 0
        ? room.images[0]
        : "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80";
    };

    // Sana formatlash
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("uz-UZ");
    };

    // Mijoz tanlaganda
    const onClientSelect = () => {
      if (selectedClientId.value !== "new") {
        // Yangi mijoz ma'lumotlarini tozalash
        Object.assign(newClient, {
          name: "",
          phone: "",
          email: "",
        });
      }
    };

    // Modaldan mijoz tanlash
    const selectClientFromModal = (client) => {
      selectedClientId.value = client.id;
      showClientModal.value = false;
      clientSearch.value = "";
    };

    // Bo'sh xonalarni qidirish
    const findAvailableRooms = async () => {
      if (!searchParams.arrival_date || !searchParams.departure_date) return;

      loading.value = true;
      errorMessage.value = "";
      selectedRoom.value = null;

      try {
        // BookingStore orqali bo'sh xonalarni qidirish
        const response = await bookingStore.checkAvailability(
          searchParams.arrival_date,
          searchParams.departure_date
        );

        // Agar API dan bo'sh xonalar ro'yxati qaytsa
        if (response.data && response.data.availableRooms) {
          availableRooms.value = response.data.availableRooms;
        } else {
          // Agar API faqat mavjudlikni tekshirsa, barcha xonalarni olish
          const allRooms = roomStore.rooms || [];

          // Band xonalarni aniqlash
          const bookedRoomIds = bookingStore.bookings
            .filter((booking) => {
              if (booking.status === "cancelled") return false;

              const bookingArrival = new Date(booking.arrival_date);
              const bookingDeparture = new Date(booking.departure_date);
              const selectedArrival = new Date(searchParams.arrival_date);
              const selectedDeparture = new Date(searchParams.departure_date);

              // Sana to'qnashuvini tekshirish
              return (
                selectedArrival <= bookingDeparture &&
                selectedDeparture >= bookingArrival
              );
            })
            .map((booking) => booking.xona_id || booking.roomId);

          // Band bo'lmagan xonalarni filtrlash
          availableRooms.value = allRooms.filter(
            (room) => !bookedRoomIds.includes(room.id)
          );
        }
      } catch (error) {
        console.error("Xonalarni qidirishda xatolik:", error);
        errorMessage.value =
          "Xonalarni qidirishda xatolik yuz berdi. Iltimos, qayta urunib ko'ring.";
      } finally {
        loading.value = false;
      }
    };

    // Xonani tanlash
    const selectRoom = (room) => {
      selectedRoom.value = room;
    };

    // Qidiruvni qayta boshlash
    const resetSearch = () => {
      searchParams.arrival_date = "";
      searchParams.departure_date = "";
      availableRooms.value = [];
      selectedRoom.value = null;
      selectedClientId.value = "";
      bookingNotes.value = "";
    };

    // Bronni tasdiqlash
    const confirmBooking = async () => {
      if (!selectedRoom.value) return;

      bookingLoading.value = true;
      errorMessage.value = "";

      try {
        let clientId = selectedClientId.value;

        // Agar yangi mijoz qo'shilsa
        if (selectedClientId.value === "new") {
          // Yangi mijoz yaratish
          const newClientResponse = await clientStore.createClient(newClient);
          clientId = newClientResponse.data.id;
        }

        const bookingData = {
          client_id: clientId,
          xona_id: selectedRoom.value.id,
          arrival_date: searchParams.arrival_date,
          departure_date: searchParams.departure_date,
          total_price: selectedRoom.value.price * stayDays.value,
          status: "pending",
          payment_status: "pending",
          notes: bookingNotes.value,
        };

        // BookingStore orqali bron qilish
        await bookingStore.createBooking(bookingData);

        // Muvaffaqiyatli xabar
        alert("Bron muvaffaqiyatli amalga oshirildi!");

        // Formani tozalash
        resetSearch();
        Object.assign(newClient, {
          name: "",
          phone: "",
          email: "",
        });
      } catch (error) {
        console.error("Bron qilishda xatolik:", error);
        errorMessage.value =
          error.message ||
          "Bron qilishda xatolik yuz berdi. Iltimos, qayta urunib ko'ring.";
      } finally {
        bookingLoading.value = false;
      }
    };

    // Dastlabki ma'lumotlarni yuklash
    onMounted(async () => {
      try {
        // Bronlarni, xonalarni va mijozlarni yuklash
        await Promise.all([
          bookingStore.fetchBookings(),
          roomStore.fetchRooms?.(),
          clientStore.fetchClients?.(),
        ]);
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      }
    });

    return {
      searchParams,
      availableRooms,
      selectedRoom,
      loading,
      bookingLoading,
      errorMessage,
      showClientModal,
      clientSearch,
      selectedClientId,
      selectedClient,
      newClient,
      bookingNotes,
      minDate,
      stayDays,
      filteredClients,
      isFormValid,
      roomTypeText,
      getRoomImage,
      formatDate,
      onClientSelect,
      selectClientFromModal,
      findAvailableRooms,
      selectRoom,
      resetSearch,
      confirmBooking,
    };
  },
};
</script>
