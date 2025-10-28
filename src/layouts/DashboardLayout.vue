<template>
  <div class="flex h-screen bg-gray-100 relative">
    <!-- Overlay (faqat mobil uchun) -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <AppSidebar
      :class="[
        'fixed z-50 inset-y-0 left-0 transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:block',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
      @close="closeSidebar"
    />

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <AppHeader @toggle-sidebar="toggleSidebar" />
      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppSidebar from "@/components/layout/AppSidebar.vue";
import AppHeader from "@/components/layout/AppHeader.vue";

const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
const closeSidebar = () => {
  sidebarOpen.value = false;
};
</script>
