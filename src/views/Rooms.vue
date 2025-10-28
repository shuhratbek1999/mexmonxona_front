<template>
  <div class="container mx-auto p-6">
    <!-- Sarlavha va qo'shish tugmasi -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Xonalar Boshqaruvi</h1>
      <button
        @click="showModal = true"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
      >
        <i class="fas fa-plus"></i>
        <span>Yangi xona</span>
      </button>
    </div>

    <!-- Statistik kartalar -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow border">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <i class="fas fa-door-open text-blue-500 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-500">Jami xonalar</p>
            <p class="text-2xl font-bold">{{ rooms.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <i class="fas fa-bed text-green-500 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-500">Bo'sh xonalar</p>
            <p class="text-2xl font-bold">{{ availableRooms.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <i class="fas fa-user-friends text-red-500 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-500">Band xonalar</p>
            <p class="text-2xl font-bold">{{ occupiedRooms.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <i class="fas fa-tools text-yellow-500 text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-500">Ta'mirlanayotgan</p>
            <p class="text-2xl font-bold">{{ maintenanceRooms.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Xonalar jadvali -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Loading -->
      <div v-if="roomStore.loading" class="p-8 text-center">
        <i class="fas fa-spinner fa-spin text-2xl text-blue-500"></i>
        <p class="mt-2 text-gray-500">Xonalar yuklanmoqda...</p>
      </div>

      <!-- Xatolik -->
      <div
        v-else-if="roomStore.error"
        class="p-4 bg-red-50 border border-red-200 rounded m-4"
      >
        <div class="flex items-center">
          <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
          <span class="text-red-700">{{ roomStore.error }}</span>
        </div>
      </div>

      <!-- Jadval -->
      <div v-else>
        <div class="p-4 border-b">
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div class="relative flex-1 max-w-md">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Xona raqami bo'yicha qidirish..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>

            <div class="mt-2 md:mt-0">
              <select
                v-model="statusFilter"
                class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Barcha holatlar</option>
                <option value="empty">Bo'sh</option>
                <option value="busy">Band</option>
                <option value="maintenance">Ta'mirlanmoqda</option>
                <option value="cleaning_need">Tozalanmoqda</option>
              </select>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Xona
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Turi
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Narx
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sig'im
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Holati
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Harakatlar
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="room in filteredRooms"
                :key="room.id"
                class="hover:bg-gray-50 transition"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        v-if="room.images && room.images.length > 0"
                        :src="getImageUrl(room.images[0].image_url)"
                        class="h-10 w-10 rounded-lg object-cover"
                      />
                      <div
                        v-else
                        class="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center"
                      >
                        <i class="fas fa-image text-gray-400"></i>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ room.numbers }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{
                          room.description
                            ? room.description.substring(0, 30) + "..."
                            : "Tavsif yo'q"
                        }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 capitalize">
                    {{ getRoomType(room.tur) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    ${{ room.price }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ room.capacity }} kishi
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusClasses(room.status)"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  >
                    {{ getStatusText(room.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="editRoom(room)"
                      class="text-blue-600 hover:text-blue-900 transition"
                      title="Tahrirlash"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      @click="deleteRoom(room.id)"
                      class="text-red-600 hover:text-red-900 transition"
                      title="O'chirish"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Bo'sh ro'yxat -->
        <div v-if="filteredRooms.length === 0" class="text-center py-8">
          <i class="fas fa-door-open text-4xl text-gray-300 mb-2"></i>
          <p class="text-gray-500">Xonalar topilmadi</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <RoomFormModal
      :show="showModal"
      :room="currentRoom"
      @close="closeModal"
      @saved="onRoomSaved"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from "vue";
import { useRoomStore } from "@/stores/rooms";
import RoomFormModal from "@/components/rooms/RoomFormModal.vue";

const roomStore = useRoomStore();
const showModal = ref(false);
const currentRoom = ref(null);
const searchQuery = ref("");
const statusFilter = ref("");
const BASE_URL = inject("BASE_URL");
// Computed properties
const rooms = computed(() => roomStore.rooms);
const availableRooms = computed(() => roomStore.availableRooms);
const occupiedRooms = computed(() => roomStore.occupiedRooms);
const maintenanceRooms = computed(() => roomStore.maintenanceRooms);

const filteredRooms = computed(() => {
  let filtered = rooms.value;

  if (searchQuery.value) {
    filtered = filtered.filter((room) =>
      room.numbers.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (statusFilter.value) {
    filtered = filtered.filter((room) => room.status === statusFilter.value);
  }

  return filtered;
});

// Methods
function getImageUrl(imagePath) {
  return imagePath.startsWith("http")
    ? imagePath
    : `${BASE_URL}/img/${imagePath}`;
}

function getRoomType(type) {
  const types = {
    standart: "Standard",
    lyuks: "Lyuks",
    president: "VIP",
    premium: "Premium",
  };
  return types[type] || type;
}

function getStatusText(status) {
  const statusMap = {
    empty: "Bo'sh",
    busy: "Band",
    maintenance: "Ta'mirlanmoqda",
    cleaning_need: "Tozalanmoqda",
  };
  return statusMap[status] || status;
}

function getStatusClasses(status) {
  const classes = {
    empty: "bg-green-100 text-green-800",
    busy: "bg-red-100 text-red-800",
    maintenance: "bg-yellow-100 text-yellow-800",
    cleaning_need: "bg-blue-100 text-blue-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
}

function editRoom(room) {
  currentRoom.value = room;
  showModal.value = true;
}

async function deleteRoom(id) {
  if (confirm("Haqiqatan ham bu xonani o'chirmoqchimisiz?")) {
    try {
      await roomStore.deleteRoom(id);
    } catch (error) {
      // Xatolik store tomonidan ko'rsatiladi
    }
  }
}

function closeModal() {
  showModal.value = false;
  currentRoom.value = null;
}

function onRoomSaved() {
  closeModal();
  roomStore.fetchRooms();
}

// Lifecycle
onMounted(() => {
  roomStore.fetchRooms();
  roomStore.allAmenities();
});
</script>
