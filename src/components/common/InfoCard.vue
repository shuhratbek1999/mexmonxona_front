<template>
  <div
    :class="darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'"
    class="rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1"
  >
    <div class="flex items-start space-x-4">
      <div
        :class="`w-12 h-12 rounded-2xl flex items-center justify-center bg-${color}-100 group-hover:bg-${color}-500 group-hover:scale-110 transition-all duration-300`"
      >
        <i
          :class="[
            'fas',
            `fa-${icon}`,
            `text-${color}-500 group-hover:text-white`,
            'text-lg',
          ]"
        ></i>
      </div>
      <div class="flex-1">
        <h3 class="font-semibold text-lg mb-1">{{ title }}</h3>
        <p class="text-gray-600 dark:text-gray-300" v-html="formattedText"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  icon: String,
  title: String,
  text: String,
  color: { type: String, default: "blue" },
  darkMode: { type: Boolean, default: false },
});

const formattedText = computed(() => props.text.replace(/\n/g, "<br>"));
</script>
