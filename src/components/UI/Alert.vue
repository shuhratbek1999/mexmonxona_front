<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:items-start sm:justify-end sm:p-6 z-50"
    >
      <div
        class="max-w-sm w-full bg-white shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        :class="alertClasses"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <i :class="iconClasses" class="text-lg"></i>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                {{ title }}
              </p>
              <p class="mt-1 text-sm text-gray-500" v-if="message">
                {{ message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="close"
                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                :class="closeButtonClasses"
              >
                <span class="sr-only">Yopish</span>
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Progress Bar -->
        <div v-if="autoClose" class="h-1 bg-gray-200">
          <div
            class="h-full transition-all duration-300 ease-linear"
            :class="progressBarClasses"
            :style="{ width: progressWidth + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "success",
    validator: (value) =>
      ["success", "error", "warning", "info"].includes(value),
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "",
  },
  duration: {
    type: Number,
    default: 5000,
  },
  autoClose: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:show", "close"]);

const showAlert = ref(props.show);
const progressWidth = ref(100);
let timer = null;
let progressTimer = null;

const alertTypes = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "fas fa-check-circle text-green-400",
    progress: "bg-green-500",
    close: "focus:ring-green-500",
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "fas fa-exclamation-circle text-red-400",
    progress: "bg-red-500",
    close: "focus:ring-red-500",
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    icon: "fas fa-exclamation-triangle text-yellow-400",
    progress: "bg-yellow-500",
    close: "focus:ring-yellow-500",
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "fas fa-info-circle text-blue-400",
    progress: "bg-blue-500",
    close: "focus:ring-blue-500",
  },
};

const alertClasses = computed(() => {
  const type = alertTypes[props.type];
  return `${type.bg} ${type.border}`;
});

const iconClasses = computed(() => {
  return alertTypes[props.type].icon;
});

const progressBarClasses = computed(() => {
  return alertTypes[props.type].progress;
});

const closeButtonClasses = computed(() => {
  return alertTypes[props.type].close;
});

const close = () => {
  showAlert.value = false;
  emit("update:show", false);
  emit("close");
  clearTimers();
};

const clearTimers = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
};

const startAutoClose = () => {
  if (props.autoClose && props.duration > 0) {
    // Progress bar animation
    progressWidth.value = 100;
    const step = 100 / (props.duration / 50);

    progressTimer = setInterval(() => {
      progressWidth.value = Math.max(0, progressWidth.value - step);
    }, 50);

    // Auto close timer
    timer = setTimeout(() => {
      close();
    }, props.duration);
  }
};

watch(
  () => props.show,
  (newVal) => {
    showAlert.value = newVal;
    if (newVal) {
      startAutoClose();
    } else {
      clearTimers();
    }
  }
);

onMounted(() => {
  if (props.show) {
    startAutoClose();
  }
});

onUnmounted(() => {
  clearTimers();
});
</script>
