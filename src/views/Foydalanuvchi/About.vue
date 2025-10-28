<template>
  <div class="min-h-screen bg-white overflow-hidden">
    <!-- Navbar -->
    <Navbar />

    <!-- Hero Section -->
    <section
      class="relative py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden"
    >
      <!-- Animated Background -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-black/50 z-10"></div>
        <div
          class="absolute inset-0 bg-cover bg-center transform scale-110 animate-ken-burns"
          style="
            background-image: url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
          "
        ></div>

        <!-- Floating shapes -->
        <div
          class="absolute top-20 left-10 w-6 h-6 bg-blue-400 rounded-full animate-float-1 opacity-60"
        ></div>
        <div
          class="absolute top-40 right-20 w-8 h-8 bg-purple-400 rounded-full animate-float-2 opacity-40"
        ></div>
        <div
          class="absolute bottom-20 left-20 w-4 h-4 bg-white rounded-full animate-float-3 opacity-30"
        ></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-20 container mx-auto px-4 text-center">
        <div class="animate-fade-in-up">
          <h1
            class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
          >
            Biz Haqimizda
          </h1>
          <p
            class="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90"
          >
            Mehribon xizmat, qulay sharoitlar va unutilmas tajribalar -
            <span class="block mt-2">bu bizning maqsadimiz</span>
          </p>
        </div>

        <!-- Scroll indicator -->
        <div
          class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce mt-12"
        >
          <div
            class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <div
              class="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="py-24 relative overflow-hidden">
      <!-- Background elements -->
      <div
        class="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-80 h-80 bg-purple-50 rounded-full translate-x-1/2 translate-y-1/2 opacity-60"
      ></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Image with hover effect -->
          <div class="relative group animate-fade-in-left cursor-pointer">
            <div class="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our Hotel"
                class="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </div>

            <!-- Floating badge -->
            <div
              class="absolute -top-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-2xl transform rotate-6 animate-pulse-slow"
            >
              <div class="text-center">
                <div class="text-2xl font-bold">2010</div>
                <div class="text-sm">Dan beri</div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="animate-fade-in-right">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Bizning
              <span
                class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                >Hikoyamiz</span
              >
            </h2>
            <div class="space-y-6 text-gray-600 text-lg leading-relaxed">
              <div
                class="flex items-start space-x-4 transform hover:translate-x-2 cursor-pointer transition-transform duration-300"
              >
                <div
                  class="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"
                ></div>
                <p>
                  2010 yildan beri biz mehmonlarimizga eng yaxshi dam olish
                  tajribasini taqdim etish uchun ishlayapmiz. Har bir mehmon
                  bizning oilamizning bir qismiga aylanishi bizning maqsadimiz.
                </p>
              </div>

              <div
                class="flex items-start space-x-4 transform hover:translate-x-2 transition-transform duration-300 cursor-pointer"
              >
                <div
                  class="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"
                ></div>
                <p>
                  Zamonaviy qulayliklar, an'anaviy mehmondo'stlik va mukammal
                  xizmatni birlashtirib, sizga uydagi kabi his qilishingizni
                  ta'minlaymiz.
                </p>
              </div>

              <div
                class="flex items-start space-x-4 transform hover:translate-x-2 transition-transform duration-300 cursor-pointer"
              >
                <div
                  class="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"
                ></div>
                <p>
                  Bizning jamoamiz har qanday holatda ham sizga yordam berishga
                  tayyor bo'lgan tajribali mutaxassislardan iborat.
                </p>
              </div>
            </div>

            <!-- Stats -->
            <div
              class="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200"
            >
              <div v-for="stat in stats" :key="stat.id" class="text-center">
                <div class="text-3xl font-bold text-gray-800 mb-2">
                  {{ stat.value }}
                </div>
                <div class="text-gray-600 text-sm">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section
      class="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden"
    >
      <!-- Background pattern -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute top-0 left-0 w-full h-full bg-repeat"
          :style="svgBackground"
        ></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-20 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Bizning
            <span
              class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              >Qadriyatlarimiz</span
            >
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Bizning ishimizning asosiy tamoyillari va ular orqali erishgan
            muvaffaqiyatlarimiz
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(value, index) in values"
            :key="value.id"
            class="group relative bg-white/80 backdrop-blur-sm p-8 cursor-pointer rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20 animate-fade-in-up"
            :style="`animation-delay: ${index * 200}ms`"
          >
            <!-- Hover gradient background -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>

            <div class="relative z-10">
              <div
                class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg"
              >
                <i :class="value.icon" class="text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {{ value.title }}
              </h3>
              <p class="text-gray-600 text-center leading-relaxed">
                {{ value.description }}
              </p>
            </div>

            <!-- Corner accent -->
            <div
              class="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div
              class="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="py-24 bg-white relative overflow-hidden">
      <!-- Background decoration -->
      <div
        class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100 to-transparent rounded-full -translate-y-32 translate-x-32"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-100 to-transparent rounded-full translate-y-32 -translate-x-32"
      ></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-20 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Bizning
            <span
              class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              >Jamoa</span
            >
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Sizga yordam berishdan mamnun bo'lgan mutaxassislar jamiasi
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(member, index) in team"
            :key="member.id"
            class="group text-center animate-fade-in-up cursor-pointer"
            :style="`animation-delay: ${index * 150}ms`"
          >
            <div class="relative mb-6">
              <div
                class="relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-500"
              >
                <img
                  :src="member.photo"
                  :alt="member.name"
                  class="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
              </div>

              <!-- Social links on hover -->
              <div
                class="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex space-x-2"
              >
                <div
                  class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <i class="fab fa-linkedin-in text-blue-600 text-sm"></i>
                </div>
                <div
                  class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <i class="fab fa-twitter text-blue-400 text-sm"></i>
                </div>
              </div>
            </div>

            <h3
              class="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300"
            >
              {{ member.name }}
            </h3>
            <p class="text-blue-500 font-medium mb-2">{{ member.position }}</p>
            <p class="text-gray-600 text-sm leading-relaxed">
              {{ member.description }}
            </p>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center mt-20 animate-fade-in-up">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden"
          >
            <div
              class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"
            ></div>
            <div
              class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"
            ></div>

            <div class="relative z-10">
              <h3 class="text-3xl font-bold mb-4">Biz bilan bog'laning</h3>
              <p class="text-xl mb-8 opacity-90">
                Sizning dam olishingiz bizning asosiy mas'uliyatimiz
              </p>
              <router-link
                to="/contact"
                class="inline-flex items-center space-x-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span>Aloqa qilish</span>
                <i
                  class="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"
                ></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { computed } from "vue";
