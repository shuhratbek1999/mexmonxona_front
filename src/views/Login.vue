<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- Header section -->
      <div
        class="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-4 sm:px-6 text-center"
      >
        <div class="flex justify-center mb-4">
          <div
            class="h-16 w-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center"
          >
            <i class="fas fa-hotel text-white text-2xl"></i>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-white">
          Mexmonxona Boshqaruv Tizimi
        </h2>
        <p class="text-blue-100 mt-2">
          Xush kelibsiz! Tizimga kirish uchun hisobingizdan foydalaning
        </p>
      </div>

      <!-- Tabs section -->
      <div class="border-b border-gray-200">
        <nav class="flex">
          <button
            @click="activeTab = 'employee'"
            :class="[
              'flex-1 py-4 px-6 text-center font-medium text-sm',
              activeTab === 'employee'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            Xodimlar
          </button>
          <button
            @click="activeTab = 'client'"
            :class="[
              'flex-1 py-4 px-6 text-center font-medium text-sm',
              activeTab === 'client'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700',
            ]"
          >
            Mijozlar
          </button>
        </nav>
      </div>

      <!-- Forms section -->
      <div class="p-6 sm:px-8 sm:py-6">
        <!-- Employee Login Form -->
        <div v-if="activeTab === 'employee'" class="space-y-6">
          <div>
            <label
              for="employee-username"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Foydalanuvchi nomi
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <i class="fas fa-user text-gray-400"></i>
              </div>
              <input
                v-model="employeeCredentials.username"
                id="employee-username"
                type="text"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Foydalanuvchi nomi"
                @keypress.enter="handleEmployeeLogin"
              />
            </div>
          </div>

          <div>
            <label
              for="employee-password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Parol
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input
                v-model="employeeCredentials.password"
                id="employee-password"
                type="password"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Parol"
                @keypress.enter="handleEmployeeLogin"
              />
            </div>
          </div>

          <button
            type="button"
            @click="handleEmployeeLogin"
            :disabled="authStore.loading"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50"
          >
            <span v-if="authStore.loading">
              <i class="fas fa-spinner fa-spin mr-2"></i> Kirish...
            </span>
            <span v-else>Kirish</span>
          </button>
        </div>

        <!-- Client Login Form -->
        <div v-else class="space-y-6">
          <div>
            <label
              for="client-email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Elektron pochta
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <i class="fas fa-envelope text-gray-400"></i>
              </div>
              <input
                v-model="clientCredentials.email"
                id="client-email"
                type="email"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="email@example.com"
                @keypress.enter="handleClientLogin"
              />
            </div>
          </div>

          <div>
            <label
              for="client-password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Parol
            </label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input
                v-model="clientCredentials.password"
                id="client-password"
                type="password"
                required
                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Parol"
                @keypress.enter="handleClientLogin"
              />
            </div>
          </div>

          <button
            type="button"
            @click="handleClientLogin"
            :disabled="authStore.loading"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50"
          >
            <span v-if="authStore.loading">
              <i class="fas fa-spinner fa-spin mr-2"></i> Kirish...
            </span>
            <span v-else>Kirish</span>
          </button>

          <div class="text-center bg-gray-200 p-2" @click="Register">
            <p class="text-sm text-gray-600">
              Hisobingiz yo'qmi?
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Ro'yxatdan o'tish
              </a>
            </p>
          </div>
        </div>

        <!-- Error message -->
        <div
          v-if="authStore.error"
          class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <div class="flex items-center">
            <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
            <span class="text-red-700 text-sm">{{ authStore.error }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const activeTab = ref("employee");

const employeeCredentials = ref({
  username: "",
  password: "",
  user_type: "employee", // Backendga yuboriladigan qo'shimcha maydon
});

const clientCredentials = ref({
  email: "",
  password: "",
  user_type: "client", // Backendga yuboriladigan qo'shimcha maydon
});
const Register = () => {
  // console.log("salomm");

  router.push("/registration");
};
// onMounted(() => {
//   // Agar allaqachon login qilgan bo'lsa, tegishli sahifaga yo'naltirish
//   if (authStore.isAuthenticated) {
//     redirectBasedOnUserType();
//   }
// });

const redirectBasedOnUserType = () => {
  if (authStore.isEmployee()) {
    router.push("/admin/dashboard");
  } else {
    router.push("/");
  }
};

const handleEmployeeLogin = async () => {
  if (authStore.loading) return;

  try {
    await authStore.login(employeeCredentials.value);
    // Muvaffaqiyatli login - foydalanuvchi turiga qarab yo'naltirish
    redirectBasedOnUserType();
  } catch (error) {
    // Xato message auth store da ko'rsatiladi
    // console.error("Xodim login xatosi:", error);
  }
};

const handleClientLogin = async () => {
  if (authStore.loading) return;

  try {
    await authStore.login(clientCredentials.value);

    // Muvaffaqiyatli login - foydalanuvchi turiga qarab yo'naltirish
    redirectBasedOnUserType();
  } catch (error) {
    // Xato message auth store da ko'rsatiladi
    console.error("Mijoz login xatosi:", error);
  }
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
</style>
