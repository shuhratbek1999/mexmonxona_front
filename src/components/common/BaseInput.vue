<template>
  <div class="group">
    <label
      :for="id"
      class="block text-sm font-medium mb-2"
      :class="darkMode ? 'text-gray-200' : 'text-gray-700'"
    >
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <i
          :class="[
            'fas',
            `fa-${icon}`,
            'text-gray-400',
            'transition-colors duration-300',
            darkMode
              ? 'group-focus-within:text-blue-400'
              : 'group-focus-within:text-blue-500',
          ]"
        ></i>
      </div>
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="[
          'block w-full pl-10 pr-4 py-4 rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-300 group-hover:border-blue-300',
          darkMode
            ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-400'
            : 'bg-gray-50/50 text-gray-800 border-gray-300 focus:ring-blue-500',
        ]"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  icon: String,
  type: { type: String, default: "text" },
  required: { type: Boolean, default: false },
  id: { type: String, default: () => `input-${Math.random()}` },
  darkMode: { type: Boolean, default: false },
});
</script>
