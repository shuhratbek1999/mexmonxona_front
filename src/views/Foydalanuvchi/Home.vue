<template>
  <div class="min-h-screen bg-white">
    <!-- Navbar -->
    <Navbar />

    <!-- Hero Section -->
    <section
      class="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
    >
      <!-- Animated Background -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-black/40 z-10"></div>
        <div
          class="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 animate-ken-burns"
          style="
            background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
          "
        ></div>

        <!-- Floating elements -->
        <div
          class="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full animate-float-1"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-6 h-6 bg-blue-400 rounded-full animate-float-2"
        ></div>
        <div
          class="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float-3"
        ></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
        <div class="animate-fade-in-up">
          <h1
            class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Sifat va Qulaylik
            <span
              class="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Bir Joyda
            </span>
          </h1>
          <p
            class="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90"
          >
            Bizning mehmonxonamizda unutilmas dam olish tajribasini kuting.
            <span class="block mt-2"
              >Zamonaviy qulayliklar va mehribon xizmat.</span
            >
          </p>
        </div>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300"
        >
          <router-link
            to="/rooms"
            class="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 min-w-[200px]"
          >
            <span class="relative z-10">Xonalarni Ko'rish</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </router-link>

          <router-link
            to="/booking"
            class="group relative border-2 border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-semibold backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 min-w-[200px]"
          >
            <span class="relative z-10">Bron Qilish</span>
          </router-link>
        </div>

        <!-- Scroll indicator -->
        <div
          class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <div
            class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <div
              class="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Actions Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Quick Action Card 1 -->
          <div
            class="group text-center p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
          >
            <div
              class="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i class="fas fa-bed text-white text-2xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">
              Xona Bron Qilish
            </h3>
            <p class="text-gray-600 mb-6">O'zingizga mos xonani bron qiling</p>
            <router-link
              to="/booking"
              class="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              Bron qilish
              <i
                class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
              ></i>
            </router-link>
          </div>

          <!-- Quick Action Card 2 -->
          <div
            class="group text-center p-8 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
          >
            <div
              class="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i class="fas fa-calendar-check text-white text-2xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">
              Mening Bronlarim
            </h3>
            <p class="text-gray-600 mb-6">Barcha bronlaringizni boshqaring</p>
            <router-link
              to="/user_booking"
              class="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
            >
              Ko'rish
              <i
                class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
              ></i>
            </router-link>
          </div>

          <!-- Quick Action Card 3 -->
          <div
            class="group text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-100 hover:from-purple-100 hover:to-pink-200 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
          >
            <div
              class="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
            >
              <i class="fas fa-concierge-bell text-white text-2xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Maxsus So'rov</h3>
            <p class="text-gray-600 mb-6">Maxsus ehtiyojlaringizni bildiring</p>
            <a
              href="#"
              class="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold"
            >
              So'rov yuborish
              <i
                class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
              ></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section
      class="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      <!-- Background decoration -->
      <div
        class="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"
      ></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-16 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nima Uchun
            <span
              class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              >Bizni</span
            >
            Tanlaysiz?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Biz mijozlarimiz qulayligi va mamnunligi uchun doim yangilanishdamiz
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="feature.id"
            class="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 animate-fade-in-up"
            :style="`animation-delay: ${index * 150}ms`"
          >
            <!-- Hover effect background -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>

            <div class="relative z-10">
              <div
                class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
              >
                <i :class="feature.icon" class="text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 text-center leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Rooms -->
    <section class="py-20 bg-white relative overflow-hidden">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Mashhur
            <span
              class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              >Xonalar</span
            >
          </h2>
          <p class="text-xl text-gray-600">
            Eng yaxshi takliflarimiz bilan tanishing
          </p>
        </div>

        <!-- Loading spinner -->
        <div v-if="loading" class="flex justify-center">
          <div class="relative">
            <div
              class="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"
            ></div>
            <div
              class="w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full absolute top-0 animate-spin"
            ></div>
          </div>
        </div>

        <!-- Rooms grid -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <RoomCard
            v-for="(room, index) in featuredRooms"
            :key="room.id"
            :room="room"
            @book="handleBookRoom"
            class="animate-fade-in-up"
            :style="`animation-delay: ${index * 100}ms`"
          />
        </div>

        <!-- View all button -->
        <div class="text-center mt-12 animate-fade-in-up">
          <router-link
            to="/rooms"
            class="group inline-flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            Barcha Xonalarni Ko'rish
            <i
              class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"
            ></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Statistics -->
    <section
      class="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white relative overflow-hidden"
    >
      <!-- Animated background -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-full h-1/2 bg-white/10"></div>
        <div
          class="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2"
        ></div>
        <div
          class="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2"
        ></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div
            v-for="(stat, index) in statistics"
            :key="stat.id"
            class="animate-fade-in-up"
            :style="`animation-delay: ${index * 150}ms`"
          >
            <div
              class="text-4xl md:text-6xl font-bold mb-3 text-white drop-shadow-lg"
            >
              {{ stat.value }}
            </div>
            <div class="text-lg md:text-xl text-blue-100 font-medium">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Tizimga kirishingiz bormi?
        </h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Profilingizga kiring va bronlaringizni boshqaring yoki yangi xona bron
          qiling
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/user_booking"
            class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Mening Bronlarimni Ko'rish
          </router-link>
          <router-link
            to="/booking"
            class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Yangi Bron Qilish
          </router-link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoomStore } from "@/stores/rooms";
import RoomCard from "@/components/common/RoomCard.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const roomStore = useRoomStore();
const loading = ref(false);
const featuredRooms = ref([]);

const features = [
  {
    id: 1,
    icon: "fas fa-wifi",
    title: "Tez Wi-Fi",
    description: "Barcha xonalarda bepul va tez internet tarmog'i",
  },
  {
    id: 2,
    icon: "fas fa-utensils",
    title: "Restoran",
    description: "Har xil turdagi ovqatlar va milliy taomlar",
  },
  {
    id: 3,
    icon: "fas fa-concierge-bell",
    title: "24/7 Xizmat",
    description: "Kunduzi va kechasi xizmat ko'rsatish",
  },
];

const statistics = [
  { id: 1, value: "50+", label: "Xonalar" },
  { id: 2, value: "1000+", label: "Mamnun Mijozlar" },
  { id: 3, value: "5", label: "Yulduzli Xizmat" },
  { id: 4, value: "24/7", label: "Qo'llab-quvvatlash" },
];

const handleBookRoom = (room) => {
  window.location.href = `/booking?room=${room.id}`;
};

onMounted(async () => {
  loading.value = true;
  try {
    await roomStore.fetchRooms();
    featuredRooms.value = roomStore.availableRooms.slice(0, 3);
  } catch (error) {
    console.error("Error loading featured rooms:", error);
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

@keyframes kenBurns {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes float1 {
  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes float2 {
  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(15px) translateX(-15px);
  }
}

@keyframes float3 {
  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-10px) translateX(-10px);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-ken-burns {
  animation: kenBurns 20s ease-in-out infinite alternate;
}

.animate-float-1 {
  animation: float1 6s ease-in-out infinite;
}

.animate-float-2 {
  animation: float2 8s ease-in-out infinite;
}

.animate-float-3 {
  animation: float3 10s ease-in-out infinite;
}

.delay-300 {
  animation-delay: 300ms;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Glass morphism effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
