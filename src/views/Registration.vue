<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4"
  >
    <div
      class="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
        <h1 class="text-2xl font-bold text-white">Ro'yxatdan o'tish</h1>
        <p class="text-blue-100 mt-2">Yangi hisobingizni yarating</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
            >Ism</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <UserIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="To'liq ismingiz"
            />
          </div>
        </div>

        <!-- Phone -->
        <div>
          <label
            for="phone"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Telefon raqam</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <PhoneIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              required
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="+998 (XX) XXX-XX-XX"
            />
          </div>
        </div>

        <!-- Email -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <EnvelopeIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="sizning@email.uz"
            />
          </div>
        </div>

        <!-- Password -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Parol</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <LockClosedIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Kuchli parol yarating"
            />
          </div>
        </div>

        <!-- Passport -->
        <div>
          <label
            for="passport"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Pasport raqam</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <IdentificationIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="passport"
              v-model="form.passport"
              type="text"
              required
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="AA1234567"
            />
          </div>
        </div>

        <!-- Birth Date -->
        <div>
          <label
            for="birthDate"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Tug'ilgan sana</label
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <CalendarIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="birthDate"
              v-model="form.birthDate"
              type="date"
              required
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <!-- Address -->
        <div>
          <label
            for="address"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Manzil</label
          >
          <div class="relative">
            <div
              class="absolute top-3 left-3 flex items-start pointer-events-none"
            >
              <MapPinIcon class="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="address"
              v-model="form.address"
              required
              rows="3"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
              placeholder="To'liq manzilingiz"
            ></textarea>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Ro'yxatdan o'tilmoqda...
            </span>
            <span v-else> Ro'yxatdan o'tish </span>
          </button>
        </div>

        <!-- Login Link -->
        <div class="text-center pt-2">
          <p class="text-sm text-gray-600">
            Hisobingiz bormi?
            <span
              class="font-medium text-blue-600 hover:text-blue-500 transition cursor-pointer"
              @click="Login"
            >
              Tizimga kirish
            </span>
          </p>
        </div>
      </form>
    </div>

    <!-- Success Notification -->
    <div
      v-if="showSuccess"
      class="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg transition-opacity duration-300 z-50"
    >
      <div class="flex items-center">
        <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2" />
        <span>Muvaffaqiyatli ro'yxatdan o'tdingiz!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useClientStore } from "@/stores/clients";
import { useRouter } from "vue-router";
const router = useRouter();
// Ikonlar - agar Heroicons ishlatmasangiz, o'rniga SVG yoki boshqa ikon kutubxonasi ishlatishingiz mumkin
const UserIcon = {
  template:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
};
const PhoneIcon = {
  template:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>',
};
const EnvelopeIcon = {
  template:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
};
const LockClosedIcon = {
  template:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>',
};
const IdentificationIcon = {
  template:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>',
};
const CalendarIcon = {
  template:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>',
};
const MapPinIcon = {
  template:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
};
const CheckCircleIcon = {
  template:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
};

const clientStore = useClientStore();
const loading = ref(false);
const showSuccess = ref(false);

const form = ref({
  name: "",
  phone: "",
  email: "",
  password: "",
  passport: "",
  birthDate: "",
  address: "",
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    let formData = {
      ...form.value,
      loyalty: "Bronza",
      status: "active",
    };
    await clientStore.createClient(formData);
    // Muvaffaqiyatli ro'yxatdan o'tgandan keyin
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);

    // Formani tozalash
    form.value = {
      name: "",
      phone: "",
      email: "",
      password: "",
      passport: "",
      birthDate: "",
      address: "",
    };
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  } catch (error) {
    alert("Xatolik: " + error.message);
  } finally {
    loading.value = false;
  }
};
const Login = () => {
  router.push("/login");
};
</script>
