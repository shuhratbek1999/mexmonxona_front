<template>
  <header
    class="bg-white shadow-md py-4 px-6 flex justify-between items-center"
  >
    <div class="flex items-center">
      <button
        @click="toggleSidebar"
        class="mr-4 text-gray-600 focus:outline-none lg:hidden"
      >
        <i class="fas fa-bars"></i>
      </button>
      <h2 class="text-xl font-semibold">{{ currentRouteName }}</h2>
    </div>

    <div class="flex items-center space-x-4">
      <button class="relative text-gray-600 focus:outline-none">
        <i class="fas fa-bell"></i>
        <span
          class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center"
          >3</span
        >
      </button>

      <div class="relative">
        <button
          @click="toggleUserMenu"
          class="flex items-center focus:outline-none"
        >
          <div
            class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"
          >
            {{ userInitials }}
          </div>
          <span class="ml-2 text-gray-700">{{ user }}</span>
          <i class="ml-1 fas fa-chevron-down text-gray-500"></i>
        </button>

        <div
          v-if="showUserMenu"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
        >
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >Profil</a
          >
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >Sozlamalar</a
          >
          <div
            @click="handleLogout"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Chiqish
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const emit = defineEmits(["toggle-sidebar"]);
const showUserMenu = ref(false);

const user = computed(() => authStore.user);
const userInitials = computed(() => {
  if (!authStore.user?.name) return "U";
  return authStore.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
});

const currentRouteName = computed(() => {
  const routeName = route.name;
  if (!routeName) return "Панель управления";
  return routeName.charAt(0).toUpperCase() + routeName.slice(1);
});

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const toggleSidebar = () => {
  // Sidebar toggle logikasi
  emit("toggle-sidebar");
};

const handleLogout = () => {
  // authStore.logout();
  router.push("/");
  showUserMenu.value = false;
};
</script>
