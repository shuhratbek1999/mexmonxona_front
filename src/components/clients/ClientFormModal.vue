<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
  >
    <div
      class="relative top-5 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white"
    >
      <!-- Modal header -->
      <div class="flex justify-between items-center pb-3 border-b">
        <h3 class="text-xl font-semibold">
          {{ isEditing ? "Mijozi tahrirlash" : "Yangi mijoz qo'shish" }}
        </h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Modal body -->
      <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Ism *</label
            >
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ali Valiyev"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Telefon *</label
            >
            <input
              v-model="formData.phone"
              type="tel"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="+998901234567"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            v-model="formData.email"
            type="email"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="ali@example.com"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            v-model="formData.password"
            type="password"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="ab123!/\"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Pasport seriyasi</label
            >
            <input
              v-model="formData.passport"
              type="text"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="AA1234567"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Tug'ilgan sana</label
            >
            <input
              v-model="formData.birthDate"
              type="date"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Loyaltilik darajasi</label
            >
            <select
              v-model="formData.loyalty"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Bronza">Bronza</option>
              <option value="Kumush">Kumush</option>
              <option value="Oltin">Oltin</option>
              <option value="Platina">Platina</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Holati</label
            >
            <select
              v-model="formData.status"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="active">Faol</option>
              <option value="inactive">Faol emas</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Manzil</label
          >
          <textarea
            v-model="formData.adress"
            rows="2"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Manzil..."
          ></textarea>
        </div>
        <!-- Error message -->
        <div
          v-if="error"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        >
          {{ error }}
        </div>

        <!-- Modal footer -->
        <div class="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            <span v-if="loading">Saqlanmoqda...</span>
            <span v-else>{{ isEditing ? "Saqlash" : "Qo'shish" }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from "vue";
import { useClientStore } from "@/stores/clients";

const props = defineProps({
  show: Boolean,
  client: Object,
});

const emit = defineEmits(["close", "saved"]);

const clientStore = useClientStore();
const loading = ref(false);
const error = ref("");

const formData = reactive({
  name: "",
  phone: "",
  email: "",
  passport: "",
  password: "",
  birthDate: "",
  loyalty: "bronze",
  status: "active",
  adress: "",
  notes: "",
});

const isEditing = computed(() => !!props.client);

// Watch for client prop changes

const resetForm = () => {
  Object.assign(formData, {
    name: "",
    phone: "",
    email: "",
    passport: "",
    password: "",
    birthDate: "",
    loyalty: "bronze",
    status: "active",
    adress: "",
    notes: "",
  });
  error.value = "";
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = "";
  // console.log(formData, props.client);
  try {
    if (isEditing.value) {
      await clientStore.updateClient(props.client.id, formData);
    } else {
      await clientStore.createClient(formData);
    }
    emit("saved");
    emit("close");
  } catch (err) {
    console.log(err);
    error.value =
      err.response?.data?.message ||
      "Xatolik yuz berdi. Iltimos, qayta urunib ko'ring.";
  } finally {
    loading.value = false;
  }
};
watch(
  () => props.client,
  (newClient) => {
    if (newClient) {
      // console.log(newClient);
      newClient.password = "";
      newClient.birthDate = new Date(newClient.birthDate)
        .toISOString()
        .split("T")[0];
      Object.assign(formData, newClient);
    } else {
      resetForm();
    }
  },
  { immediate: true }
);
</script>
