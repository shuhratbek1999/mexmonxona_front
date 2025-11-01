<template>
  <div
    class="group text-center p-12 rounded-3xl bg-gradient-to-br from-[var(--bg-from)] to-[var(--bg-to)] hover:from-[var(--hover-from)] hover:to-[var(--hover-to)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
  >
    <div
      class="w-24 h-24 bg-[var(--bg-from)] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
    >
      <i :class="icon" class="text-white text-2xl"></i>
    </div>
    <h3 class="text-2xl font-bold text-gray-800 mb-4">{{ title }}</h3>
    <p class="text-gray-600 mb-6">{{ subtitle }}</p>
    <router-link
      :to="buttonLink"
      class="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
    >
      {{ buttonText }}
      <i
        class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
      ></i>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  subtitle: String,
  buttonText: String,
  buttonLink: String,
  bgFrom: String,
  bgTo: String,
  hoverFrom: String,
  hoverTo: String,
});
</script>

<style scoped>
:root {
  --bg-from: blue-50;
  --bg-to: indigo-100;
  --hover-from: blue-100;
  --hover-to: indigo-200;
}
</style>
