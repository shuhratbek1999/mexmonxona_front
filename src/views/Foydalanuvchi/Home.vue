<template>
  <div class="min-h-screen bg-white">
    <!-- Navbar -->
    <Navbar />

    <!-- Hero Section -->
    <section
      class="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
    >
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-black/40 z-10"></div>
        <div
          class="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 animate-ken-burns"
          style="
            background-image: url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
          "
        ></div>
      </div>

      <div class="relative z-20 text-center text-white px-6 max-w-6xl mx-auto">
        <div class="animate-fade-in-up">
          <h1
            class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Comfort & Quality
            <span
              class="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              In One Place
            </span>
          </h1>
          <p
            class="text-xl md:text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto leading-relaxed opacity-90"
          >
            Enjoy an unforgettable stay at our modern hotel with exceptional
            amenities and friendly service.
          </p>
        </div>

        <div
          class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-300"
        >
          <router-link
            to="/rooms"
            class="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-5 rounded-3xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 min-w-[220px]"
          >
            <span class="relative z-10">View Rooms</span>
          </router-link>

          <router-link
            to="/booking"
            class="group relative border-2 border-white/30 text-white px-10 py-5 rounded-3xl text-lg font-semibold backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 min-w-[220px]"
          >
            <span class="relative z-10">Book Now</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Quick Actions Section -->
    <section class="py-32 bg-gray-50">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <QuickActionCard
            icon="fas fa-bed"
            title="Book a Room"
            subtitle="Choose the room that fits your needs"
            buttonText="Book Now"
            buttonLink="/booking"
            bgFrom="blue-50"
            bgTo="indigo-100"
            hoverFrom="blue-100"
            hoverTo="indigo-200"
          />
          <QuickActionCard
            icon="fas fa-calendar-check"
            title="My Bookings"
            subtitle="Manage all your reservations"
            buttonText="View"
            buttonLink="/user_booking"
            bgFrom="green-50"
            bgTo="emerald-100"
            hoverFrom="green-100"
            hoverTo="emerald-200"
          />
          <QuickActionCard
            icon="fas fa-concierge-bell"
            title="Special Requests"
            subtitle="Tell us your specific needs"
            buttonText="Send Request"
            buttonLink="#"
            bgFrom="purple-50"
            bgTo="pink-100"
            hoverFrom="purple-100"
            hoverTo="pink-200"
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-32 bg-white relative overflow-hidden">
      <div
        class="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-128 h-128 bg-purple-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"
      ></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-20 animate-fade-in-up">
          <h2 class="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Why Choose
            <span
              class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              >Us</span
            >
          </h2>
          <p class="text-2xl text-gray-600 max-w-2xl mx-auto">
            We constantly update our services to ensure comfort and satisfaction
            for our guests.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            v-for="(feature, index) in features"
            :key="feature.id"
            :feature="feature"
            :style="`animation-delay: ${index * 150}ms`"
          />
        </div>
      </div>
    </section>

    <!-- Featured Rooms -->
    <section class="py-32 bg-gray-50 relative overflow-hidden">
      <div class="container mx-auto px-6">
        <div class="text-center mb-20 animate-fade-in-up">
          <h2 class="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Popular
            <span
              class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              >Rooms</span
            >
          </h2>
          <p class="text-2xl text-gray-600">
            Check out our best offers and accommodations
          </p>
        </div>

        <div v-if="loading" class="flex justify-center">
          <div
            class="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"
          ></div>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <RoomCard
            v-for="(room, index) in featuredRooms"
            :key="room.id"
            :room="room"
            class="animate-fade-in-up"
            :style="`animation-delay: ${index * 100}ms`"
          />
        </div>

        <div class="text-center mt-16 animate-fade-in-up">
          <router-link
            to="/rooms"
            class="group inline-flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-10 py-5 rounded-3xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            View All Rooms
            <i
              class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"
            ></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section
      class="py-32 bg-gradient-to-r from-blue-600 to-purple-700 text-white"
    >
      <div class="container mx-auto px-6 relative z-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div
            v-for="(stat, index) in statistics"
            :key="stat.id"
            class="animate-fade-in-up"
            :style="`animation-delay: ${index * 150}ms`"
          >
            <div class="text-5xl md:text-6xl font-bold mb-3 drop-shadow-lg">
              {{ stat.value }}
            </div>
            <div class="text-xl md:text-2xl font-medium text-blue-100">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-32 bg-gradient-to-r from-blue-50 to-purple-50">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          Ready to Book?
        </h2>
        <p class="text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Access your profile to manage bookings or reserve a new room
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center">
          <router-link
            to="/user_booking"
            class="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-6 rounded-3xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            My Bookings
          </router-link>
          <router-link
            to="/booking"
            class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-6 rounded-3xl text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Book Now
          </router-link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import RoomCard from "@/components/common/RoomCard.vue";
import FeatureCard from "@/components/common/FeatureCard.vue";
import QuickActionCard from "@/components/common/QuickActionCard.vue";
import { useRoomStore } from "@/stores/rooms";

const roomStore = useRoomStore();
const loading = ref(false);
const featuredRooms = ref([]);

const features = [
  {
    id: 1,
    icon: "fas fa-wifi",
    title: "Fast Wi-Fi",
    description: "Free high-speed internet in all rooms",
  },
  {
    id: 2,
    icon: "fas fa-utensils",
    title: "Restaurant",
    description: "Variety of cuisines and local dishes",
  },
  {
    id: 3,
    icon: "fas fa-concierge-bell",
    title: "24/7 Service",
    description: "Round-the-clock assistance for guests",
  },
];

const statistics = [
  { id: 1, value: "50+", label: "Rooms" },
  { id: 2, value: "1000+", label: "Happy Guests" },
  { id: 3, value: "5", label: "Star Rating" },
  { id: 4, value: "24/7", label: "Support" },
];

onMounted(async () => {
  loading.value = true;
  try {
    await roomStore.fetchRooms();
    featuredRooms.value = roomStore.availableRooms.slice(0, 3);
  } catch (error) {
    console.error(error);
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

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}
.animate-ken-burns {
  animation: kenBurns 20s ease-in-out infinite alternate;
}
</style>
