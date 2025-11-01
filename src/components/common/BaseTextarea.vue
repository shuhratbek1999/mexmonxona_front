<template>
  <div>
    <textarea
      :id="id"
      :rows="rows"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="block w-full border rounded-lg p-3"
    ></textarea>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: String,
  id: String,
  rows: {
    type: Number,
    default: 4,
  },
  placeholder: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>
