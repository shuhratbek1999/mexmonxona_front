<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <i class="fas fa-hotel text-blue-500 text-2xl"></i>
          <span class="text-xl font-bold text-gray-800">Luxury Hotel</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            class="text-gray-600 hover:text-blue-500 transition duration-300"
            :class="{ 'text-blue-500 font-semibold': $route.path === '/' }"
          >
            Home
          </router-link>
          <router-link
            to="/rooms"
            class="text-gray-600 hover:text-blue-500 transition duration-300"
            :class="{ 'text-blue-500 font-semibold': $route.path === '/rooms' }"
          >
            Rooms
          </router-link>
          <router-link
            to="/about"
            class="text-gray-600 hover:text-blue-500 transition duration-300"
            :class="{ 'text-blue-500 font-semibold': $route.path === '/about' }"
          >
            About Us
          </router-link>
          <router-link
            to="/contact"
            class="text-gray-600 hover:text-blue-500 transition duration-300"
            :class="{
              'text-blue-500 font-semibold': $route.path === '/contact',
            }"
          >
            Contact
          </router-link>

          <!-- Auth buttons -->
          <template v-if="authStore.isAuthenticated">
            <router-link
              to="/booking"
              class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Booking
            </router-link>
            <button
              @click="LogOut"
              class="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition duration-300 ml-4"
            >
              <i class="fas fa-sign-out-alt"></i>
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="text-gray-600 hover:text-blue-500 transition duration-300"
            >
              Login
            </router-link>
            <router-link
              to="/register"
              class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign up
            </router-link>
          </template>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="toggleMenu"
          class="md:hidden text-gray-600 hover:text-blue-500 transition duration-300 p-2 rounded-lg"
          :class="{ 'text-blue-500': isMenuOpen }"
        >
          <i class="fas fa-bars text-xl" v-if="!isMenuOpen"></i>
          <i class="fas fa-times text-xl" v-else></i>
        </button>
      </div>

      <!-- Mobile Navigation Overlay -->
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
        @click="closeMenu"
      ></div>

      <!-- Mobile Navigation Sidebar -->
      <div
        class="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden"
        :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div
            class="flex justify-between items-center p-4 border-b border-gray-200"
          >
            <span class="text-lg font-semibold text-gray-800">Menu</span>
            <button
              @click="closeMenu"
              class="text-gray-600 hover:text-blue-500 transition duration-300 p-2 rounded-lg"
            >
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <!-- Menu Items -->
          <div class="flex-1 overflow-y-auto py-4">
            <div class="flex flex-col space-y-2 px-4">
              <router-link
                to="/"
                class="flex items-center space-x-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition duration-300 py-3 px-4 rounded-lg"
                @click="closeMenu"
                :class="{ 'text-blue-500 bg-blue-50': $route.path === '/' }"
              >
                <i class="fas fa-home w-5"></i>
                <span>Bosh Sahifa</span>
              </router-link>

              <router-link
                to="/rooms"
                class="flex items-center space-x-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition duration-300 py-3 px-4 rounded-lg"
                @click="closeMenu"
                :class="{
                  'text-blue-500 bg-blue-50': $route.path === '/rooms',
                }"
              >
                <i class="fas fa-bed w-5"></i>
                <span>Xonalar</span>
              </router-link>

              <router-link
                to="/about"
                class="flex items-center space-x-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition duration-300 py-3 px-4 rounded-lg"
                @click="closeMenu"
                :class="{
                  'text-blue-500 bg-blue-50': $route.path === '/about',
                }"
              >
                <i class="fas fa-info-circle w-5"></i>
                <span>Biz Haqimizda</span>
              </router-link>

              <router-link
                to="/contact"
                class="flex items-center space-x-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition duration-300 py-3 px-4 rounded-lg"
                @click="closeMenu"
                :class="{
                  'text-blue-500 bg-blue-50': $route.path === '/contact',
                }"
              >
                <i class="fas fa-phone w-5"></i>
                <span>Aloqa</span>
              </router-link>

              <!-- Auth Section -->
              <div class="border-t border-gray-200 mt-4 pt-4">
                <template v-if="authStore.isAuthenticated">
                  <router-link
                    to="/booking"
                    class="flex items-center space-x-3 bg-blue-500 text-white hover:bg-blue-600 transition duration-300 py-3 px-4 rounded-lg justify-center mb-3"
                    @click="closeMenu"
                  >
                    <i class="fas fa-calendar-check w-5"></i>
                    <span>Bron Qilish</span>
                  </router-link>

                  <button
                    @click="handleLogout"
                    class="flex items-center space-x-3 text-red-600 hover:text-red-700 hover:bg-red-50 transition duration-300 py-3 px-4 rounded-lg w-full text-left"
                  >
                    <i class="fas fa-sign-out-alt w-5"></i>
                    <span>Chiqish</span>
                  </button>
                </template>
                <template v-else>
                  <router-link
                    to="/login"
                    class="flex items-center space-x-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition duration-300 py-3 px-4 rounded-lg mb-2"
                    @click="closeMenu"
                  >
                    <i class="fas fa-sign-in-alt w-5"></i>
                    <span>Kirish</span>
                  </router-link>

                  <router-link
                    to="/register"
                    class="flex items-center space-x-3 bg-blue-500 text-white hover:bg-blue-600 transition duration-300 py-3 px-4 rounded-lg justify-center"
                    @click="closeMenu"
                  >
                    <i class="fas fa-user-plus w-5"></i>
                    <span>Ro'yxatdan o'tish</span>
                  </router-link>
                </template>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="p-4 border-t border-gray-200 text-center text-gray-500 text-sm"
          >
            Luxury Hotel © 2024
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const isMenuOpen = ref(false);

// Menu toggle functions
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

// Close menu on escape key
const handleEscapeKey = (event) => {
  if (event.key === "Escape" && isMenuOpen.value) {
    closeMenu();
  }
};

// Close menu when route changes
router.afterEach(() => {
  closeMenu();
});

// Logout function
const handleLogout = () => {
  if (confirm("Hisobdan chiqishni xohlaysizmi?")) {
    authStore.logout();
    closeMenu();
    router.push("/login");
  }
};

const LogOut = () => {
  if (confirm("Hisobdan chiqishni xohlaysizmi?")) {
    localStorage.clear();
    window.location.href = "/login";
  }
};

// Event listeners
onMounted(() => {
  document.addEventListener("keydown", handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscapeKey);
});
</script>

<style scoped>
/* Smooth transitions */
.fixed {
  transition: all 0.3s ease-in-out;
}

/* Prevent body scroll when menu is open */
body:has(.fixed.inset-0.bg-black) {
  overflow: hidden;
}

/* Custom scrollbar for mobile menu */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f7fafc;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>
