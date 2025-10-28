<template>
  <div class="min-h-screen bg-white">
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
      ></div>
    </div>

    <div v-else-if="room" class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <router-link to="/" class="hover:text-blue-500"
              >Bosh Sahifa</router-link
            >
          </li>
          <li class="flex items-center">
            <i class="fas fa-chevron-right text-xs mx-2"></i>
            <router-link to="/rooms" class="hover:text-blue-500"
              >Xonalar</router-link
            >
          </li>
          <li class="flex items-center">
            <i class="fas fa-chevron-right text-xs mx-2"></i>
            <span class="text-gray-400">Xona {{ room.numbers }}</span>
          </li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <!-- Images Gallery -->
        <div>
          <!-- Main Image -->
          <div class="mb-4 rounded-xl overflow-hidden">
            <img
              :src="getImageUrl(mainImage)"
              :alt="`Xona ${room.numbers}`"
              class="w-full h-96 object-cover"
            />
          </div>

          <!-- Thumbnails -->
          <div class="grid grid-cols-4 gap-2">
            <img
              v-for="(image, index) in room.images"
              :key="image.id"
              :src="getImageUrl(image)"
              :alt="`Xona ${room.numbers} - ${index + 1}`"
              @click="mainImage = image"
              class="h-20 object-cover rounded-lg cursor-pointer border-2 transition"
              :class="
                mainImage.id === image.id
                  ? 'border-blue-500'
                  : 'border-transparent'
              "
            />
          </div>
        </div>

        <!-- Room Details -->
        <div>
          <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">
              Xona {{ room.numbers }}
            </h1>
            <div class="flex items-center space-x-4 mb-4">
              <span
                class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {{ getRoomType(room.tur) }}
              </span>
              <span
                v-if="room.status !== 'empty'"
                class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold"
              >
                {{ getStatusText(room.status) }}
              </span>
            </div>
            <p class="text-3xl font-bold text-blue-500 mb-2">
              ${{ room.price }}
              <span class="text-lg text-gray-500 font-normal">/ kecha</span>
            </p>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-3">Tavsif</h3>
            <p class="text-gray-600 leading-relaxed">
              {{
                room.description ||
                "Qulay va zamonaviy xona barcha qulayliklar bilan jihozlangan."
              }}
            </p>
          </div>

          <!-- Room Features -->
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-3">
              Xususiyatlar
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center space-x-3">
                <i class="fas fa-user-friends text-blue-500"></i>
                <span class="text-gray-600"
                  >{{ room.capacity }} kishi sig'im</span
                >
              </div>
              <div class="flex items-center space-x-3">
                <i class="fas fa-bed text-blue-500"></i>
                <span class="text-gray-600"
                  >{{ getBedCount(room.capacity) }} yotoq</span
                >
              </div>
              <div class="flex items-center space-x-3">
                <i class="fas fa-ruler-combined text-blue-500"></i>
                <span class="text-gray-600">25 m² maydon</span>
              </div>
              <div class="flex items-center space-x-3">
                <i class="fas fa-bath text-blue-500"></i>
                <span class="text-gray-600">Shaxsiy hammom</span>
              </div>
            </div>
          </div>

          <!-- Amenities -->
          <div class="mb-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-3">
              Qulayliklar
            </h3>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="amenity in room.AmenitiesRoom || []"
                :key="amenity.id"
                class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm"
              >
                <i class="fas fa-check text-green-500 mr-2"></i>
                {{ amenity.Amenities?.name }}
              </span>
            </div>
          </div>

          <!-- Booking Button -->
          <button
            v-if="room.status === 'empty'"
            @click="handleBookRoom"
            class="w-full bg-blue-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center space-x-2"
          >
            <i class="fas fa-calendar-check"></i>
            <span>Bron Qilish</span>
          </button>

          <div
            v-else
            class="w-full bg-gray-300 text-gray-600 py-4 rounded-lg text-lg font-semibold text-center"
          >
            Hozirda Band
          </div>
        </div>
      </div>

      <!-- Similar Rooms -->
      <div
        v-if="similarRooms.length > 0"
        class="border-t border-gray-200 pt-12"
      >
        <h2 class="text-2xl font-bold text-gray-800 mb-6">O'xshash Xonalar</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RoomCard
            v-for="similarRoom in similarRooms"
            :key="similarRoom.id"
            :room="similarRoom"
            @book="handleBookRoom"
          />
        </div>
      </div>
    </div>

    <!-- Room Not Found -->
    <div
      v-else
      class="flex flex-col items-center justify-center min-h-screen text-center"
    >
      <i class="fas fa-door-closed text-6xl text-gray-300 mb-4"></i>
      <h1 class="text-2xl font-bold text-gray-600 mb-2">Xona Topilmadi</h1>
      <p class="text-gray-500 mb-6">
        So'ralgan xona mavjud emas yoki o'chirilgan
      </p>
      <router-link
        to="/rooms"
        class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Barcha Xonalarni Ko'rish
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRoomStore } from "@/stores/rooms";
const BASE_URL = inject("BASE_URL");
import RoomCard from "@/components/common/RoomCard.vue";

const route = useRoute();
const router = useRouter();
const roomStore = useRoomStore();

const loading = ref(true);
const room = ref(null);
const mainImage = ref(null);

// Computed properties
const similarRooms = computed(() => {
  if (!room.value) return [];

  return roomStore.rooms
    .filter(
      (r) =>
        r.id !== room.value.id &&
        r.tur === room.value.tur &&
        r.status === "empty"
    )
    .slice(0, 3);
});

// Methods
const getImageUrl = (image) => {
  if (!image) return "/images/room-placeholder.jpg";
  return image.image_url.startsWith("http")
    ? image.image_url
    : `${BASE_URL}/img/${image.image_url}`;
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

const getStatusText = (status) => {
  const statusMap = {
    empty: "Bo'sh",
    busy: "Band",
    maintenance: "Ta'mirlanmoqda",
    cleaning_need: "Tozalanmoqda",
  };
  return statusMap[status] || status;
};

const getBedCount = (capacity) => {
  return Math.ceil(capacity / 2);
};

const handleBookRoom = () => {
  router.push(`/booking?room=${room.value.id}`);
};

// Lifecycle
onMounted(async () => {
  const roomId = parseInt(route.params.id);

  try {
    await roomStore.fetchRooms();
    room.value = roomStore.rooms.find((r) => r.id === roomId);

    if (room.value && room.value.images.length > 0) {
      mainImage.value = room.value.images[0];
    }
  } catch (error) {
    console.error("Error loading room details:", error);
  } finally {
    loading.value = false;
  }
});
</script>
