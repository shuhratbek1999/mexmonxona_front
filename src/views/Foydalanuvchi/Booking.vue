<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />

    <div class="flex flex-1 container mx-auto px-4 py-8 gap-8">
      <!-- Left Side -->
      <div class="w-full lg:w-1/2 space-y-6">
        <!-- Booking Form -->
        <div class="bg-white p-6 rounded-2xl shadow-lg">
          <h2 class="text-2xl font-semibold mb-4">Sanani tanlang</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Kelish sanasi</label
              >
              <input
                type="date"
                v-model="booking.checkin"
                class="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Ketish sanasi</label
              >
              <input
                type="date"
                v-model="booking.checkout"
                class="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div v-if="!queryRoomExists" class="mb-4">
            <label class="block text-sm font-medium text-gray-700"
              >Xona turi</label
            >
            <select
              v-model="selectedRoomType"
              class="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Hamma</option>
              <option value="standart">Standard</option>
              <option value="lyuks">Lyuks</option>
              <option value="president">VIP</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <button
            @click="searchRooms"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
          >
            Xonalarni qidirish
          </button>
        </div>

        <!-- Available Rooms -->
        <div v-if="!queryRoomExists && availableRooms.length" class="space-y-4">
          <h3 class="text-xl font-semibold mb-2">Bo'sh xonalar</h3>
          <div
            v-for="room in availableRooms"
            :key="room.id"
            class="p-4 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer flex items-center gap-4"
            @click="selectRoom(room)"
          >
            <img
              :src="getImageUrl(room.images[0])"
              alt="room"
              class="w-20 h-20 object-cover rounded"
            />
            <div class="flex-1">
              <p class="font-semibold">
                Xona {{ room.numbers }} - {{ getRoomType(room.tur) }}
              </p>
              <p class="text-gray-500">${{ room.price }}/kecha</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side -->
      <div class="w-full lg:w-1/2">
        <div
          v-if="selectedRoom"
          class="bg-white p-6 rounded-2xl shadow-lg sticky top-4"
        >
          <h2 class="text-2xl font-semibold mb-4">Tanlangan xona</h2>
          <div class="flex flex-col md:flex-row gap-6">
            <img
              :src="getImageUrl(selectedRoom.images[0])"
              class="w-full md:w-48 h-48 object-cover rounded-lg"
            />
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-2">
                Xona {{ selectedRoom.numbers }}
              </h3>
              <p class="text-gray-600 mb-2">
                {{ getRoomType(selectedRoom.tur) }}
              </p>
              <p class="text-gray-700 mb-4">{{ selectedRoom.description }}</p>
              <p class="text-2xl font-bold text-blue-500">
                ${{ selectedRoom.price }}/kecha
              </p>
              <p class="mt-2">
                Sana: {{ booking.checkin }} - {{ booking.checkout }}
              </p>
              <p class="mt-2 font-bold text-blue-500">
                Jami: ${{ calculateTotal() }}
              </p>
              <button
                @click="confirmBooking"
                class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
        <div v-else class="bg-white p-6 rounded-2xl shadow-lg">
          <p class="text-gray-500">Xona tanlanmagan</p>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useRoomStore } from "@/stores/rooms";
import { useBookingStore } from "@/stores/bookings";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { useAlert } from "@/composables/useAlert";

const { alertState, showSuccess, showError, hideAlert } = useAlert();

const router = useRouter();
const route = useRoute();
const roomStore = useRoomStore();
const bookingStore = useBookingStore();

const BASE_URL = inject("BASE_URL");

const booking = ref({
  checkin: "",
  checkout: "",
  nights: 0,
});

const selectedRoomType = ref("");
const availableRooms = ref([]);
const selectedRoom = ref(null);
const queryRoomId = route.query.room;
const queryRoomExists = !!queryRoomId;

const getImageUrl = (image) => {
  return image
    ? `${BASE_URL}/img/${image.image_url}`
    : "https://via.placeholder.com/300x200";
};

const getRoomType = (type) => {
  const types = {
    standart: "Standard",
    lyuks: "Lyuks",
    president: "VIP",
    premium: "Premium",
  };
  return types[type] || type;
};

const searchRooms = () => {
  availableRooms.value = roomStore.rooms.filter((room) => {
    if (selectedRoomType.value && room.tur !== selectedRoomType.value)
      return false;
    return true;
  });
};

const selectRoom = (room) => {
  selectedRoom.value = room;
};

const calculateTotal = () => {
  if (!selectedRoom.value || !booking.value.checkin || !booking.value.checkout)
    return 0;
  const checkin = new Date(booking.value.checkin);
  const checkout = new Date(booking.value.checkout);
  booking.value.nights = Math.ceil(
    (checkout - checkin) / (1000 * 60 * 60 * 24)
  );
  return booking.value.nights * selectedRoom.value.price;
};

const confirmBooking = () => {
  if (!selectedRoom.value) {
    showError("Xona tanlanmagan", "Iltimos xona tanlang", 3000);
    return;
  }

  const data = {
    xona_id: selectedRoom.value.id,
    mijoz_id: Number(localStorage.getItem("userId")),
    arrival_date: booking.value.checkin,
    departure_date: booking.value.checkout,
    total_price: calculateTotal(),
    status: "pending",
    payment_status: "pending",
  };

  bookingStore.createBookingClient(data);
  showSuccess(
    "Muvaffaqiyatli",
    `Xona ${selectedRoom.value.numbers} band qilindi`,
    4000
  );
  setTimeout(() => router.push("/"), 4000);
};

onMounted(async () => {
  await roomStore.fetchRooms();

  if (queryRoomExists) {
    selectedRoom.value = roomStore.rooms.find(
      (r) => r.id === Number(queryRoomId)
    );
  } else {
    availableRooms.value = roomStore.rooms;
  }
});
</script>

<style scoped>
/* Qo'shimcha styling uchun bu yerga yozish mumkin */
</style>
