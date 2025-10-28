<template>
  <div class="container mx-auto px-4 py-8">
    <Alert
      v-model:show="alertState.show"
      :type="alertState.type"
      :title="alertState.title"
      :message="alertState.message"
      :duration="alertState.duration"
      @close="hideAlert"
    />
    <h1 class="text-4xl font-bold text-center mb-8">Xona band qilish</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Booking form -->
      <div class="lg:col-span-2">
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-2xl font-semibold mb-4">Band qilish formasi</h2>
          <form @submit.prevent="submitBooking" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="checkin"
                  class="block text-sm font-medium text-gray-700"
                  >Kelish sanasi</label
                >
                <input
                  type="date"
                  id="checkin"
                  v-model="booking.checkin"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  for="checkout"
                  class="block text-sm font-medium text-gray-700"
                  >Ketish sanasi</label
                >
                <input
                  type="date"
                  id="checkout"
                  v-model="booking.checkout"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="adults"
                  class="block text-sm font-medium text-gray-700"
                  >Kattalar soni</label
                >
                <select
                  id="adults"
                  v-model="booking.adults"
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div>
                <label
                  for="children"
                  class="block text-sm font-medium text-gray-700"
                  >Bolalar soni</label
                >
                <select
                  id="children"
                  v-model="booking.children"
                  class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>

            <div>
              <label
                for="roomType"
                class="block text-sm font-medium text-gray-700"
                >Xona turi</label
              >
              <select
                id="roomType"
                v-model="booking.roomType"
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Hamma</option>
                <option value="standart">Standard</option>
                <option value="lyuks">Lyuks</option>
                <option value="president">VIP</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <button
              type="submit"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Xonalarni ko'rsatish
            </button>
          </form>
        </div>

        <!-- Available rooms -->
        <div class="mt-8">
          <h2 class="text-2xl font-semibold mb-4">Mavjud xonalar</h2>
          <div class="space-y-6">
            <div
              v-for="room in availableRooms"
              :key="room.id"
              class="bg-white p-6 rounded-lg shadow"
            >
              <div class="flex flex-col md:flex-row gap-6">
                <img
                  :src="getImageUrl(room.images[0])"
                  :alt="room.numbers"
                  class="w-full md:w-48 h-48 object-cover rounded"
                />
                <div class="flex-1">
                  <h3 class="text-xl font-semibold">Xona {{ room.numbers }}</h3>
                  <p class="text-gray-600 mb-2">{{ getRoomType(room.tur) }}</p>
                  <p class="text-gray-700 mb-4">{{ room.description }}</p>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-2xl font-bold text-blue-500">
                        ${{ room.price }}
                        <span class="text-sm text-gray-500">/ kecha</span>
                      </p>
                    </div>
                    <button
                      @click="selectRoom(room)"
                      class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Band qilish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking summary -->
      <div class="lg:col-span-1">
        <div class="bg-white p-6 rounded-lg shadow sticky top-4">
          <h2 class="text-2xl font-semibold mb-4">Band qilish</h2>
          <div v-if="selectedRoom">
            <div class="mb-4">
              <h3 class="font-semibold">Tanlangan xona:</h3>
              <p>
                Xona {{ selectedRoom.numbers }} -
                {{ getRoomType(selectedRoom.tur) }}
              </p>
            </div>
            <div class="mb-4">
              <h3 class="font-semibold">Sana:</h3>
              <p>{{ booking.checkin }} dan {{ booking.checkout }} gacha</p>
            </div>
            <div class="mb-4">
              <h3 class="font-semibold">Narx:</h3>
              <p class="text-2xl font-bold text-blue-500">
                ${{ calculateTotal() }}
              </p>
            </div>
            <button
              @click="confirmBooking"
              class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Tasdiqlash
            </button>
          </div>
          <div v-else>
            <p class="text-gray-500">Xona tanlanmagan</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from "vue";
import { useRoomStore } from "@/stores/rooms";
import { useBookingStore } from "@/stores/bookings";
import { useRouter } from "vue-router";
import Alert from "@/components/UI/Alert.vue";
import { useAlert } from "@/composables/useAlert";
const { alertState, showSuccess, showError, hideAlert } = useAlert();
const roomStore = useRoomStore();
const bookingStore = useBookingStore();
const router = useRouter();
const booking = ref({
  checkin: "",
  checkout: "",
  adults: 2,
  children: 0,
  roomType: "",
  nights: 0,
});
const selectedRoom = ref(null);
const availableRooms = ref([]);
const BASE_URL = inject("BASE_URL");
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

function submitBooking() {
  // Filtr qo'llash logikasi
  availableRooms.value = roomStore.availableRooms;

  if (booking.value.roomType) {
    availableRooms.value = availableRooms.value.filter(
      (room) => room.tur === booking.value.roomType
    );
  }
}

function selectRoom(room) {
  selectedRoom.value = room;
}

function calculateTotal() {
  if (!selectedRoom.value || !booking.value.checkin || !booking.value.checkout)
    return 0;

  const checkin = new Date(booking.value.checkin);
  const checkout = new Date(booking.value.checkout);
  booking.value.nights = Math.ceil(
    (checkout - checkin) / (1000 * 60 * 60 * 24)
  );

  return booking.value.nights * selectedRoom.value.price;
}

function confirmBooking() {
  try {
    if (!selectedRoom.value) {
      alert("Iltimos, xona tanlang!");
      return;
    }
    const bookingsData = {
      xona_id: selectedRoom.value?.id,
      mijoz_id: Number(localStorage.getItem("userId")),
      arrival_date: booking.value.checkin,
      departure_date: booking.value.checkout,
      total_price: calculateTotal(),
      status: "pending",
      payment_status: "pending",
    };

    bookingStore.createBookingClient(bookingsData);
    // Bron qilish logikasi
    showSuccess(
      "Muvaffaqiyatli!",
      `Xona ${selectedRoom.value.numbers} band qilindi`,
      4000
    );
    setTimeout(() => {
      router.push("/");
    }, 4000);
  } catch (err) {
    showError("Xatolik!", "Xonani band qilishda xatolik yuz berdi", 5000);
  }
}

onMounted(() => {
  roomStore.fetchRooms();
});
</script>
