<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <Navbar />

    <!-- Hero Section -->
    <section
      class="relative py-24 bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden"
    >
      <!-- Background Animation -->
      <div class="absolute inset-0">
        <div
          class="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse-slow"
          style="animation-delay: 1s"
        ></div>
      </div>

      <div class="relative container mx-auto px-4 text-center">
        <div class="animate-fade-in-up">
          <h1
            class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
          >
            Xonalarimiz
          </h1>
          <p
            class="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 leading-relaxed"
          >
            Turli turdagi qulay xonalarimiz bilan tanishing va o'zingizga mosini
            tanlang
          </p>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="py-12 relative">
      <div class="container mx-auto px-4">
        <div
          class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 lg:p-8 animate-fade-in-up"
        >
          <!-- Mobile Filter Toggle -->
          <div class="lg:hidden mb-6">
            <button
              @click="showMobileFilters = !showMobileFilters"
              class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-2xl font-semibold flex items-center justify-center space-x-3"
            >
              <i class="fas fa-filter"></i>
              <span>Filtrlarni Ko'rsatish</span>
              <i
                class="fas fa-chevron-down transition-transform duration-300"
                :class="{ 'rotate-180': showMobileFilters }"
              ></i>
            </button>
          </div>

          <!-- Filters Grid -->
          <div
            class="grid grid-cols-1 lg:grid-cols-5 gap-6"
            :class="{
              'hidden lg:grid': !showMobileFilters,
              block: showMobileFilters,
            }"
          >
            <!-- Room Type Filter -->
            <div class="group">
              <label
                class="block text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2"
              >
                <i class="fas fa-bed text-blue-500"></i>
                <span>Xona Turi</span>
              </label>
              <div class="relative">
                <select
                  v-model="filters.roomType"
                  class="w-full bg-gray-50/80 border border-gray-300 rounded-2xl px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300 appearance-none"
                >
                  <option value="">Hamma Turlar</option>
                  <option value="standart">Standard</option>
                  <option value="lyuks">Lyuks</option>
                  <option value="president">VIP</option>
                  <option value="premium">Premium</option>
                </select>
                <i
                  class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                ></i>
              </div>
            </div>

            <!-- Price Range -->
            <div class="group">
              <label
                class="block text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2"
              >
                <i class="fas fa-tag text-green-500"></i>
                <span>Narx Oralig'i</span>
              </label>
              <div class="relative">
                <select
                  v-model="filters.priceRange"
                  class="w-full bg-gray-50/80 border border-gray-300 rounded-2xl px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300 appearance-none"
                >
                  <option value="">Hamma Narxlar</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200+">$200+</option>
                </select>
                <i
                  class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                ></i>
              </div>
            </div>

            <!-- Capacity -->
            <div class="group">
              <label
                class="block text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2"
              >
                <i class="fas fa-users text-purple-500"></i>
                <span>Sig'im</span>
              </label>
              <div class="relative">
                <select
                  v-model="filters.capacity"
                  class="w-full bg-gray-50/80 border border-gray-300 rounded-2xl px-4 py-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300 appearance-none"
                >
                  <option value="">Hamma Sig'im</option>
                  <option value="1">1 kishi</option>
                  <option value="2">2 kishi</option>
                  <option value="3">3 kishi</option>
                  <option value="4">4+ kishi</option>
                </select>
                <i
                  class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                ></i>
              </div>
            </div>

            <!-- Search -->
            <div class="group">
              <label
                class="block text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2"
              >
                <i class="fas fa-search text-orange-500"></i>
                <span>Qidiruv</span>
              </label>
              <div class="relative">
                <input
                  v-model="filters.search"
                  type="text"
                  placeholder="Xona raqami yoki nomi..."
                  class="w-full bg-gray-50/80 border border-gray-300 rounded-2xl px-4 py-3 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
                />
                <i
                  class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                ></i>
                <button
                  v-if="filters.search"
                  @click="filters.search = ''"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>

            <!-- Filter Actions -->
            <div class="flex lg:flex-col space-y-3 lg:justify-end">
              <div
                class="text-sm text-gray-600 flex items-center lg:justify-center"
              >
                <i class="fas fa-door-open mr-2"></i>
                {{ filteredRooms.length }} ta xona
              </div>
              <button
                @click="resetFilters"
                class="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 lg:w-full"
              >
                <i class="fas fa-redo"></i>
                <span class="hidden lg:inline">Tozalash</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Rooms Section -->
    <section class="py-12 relative">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="text-center">
            <div class="relative">
              <div
                class="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"
              ></div>
              <div
                class="w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full absolute top-0 animate-spin"
              ></div>
            </div>
            <p class="text-gray-600 mt-4 text-lg">Xonalar yuklanmoqda...</p>
          </div>
        </div>

        <!-- Rooms Grid -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          <div
            v-for="(room, index) in filteredRooms"
            :key="room.id"
            class="animate-fade-in-up"
            :style="`animation-delay: ${index * 100}ms`"
          >
            <RoomCard :room="room" @book="handleBookRoom" />
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="!loading && filteredRooms.length === 0"
          class="text-center py-20 animate-fade-in-up"
        >
          <div class="max-w-md mx-auto">
            <div
              class="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <i class="fas fa-door-open text-4xl text-gray-400"></i>
            </div>
            <h3 class="text-2xl font-semibold text-gray-600 mb-4">
              Xonalar Topilmadi
            </h3>
            <p class="text-gray-500 mb-6 leading-relaxed">
              Filtr shartlariga mos xonalar mavjud emas. Iltimos, filtrlarni
              o'zgartiring yoki barcha xonalarni ko'rish uchun quyidagi tugmani
              bosing.
            </p>
            <button
              @click="resetFilters"
              class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
            >
              <i class="fas fa-redo"></i>
              <span>Barcha Xonalarni Ko'rsatish</span>
            </button>
          </div>
        </div>

        <!-- Load More Button (if needed) -->
        <div
          v-if="!loading && filteredRooms.length > 0"
          class="text-center mt-12 animate-fade-in-up"
        >
          <button
            @click="loadMore"
            class="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
          >
            <i class="fas fa-plus"></i>
            <span>Ko'proq Xonalarni Ko'rsatish</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white relative overflow-hidden">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Nima Uchun
            <span
              class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              >Bizni</span
            >
            Tanlaysiz?
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="feature.id"
            class="text-center animate-fade-in-up"
            :style="`animation-delay: ${index * 150}ms`"
          >
            <div
              class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300 shadow-lg"
            >
              <i :class="feature.icon" class="text-white text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoomStore } from "@/stores/rooms";
