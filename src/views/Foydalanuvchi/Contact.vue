<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <Navbar />

    <!-- Hero Section -->
    <section
      class="relative py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden"
    >
      <!-- Background Animation -->
      <div class="absolute inset-0">
        <div
          class="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"
        ></div>
        <div
          class="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"
        ></div>
      </div>

      <div class="relative container mx-auto px-4 text-center">
        <div class="animate-fade-in-up">
          <h1 class="text-5xl md:text-6xl font-bold mb-6">
            Biz bilan Bog'laning
          </h1>
          <p class="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
            Savollaringiz bo'lsa, bizga yozing. Sizga yordam berishdan mamnun
            bo'lamiz
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-20 relative">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- Contact Form -->
          <div class="animate-fade-in-left">
            <div
              class="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <h2 class="text-3xl font-bold text-gray-800 mb-2">
                Xabar Qoldiring
              </h2>
              <p class="text-gray-600 mb-8">Tez orada siz bilan bog'lanamiz</p>

              <form @submit.prevent="submitForm" class="space-y-6">
                <!-- Name Input -->
                <div class="group">
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Ism <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <i
                        class="fas fa-user text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
                      ></i>
                    </div>
                    <input
                      type="text"
                      id="name"
                      v-model="form.name"
                      required
                      class="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 focus:bg-white group-hover:border-blue-300"
                      placeholder="Ismingizni kiriting"
                    />
                  </div>
                </div>

                <!-- Email Input -->
                <div class="group">
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <i
                        class="fas fa-envelope text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
                      ></i>
                    </div>
                    <input
                      type="email"
                      id="email"
                      v-model="form.email"
                      required
                      class="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 focus:bg-white group-hover:border-blue-300"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <!-- Message Textarea -->
                <div class="group">
                  <label
                    for="message"
                    class="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Xabar <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div class="absolute top-3 left-3 pointer-events-none">
                      <i
                        class="fas fa-comment text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
                      ></i>
                    </div>
                    <textarea
                      id="message"
                      v-model="form.message"
                      rows="5"
                      required
                      class="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 focus:bg-white group-hover:border-blue-300 resize-none"
                      placeholder="Xabaringizni yozing..."
                    ></textarea>
                  </div>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span
                    v-if="!loading"
                    class="flex items-center justify-center space-x-2"
                  >
                    <i class="fas fa-paper-plane"></i>
                    <span>Xabarni Yuborish</span>
                  </span>
                  <span
                    v-else
                    class="flex items-center justify-center space-x-2"
                  >
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Yuborilmoqda...</span>
                  </span>
                </button>
              </form>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="animate-fade-in-right">
            <div class="space-y-8">
              <!-- Contact Info Cards -->
              <div
                class="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <h2 class="text-3xl font-bold text-gray-800 mb-6">
                  Kontakt Ma'lumotlar
                </h2>

                <div class="space-y-6">
                  <!-- Address -->
                  <div class="flex items-start space-x-4 group cursor-pointer">
                    <div
                      class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300"
                    >
                      <i
                        class="fas fa-map-marker-alt text-blue-500 group-hover:text-white text-lg"
                      ></i>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-800 text-lg mb-1">
                        Manzil
                      </h3>
                      <p
                        class="text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
                      >
                        Andijon viloyati, Oltinko'l tumani
                      </p>
                    </div>
                  </div>

                  <!-- Phone -->
                  <div class="flex items-start space-x-4 group cursor-pointer">
                    <div
                      class="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300"
                    >
                      <i
                        class="fas fa-phone text-green-500 group-hover:text-white text-lg"
                      ></i>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-800 text-lg mb-1">
                        Telefon
                      </h3>
                      <p
                        class="text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
                      >
                        +998 99 394 12 26
                      </p>
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="flex items-start space-x-4 group cursor-pointer">
                    <div
                      class="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-300"
                    >
                      <i
                        class="fas fa-envelope text-purple-500 group-hover:text-white text-lg"
                      ></i>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-800 text-lg mb-1">
                        Email
                      </h3>
                      <p
                        class="text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
                      >
                        Shuhratbekzokirjonov1119@gmail.com
                      </p>
                    </div>
                  </div>

                  <!-- Working Hours -->
                  <div class="flex items-start space-x-4 group cursor-pointer">
                    <div
                      class="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300"
                    >
                      <i
                        class="fas fa-clock text-orange-500 group-hover:text-white text-lg"
                      ></i>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-800 text-lg mb-1">
                        Ish Vaqtlari
                      </h3>
                      <p
                        class="text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
                      >
                        Dushanba - Juma: 9:00 - 18:00<br />
                        Shanba - Yakshanba: 10:00 - 16:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Map Placeholder -->
              <div
                class="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <h3 class="text-xl font-semibold text-gray-800 mb-4">
                  Xaritada Joylashuv
                </h3>
                <div
                  class="bg-gradient-to-br from-gray-100 to-gray-200 h-64 rounded-2xl flex items-center justify-center relative overflow-hidden"
                >
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                  ></div>
                  <div class="text-center relative z-10">
                    <i
                      class="fas fa-map-marked-alt text-4xl text-gray-400 mb-3"
                    ></i>
                    <p class="text-gray-500 font-medium">Xarita joylashadi</p>
                    <p class="text-gray-400 text-sm mt-1">
                      Google Maps integratsiyasi
                    </p>
                  </div>

                  <!-- Map decoration elements -->
                  <div
                    class="absolute top-4 left-4 w-8 h-8 bg-blue-500/20 rounded-full"
                  ></div>
                  <div
                    class="absolute top-4 right-4 w-6 h-6 bg-purple-500/20 rounded-full"
                  ></div>
                  <div
                    class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-gray-300 rounded-full"
                  ></div>
                </div>
              </div>

              <!-- Social Media -->
              <div
                class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 text-white text-center"
              >
                <h3 class="text-xl font-semibold mb-4">Ijtimoiy Tarmoqlar</h3>
                <div class="flex justify-center space-x-4">
                  <a
                    href="#"
                    class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300"
                  >
                    <i class="fab fa-telegram"></i>
                  </a>
                  <a
                    href="#"
                    class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300"
                  >
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300"
                  >
                    <i class="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const form = ref({
  name: "",
  email: "",
  message: "",
});

const loading = ref(false);

async function submitForm() {
  loading.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // console.log("Form submitted:", form.value);

  // Show success message
  alert("Xabaringiz yuborildi! Tez orada siz bilan bog'lanamiz.");

  // Reset form
  form.value = { name: "", email: "", message: "" };
  loading.value = false;
}
</script>

<style scoped>
/* Animations */
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

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out;
}

/* Custom shadow */
.shadow-3xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 15px rgba(59, 130, 246, 0.1);
}

/* Smooth transitions for all elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
