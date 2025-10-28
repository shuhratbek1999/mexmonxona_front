<template>
  <aside class="w-64 bg-gray-800 text-white min-h-screen">
    <div class="p-4 border-b border-gray-700">
      <h1 class="text-xl font-bold text-center">ГостМастер</h1>
    </div>
    <nav class="mt-6">
      <ul>
        <li v-for="item in menuItems" :key="item.name">
          <router-link
            :to="item.path"
            class="flex items-center px-4 py-3 text-gray-300 capitalize hover:bg-gray-700 hover:text-white"
            :class="{ 'bg-gray-700 text-white': $route.path === item.path }"
            @click="$emit('close')"
          >
            <i :class="item.icon" class="mr-3"></i>
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
const menuItems = [
  {
    name: "Панель управления",
    path: "/admin/dashboard",
    icon: "fas fa-tachometer-alt",
  },
  { name: "комнаты", path: "/admin/rooms", icon: "fas fa-bed" },
  {
    name: "бронирование",
    path: "/admin/bookings",
    icon: "fas fa-calendar-check",
  },
  { name: "платежи", path: "/admin/payments", icon: "fas fa-shop" },
  { name: "отделение", path: "/admin/department", icon: "fas fa-users" },
  { name: "клиент", path: "/admin/clients", icon: "fas fa-users" },
  { name: "Сотрудники", path: "/admin/employer", icon: "fas fa-users" },
  { name: "Отчеты", path: "/admin/analytics", icon: "fas fa-chart-bar" },
  { name: "Настройки", path: "/admin/settings", icon: "fas fa-cog" },
];
</script>
