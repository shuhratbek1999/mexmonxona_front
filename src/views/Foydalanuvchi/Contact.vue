<template>
  <div
    :class="darkMode ? 'dark' : ''"
    class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500"
  >
    <Navbar @toggleDarkMode="darkMode = !darkMode" :darkMode="darkMode" />

    <!-- Hero Section -->
    <section class="relative py-24 text-white overflow-hidden">
      <!-- Animated SVG Background -->
      <svg
        class="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="gradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="100%" stop-color="#8b5cf6" />
          </linearGradient>
          <linearGradient id="gradDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e3a8a" />
            <stop offset="100%" stop-color="#7e22ce" />
          </linearGradient>
        </defs>
        <circle
          :fill="darkMode ? 'url(#gradDark)' : 'url(#gradLight)'"
          cx="25%"
          cy="25%"
          r="200"
          class="animate-float-slow"
        ></circle>
        <circle
          :fill="darkMode ? 'url(#gradDark)' : 'url(#gradLight)'"
          cx="75%"
          cy="75%"
          r="300"
          class="animate-float-slow-reverse"
        ></circle>
      </svg>

      <div
        class="relative container mx-auto px-4 text-center animate-fade-in-up"
      >
        <h1 class="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
        <p class="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
          If you have any questions, write to us. We will be happy to help you.
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 relative">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- Contact Form -->
          <div class="animate-fade-in-left">
            <div
              :class="
                darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              "
              class="rounded-3xl shadow-2xl p-8 lg:p-10 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <h2 class="text-3xl font-bold mb-2">Leave a message</h2>
              <p class="mb-8 opacity-80">We will contact you soon.</p>

              <form @submit.prevent="submitForm" class="space-y-6">
                <BaseInput
                  v-model="form.name"
                  icon="user"
                  label="Name"
                  placeholder="Enter your name"
                  :darkMode="darkMode"
                  required
                />
                <BaseInput
                  v-model="form.email"
                  icon="envelope"
                  label="Email"
                  placeholder="email@example.com"
                  type="email"
                  :darkMode="darkMode"
                  required
                />
                <BaseTextarea
                  v-model="form.message"
                  icon="comment"
                  label="Message"
                  placeholder="Write your message..."
                  :rows="5"
                  :darkMode="darkMode"
                  required
                />

                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex justify-center items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-paper-plane"></i>
                  <span>{{ loading ? "Sending..." : "Send Message" }}</span>
                </button>
              </form>
            </div>
          </div>

          <!-- Contact Info & Map -->
          <div class="animate-fade-in-right space-y-8">
            <InfoCard
              icon="map-marker-alt"
              title="Adress"
              text="Andijan region, Altynkul district"
              color="blue"
              :darkMode="darkMode"
            />
            <InfoCard
              icon="phone"
              title="Phone"
              text="+998 99 394 12 26"
              color="green"
              :darkMode="darkMode"
            />
            <InfoCard
              icon="envelope"
              title="Email"
              text="Shuhratbekzokirjonov1119@gmail.com"
              color="purple"
              :darkMode="darkMode"
            />
            <InfoCard
              icon="clock"
              title="Business Hours"
              text="Monday - Friday: 9:00 - 18:00\nSaturday - Sunday: 10:00 - 16:00"
              color="orange"
              :darkMode="darkMode"
            />

            <div
              :class="
                darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              "
              class="rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <h3 class="text-xl font-semibold mb-4">Location on the map</h3>
              <div
                class="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-900 h-64 rounded-2xl flex items-center justify-center relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                ></div>
                <div class="text-center relative z-10">
                  <i
                    class="fas fa-map-marked-alt text-4xl text-gray-400 mb-3"
                  ></i>
                  <p class="font-medium">The map will be placed</p>
                  <p class="text-sm opacity-80 mt-1">Google Maps integration</p>
                </div>
              </div>
            </div>

            <div
              class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 text-white text-center"
            >
              <h3 class="text-xl font-semibold mb-4">Social Networkr</h3>
              <div
                class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 text-white text-center"
              >
                <h3 class="text-xl font-semibold mb-4">Social Networkr</h3>
                <div class="flex justify-center space-x-4">
                  <SocialIcon
                    icon="fab fa-telegram"
                    link="https://t.me/username"
                  />
                  <SocialIcon
                    icon="fab fa-instagram"
                    link="https://instagram.com/username"
                  />
                  <SocialIcon
                    icon="fab fa-facebook-f"
                    link="https://facebook.com/username"
                  />
                  <SocialIcon
                    icon="fab fa-twitter"
                    link="https://twitter.com/username"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer :darkMode="darkMode" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import BaseInput from "@/components/common/BaseInput.vue";
import BaseTextarea from "@/components/common/BaseTextarea.vue";
import InfoCard from "@/components/common/InfoCard.vue";
import SocialIcon from "@/components/common/SocialIcon.vue";

const darkMode = ref(false);
const form = ref({ name: "", email: "", message: "" });
const loading = ref(false);

async function submitForm() {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  alert("Xabaringiz yuborildi! Tez orada siz bilan bog'lanamiz.");
  form.value = { name: "", email: "", message: "" };
  loading.value = false;
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes floatSlow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
@keyframes floatSlowReverse {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}
.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out;
}
.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out;
}
.animate-float-slow {
  animation: floatSlow 6s ease-in-out infinite;
}
.animate-float-slow-reverse {
  animation: floatSlowReverse 6s ease-in-out infinite;
}

* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
