<template>
  <a
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
    class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300"
  >
    <i :class="icon"></i>
  </a>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  icon: { type: String, required: true },
  link: { type: String, default: "#" },
});
</script>
