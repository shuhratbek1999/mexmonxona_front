<template>
  <div
    class="group relative bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    ></div>
    <div class="relative z-10 text-center">
      <div
        class="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
      >
        <i :class="feature.icon" class="text-white text-2xl"></i>
      </div>
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">
        {{ feature.title }}
      </h3>
      <p class="text-gray-600">{{ feature.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  feature: Object,
});
</script>
