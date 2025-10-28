<template>
  <div
    class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group"
  >
    <!-- Image -->
    <div class="relative overflow-hidden">
      <img
        :src="getImageUrl(room.images[0])"
        :alt="`Xona ${room.numbers}`"
        class="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
      />
      <div
        class="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
      >
        ${{ room.price }} / kecha
      </div>
      <div
        v-if="room.status !== 'empty'"
        class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
      >
        {{ getStatusText(room.status) }}
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-xl font-semibold text-gray-800">
          Xona {{ room.numbers }}
        </h3>
        <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
          {{ getRoomType(room.tur) }}
        </span>
      </div>

      <p class="text-gray-600 mb-4 line-clamp-2">
        {{ room.description || "Qulay va zamonaviy xona" }}
      </p>

      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4 text-sm text-gray-500">
          <div class="flex items-center space-x-1">
            <i class="fas fa-user-friends"></i>
            <span>{{ room.capacity }} kishi</span>
          </div>
          <div class="flex items-center space-x-1">
            <i class="fas fa-bed"></i>
            <span>{{ getBedCount(room.capacity) }} yotoq</span>
          </div>
        </div>
      </div>

      <!-- Amenities -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="amenity in room.AmenitiesRoom?.slice(0, 3) || []"
          :key="amenity.id"
          class="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs"
        >
          {{ amenity.Amenities?.name }}
        </span>
        <span
          v-if="room.AmenitiesRoom?.length > 3"
          class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
        >
          +{{ room.AmenitiesRoom.length - 3 }}
        </span>
      </div>

      <!-- Actions -->
      <div class="flex space-x-3">
        <router-link
          :to="`/rooms/${room.id}`"
          class="flex-1 bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Batafsil
        </router-link>
        <button
          v-if="room.status === 'empty'"
          @click="$emit('book', room)"
          class="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Bron Qilish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";

defineProps({
  room: {
    type: Object,
    required: true,
  },
});
const BASE_URL = inject("BASE_URL");
defineEmits(["book"]);

const getImageUrl = (image) => {
  // console.log(image);
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
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
