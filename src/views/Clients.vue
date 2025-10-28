<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Mijozlar Bazaasi</h1>
      <button
        @click="showClientForm = true"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <i class="fas fa-plus mr-2"></i>
        Yangi mijoz qo'shish
      </button>
    </div>

    <!-- Filtrlar -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Loyaltilik darajasi</label
          >
          <select
            v-model="filters.loyalty"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Barchasi</option>
            <option value="bronze">Bronza</option>
            <option value="silver">Kumush</option>
            <option value="gold">Oltin</option>
            <option value="platinum">Platina</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Faollik holati</label
          >
          <select
            v-model="filters.status"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Barchasi</option>
            <option value="active">Faol</option>
            <option value="inactive">Faol emas</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Bronlar soni</label
          >
          <select
            v-model="filters.bookingsCount"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Barchasi</option>
            <option value="1-5">1-5</option>
            <option value="5-10">5-10</option>
            <option value="10+">10+</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Qidiruv</label
          >
          <div class="relative">
            <input
              v-model="filters.search"
              type="text"
              placeholder="Mijoz ismi yoki telefon..."
              class="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Mijozlar ro'yxati -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Mijoz
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Aloqa
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Loyaltilik
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Bronlar soni
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Holati
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Harakatlar
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="client in filteredClients" :key="client.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="client.avatar || '/api/placeholder/40/40'"
                    alt=""
                  />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ client.name }}
                  </div>
                  <div class="text-sm text-gray-500">ID: {{ client.id }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ client.phone }}</div>
              <div class="text-sm text-gray-500">{{ client.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-yellow-100 text-yellow-800':
                      client.loyalty === 'bronze',
                    'bg-gray-100 text-gray-800': client.loyalty === 'silver',
                    'bg-yellow-100 text-yellow-800': client.loyalty === 'gold',
                    'bg-blue-100 text-blue-800': client.loyalty === 'platinum',
                  }"
                >
                  {{ loyaltyText(client.loyalty) }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ client.bookingsCount }}
              </div>
              <div class="text-sm text-gray-500">
                so'ngi bron:
                {{
                  client.lastBooking ? formatDate(client.lastBooking) : "Yo'q"
                }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': client.status === 'active',
                  'bg-red-100 text-red-800': client.status === 'inactive',
                }"
              >
                {{ clientStatusText(client.status) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex space-x-2">
                <button
                  @click="editClient(client)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="viewClient(client)"
                  class="text-green-600 hover:text-green-900"
                >
                  <i class="fas fa-eye"></i>
                </button>
                <button
                  @click="toggleClientStatus(client)"
                  class="text-red-600 hover:text-red-900"
                >
                  <i
                    class="fas"
                    :class="
                      client.status === 'active' ? 'fa-trash' : 'fa-trash'
                    "
                  ></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mijoz qo'shish/tahrirlash modali -->
    <ClientFormModal
      :show="showClientForm"
      :client="selectedClient"
      @close="showClientForm = false"
      @saved="handleClientSaved"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useClientStore } from "@/stores/clients";
import ClientFormModal from "@/components/clients/ClientFormModal.vue";

const clientStore = useClientStore();
const showClientForm = ref(false);
const selectedClient = ref(null);

const filters = ref({
  loyalty: "",
  status: "",
  bookingsCount: "",
  search: "",
});

// Mijozlarni filtrlash
const filteredClients = computed(() => {
  // return [];
  return clientStore.clients.filter((client) => {
    // Loyaltilik darajasi bo'yicha filtrlash
    if (filters.value.loyalty && client.loyalty !== filters.value.loyalty)
      return false;

    // Holati bo'yicha filtrlash
    if (filters.value.status && client.status !== filters.value.status)
      return false;

    // Bronlar soni bo'yicha filtrlash
    if (filters.value.bookingsCount) {
      const [min, max] = filters.value.bookingsCount.split("-").map(Number);
      if (max && (client.bookingsCount < min || client.bookingsCount > max))
        return false;
      if (!max && client.bookingsCount < min) return false;
    }

    // Qidiruv bo'yicha filtrlash
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase();
      const nameMatch = client.name.toLowerCase().includes(searchTerm);
      const phoneMatch = client.phone.includes(searchTerm);
      const emailMatch = client.email.toLowerCase().includes(searchTerm);

      if (!nameMatch && !phoneMatch && !emailMatch) return false;
    }

    return true;
  });
});

// Loyaltilik darajasini matn ko'rinishida olish
const loyaltyText = (loyalty) => {
  const loyaltyMap = {
    bronze: "Bronza",
    silver: "Kumush",
    gold: "Oltin",
    platinum: "Platina",
  };
  return loyaltyMap[loyalty] || loyalty;
};

// Mijoz holatini matn ko'rinishida olish
const clientStatusText = (status) => {
  const statusMap = {
    active: "Faol",
    inactive: "Faol emas",
  };
  return statusMap[status] || status;
};

// Sana formati
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

// Mijozi tahrirlash
const editClient = (client) => {
  selectedClient.value = { ...client };
  showClientForm.value = true;
};

// Mijozi ko'rish
const viewClient = (client) => {
  // Tafsilotlar sahifasiga yo'naltirish yoki modal ochish
  console.log("View client details:", client);
};

// Mijoz holatini o'zgartirish
const toggleClientStatus = async (client) => {
  const newStatus = client.status === "active" ? "inactive" : "active";
  try {
    await clientStore.updateClient(client.id, { status: newStatus });
    clientStore.fetchClients();
  } catch (error) {
    console.error("Mijoz holatini o'zgartirishda xatolik:", error);
  }
};

// Mijoz saqlandi
const handleClientSaved = () => {
  showClientForm.value = false;
  selectedClient.value = null;
  clientStore.fetchClients();
};

onMounted(() => {
  clientStore.fetchClients();
});
</script>