import RoomCard from "@/components/common/RoomCard.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const roomStore = useRoomStore();
const loading = ref(false);
const showMobileFilters = ref(false);

const filters = ref({
  roomType: "",
  priceRange: "",
  capacity: "",
  search: "",
});

const features = [
  {
    id: 1,
    icon: "fas fa-shield-alt",
    title: "Xavfsizlik Kafolati",
    description:
      "Barcha xonalarimiz zamonaviy xavfsizlik tizimlari bilan jihozlangan",
  },
  {
    id: 2,
    icon: "fas fa-concierge-bell",
    title: "24/7 Xizmat",
    description: "Kunduzi va kechasi doim xizmat ko'rsatish",
  },
  {
    id: 3,
    icon: "fas fa-wifi",
    title: "Tez Internet",
    description: "Barcha xonalarda bepul yuqori tezlikdagi Wi-Fi",
  },
];

// Computed property for filtered rooms
const filteredRooms = computed(() => {
  let rooms = roomStore.rooms.filter((room) => room.status === "empty");

  // Filter by room type
  if (filters.value.roomType) {
    rooms = rooms.filter((room) => room.tur === filters.value.roomType);
  }

  // Filter by price range
  if (filters.value.priceRange) {
    const [min, max] = filters.value.priceRange.split("-");
    if (max === "+") {
      rooms = rooms.filter((room) => room.price >= parseInt(min));
    } else {
      rooms = rooms.filter(
        (room) => room.price >= parseInt(min) && room.price <= parseInt(max)
      );
    }
  }

  // Filter by capacity
  if (filters.value.capacity) {
    const capacity = parseInt(filters.value.capacity);
    rooms = rooms.filter((room) => room.capacity >= capacity);
  }

  // Filter by search
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    rooms = rooms.filter(
      (room) =>
        room.numbers.toLowerCase().includes(searchTerm) ||
        room.description?.toLowerCase().includes(searchTerm)
    );
  }

  return rooms;
});

const handleBookRoom = (room) => {
  window.location.href = `/booking?room=${room.id}`;
};

const resetFilters = () => {
  filters.value = {
    roomType: "",
    priceRange: "",
    capacity: "",
    search: "",
  };
};

const loadMore = () => {
  // Implement load more functionality if needed
  console.log("Loading more rooms...");
};

onMounted(async () => {
  loading.value = true;
  try {
    await roomStore.fetchRooms();
  } catch (error) {
    console.error("Error loading rooms:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseSlow {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.animate-pulse-slow {
  animation: pulseSlow 3s ease-in-out infinite;
}

/* Custom styles for select dropdown */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Hide default dropdown arrow for custom styling */
select::-ms-expand {
  display: none;
}

/* Responsive improvements */
@media (max-width: 1024px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 768px) {
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }
}

/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
