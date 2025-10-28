<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <i class="fas fa-hotel text-blue-400 text-2xl"></i>
            <span class="text-xl font-bold">Luxury Hotel</span>
          </div>
          <p class="text-gray-300 mb-4">
            Sizga eng yaxshi dam olish tajribasini taqdim etish - bu bizning
            maqsadimiz. Qulay sharoitlar, ajoyib xizmat va unutilmas xotiralar.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-300 hover:text-white transition">
              <i class="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="#" class="text-gray-300 hover:text-white transition">
              <i class="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" class="text-gray-300 hover:text-white transition">
              <i class="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" class="text-gray-300 hover:text-white transition">
              <i class="fab fa-telegram text-xl"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Tez Havolalar</h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/"
                class="text-gray-300 hover:text-white transition"
              >
                Bosh Sahifa
              </router-link>
            </li>
            <li>
              <router-link
                to="/rooms"
                class="text-gray-300 hover:text-white transition"
              >
                Xonalar
              </router-link>
            </li>
            <li>
              <router-link
                to="/about"
                class="text-gray-300 hover:text-white transition"
              >
                Biz Haqimizda
              </router-link>
            </li>
            <li>
              <router-link
                to="/contact"
                class="text-gray-300 hover:text-white transition"
              >
                Aloqa
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/dashboard"
                class="text-gray-300 hover:text-white transition"
              >
                Admin uchun
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Aloqa</h3>
          <div class="space-y-3">
            <div class="flex items-start space-x-3">
              <i class="fas fa-map-marker-alt text-blue-400 mt-1"></i>
              <span class="text-gray-300"
                >Toshkent shahri, Yunusobod tumani</span
              >
            </div>
            <div class="flex items-center space-x-3">
              <i class="fas fa-phone text-blue-400"></i>
              <span class="text-gray-300">+998 71 123 45 67</span>
            </div>
            <div class="flex items-center space-x-3">
              <i class="fas fa-envelope text-blue-400"></i>
              <span class="text-gray-300">info@luxuryhotel.uz</span>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-8 text-center">
        <p class="text-gray-300">
          &copy; 2024 Luxury Hotel. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer logikasi
</script>
