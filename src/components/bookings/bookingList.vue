<template>
  <div class="rooms-container">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="room in rooms" :key="room.id" class="room-card">
        <img :src="room.images[0]" :alt="room.name" class="room-image" />
        <div class="room-details">
          <h3 class="room-name">{{ room.name }}</h3>
          <p class="room-price">{{ room.price }} so'm / kecha</p>
          <div class="room-features">
            <span
              v-for="feature in room.features"
              :key="feature"
              class="feature-tag"
            >
              {{ feature }}
            </span>
          </div>
          <button @click="bookRoom(room)" class="book-btn">Bron qilish</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoomStore } from "@/stores/rooms";

const roomStore = useRoomStore();
const rooms = ref([]);

onMounted(async () => {
  await roomStore.fetchRooms();
  rooms.value = roomStore.rooms;
});

const bookRoom = (room) => {
  // Bron qilish logikasi
  console.log("Bron qilinayotgan xona:", room);
};
</script>

<style scoped>
.room-card {
  @apply bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow;
}
.room-image {
  @apply w-full h-48 object-cover;
}
.room-details {
  @apply p-4;
}
.room-name {
  @apply text-xl font-semibold text-gray-800;
}
.room-price {
  @apply text-lg text-green-600 font-bold my-2;
}
.feature-tag {
  @apply inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-2;
}
.book-btn {
  @apply w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors;
}
</style>