const svgBackground = computed(() => {
  return {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };
});
const stats = [
  { id: 1, value: "14+", label: "Yillik Tajriba" },
  { id: 2, value: "5000+", label: "Mamnun Mijoz" },
  { id: 3, value: "50+", label: "Mukofotlar" },
];

const values = [
  {
    id: 1,
    icon: "fas fa-heart",
    title: "Mehribonlik",
    description:
      "Har bir mehmonni oila a'zosi sifatida qabul qilamiz va ularning ehtiyojlarini tushunamiz.",
  },
  {
    id: 2,
    icon: "fas fa-star",
    title: "Sifat",
    description:
      "Xizmat va qulayliklarning eng yuqori darajasini taqdim etishga intilamiz.",
  },
  {
    id: 3,
    icon: "fas fa-handshake",
    title: "Ishonch",
    description:
      "Mijozlarimiz ishonchi bizning eng muhim boyligimiz va uni doim qadrlaymiz.",
  },
];

const team = [
  {
    id: 1,
    name: "Ali Valiyev",
    position: "Bosh Menejer",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "10 yillik mehmonxona menejmenti tajribasi",
  },
  {
    id: 2,
    name: "Zarina Xolmatova",
    position: "Resepsion Menejer",
    photo:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Mehmonlar bilan ishlash bo'yicha mutaxassis",
  },
  {
    id: 3,
    name: "Bekzod Ismoilov",
    position: "Xo'jalik Menejeri",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Tozalik va tartibni ta'minlash ustasi",
  },
  {
    id: 4,
    name: "Dilnoza Karimova",
    position: "Marketing Menejeri",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    description: "Brend va mijoz munosabatlari bo'yicha mutaxassis",
  },
];
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

@keyframes kenBurns {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes float1 {
  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes float2 {
  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(15px) translateX(-15px);
  }
}

@keyframes float3 {
  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-10px) translateX(-10px);
  }
}

@keyframes pulseSlow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
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

.animate-ken-burns {
  animation: kenBurns 20s ease-in-out infinite alternate;
}

.animate-float-1 {
  animation: float1 6s ease-in-out infinite;
}

.animate-float-2 {
  animation: float2 8s ease-in-out infinite;
}

.animate-float-3 {
  animation: float3 10s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulseSlow 3s ease-in-out infinite;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Glass morphism effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
