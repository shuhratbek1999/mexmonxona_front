<template>
  <div class="department-management p-6 bg-gray-50 min-h-screen">
    <!-- Boshqaruv paneli -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
    >
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">
        Departmentlar Boshqaruvi
      </h1>
      <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <div class="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Departmentlarni qidirish..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            v-model="searchQuery"
          />
          <span class="absolute left-3 top-2.5 text-gray-400">
            <i class="fas fa-search"></i>
          </span>
        </div>
        <button
          @click="openAddModal"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
        >
          <i class="fas fa-plus mr-2"></i> Yangi Department
        </button>
      </div>
    </div>

    <!-- Departmentlar ro'yxati -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div
        class="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <h2 class="text-xl font-semibold text-gray-700 mb-2 sm:mb-0">
          Departmentlar Ro'yxati
        </h2>
        <div class="text-sm text-gray-500">
          Jami:
          <span class="font-semibold">{{ filteredDepartments.length }} ta</span>
        </div>
      </div>

      <!-- Yuklanmoqda... -->
      <div
        v-if="departmentStore.loading"
        class="flex justify-center items-center py-12"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>

      <!-- Xatolik -->
      <div
        v-else-if="departmentStore.error"
        class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4"
        role="alert"
      >
        <p class="font-bold">Xatolik</p>
        <p>{{ departmentStore.error }}</p>
      </div>

      <!-- Departmentlar jadvali -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="sortBy('id')"
              >
                ID
                <span v-if="sortField === 'id'" class="ml-1">
                  {{ sortOrder === "asc" ? "↑" : "↓" }}
                </span>
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="sortBy('name')"
              >
                Nomi
                <span v-if="sortField === 'name'" class="ml-1">
                  {{ sortOrder === "asc" ? "↑" : "↓" }}
                </span>
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tavsif
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Harakatlar
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="department in filteredDepartments"
              :key="department.id"
              class="hover:bg-gray-50 transition-colors duration-150"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {{ department.id }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold"
              >
                {{ department.name }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ department.description || "-" }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="openEditModal(department)"
                  class="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  <i class="fas fa-edit mr-1"></i> Tahrirlash
                </button>
                <button
                  @click="deleteDepartment(department.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  <i class="fas fa-trash mr-1"></i> O'chirish
                </button>
              </td>
            </tr>
            <tr v-if="filteredDepartments.length === 0">
              <td
                colspan="4"
                class="px-6 py-8 text-center text-sm text-gray-500"
              >
                Hech qanday department topilmadi
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Department qo'shish/tahrirlash modali -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal sarlavhasi -->
        <div
          class="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white"
        >
          <h3 class="text-xl font-semibold text-gray-800">
            {{ isEditing ? "Departmentni Tahrirlash" : "Yangi Department" }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Modal tarkibi -->
        <form @submit.prevent="saveDepartment" class="px-6 py-4">
          <!-- Department nomi -->
          <div class="mb-4">
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Department nomi *</label
            >
            <input
              v-model="formData.name"
              type="text"
              id="name"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="IT Department"
            />
          </div>

          <!-- Tavsif -->
          <div class="mb-6">
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Tavsif</label
            >
            <textarea
              v-model="formData.description"
              id="description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Departmentning asosiy vazifalari..."
            ></textarea>
          </div>

          <!-- Tugmalar -->
          <div
            class="flex justify-end space-x-3 pt-4 border-t sticky bottom-0 bg-white"
          >
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              :disabled="departmentStore.loading"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition flex items-center"
            >
              <i class="fas fa-save mr-2"></i>
              {{ departmentStore.loading ? "Saqlanmoqda..." : "Saqlash" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Muvaffaqiyat xabari -->
    <div
      v-if="showSuccessMessage"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
    >
      <i class="fas fa-check-circle mr-2"></i>
      <span>{{ successMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDepartmentStore } from "@/stores/departmentStore";

// Pinia store'ini ishlatish
const departmentStore = useDepartmentStore();

// Holatlar
const searchQuery = ref("");
const sortField = ref("id");
const sortOrder = ref("asc");
const showModal = ref(false);
const isEditing = ref(false);
const showSuccessMessage = ref(false);
const successMessage = ref("");

// Form ma'lumotlari
const formData = ref({
  id: null,
  name: "",
  description: "",
});

// Filtrlangan departmentlar ro'yxati
const filteredDepartments = computed(() => {
  let result = [...departmentStore.departments];

  // Qidiruv bo'yicha filtrlash
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (department) =>
        department.name.toLowerCase().includes(query) ||
        (department.description &&
          department.description.toLowerCase().includes(query))
    );
  }

  // Saralash
  result.sort((a, b) => {
    let modifier = 1;
    if (sortOrder.value === "desc") modifier = -1;

    if (a[sortField.value] < b[sortField.value]) return -1 * modifier;
    if (a[sortField.value] > b[sortField.value]) return 1 * modifier;
    return 0;
  });

  return result;
});

// Saralash funksiyasi
const sortBy = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortOrder.value = "asc";
  }
};

// Modalni ochish va yopish
const openAddModal = () => {
  isEditing.value = false;
  formData.value = {
    id: null,
    name: "",
    description: "",
  };
  showModal.value = true;
};

const openEditModal = (department) => {
  isEditing.value = true;
  formData.value = { ...department };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

// Departmentni saqlash
const saveDepartment = async () => {
  try {
    if (isEditing.value) {
      // Tahrirlash
      await departmentStore.updateDepartment(formData.value.id, formData.value);
      showSuccess("Department muvaffaqiyatli tahrirlandi");
    } else {
      // Yangi qo'shish
      await departmentStore.addDepartment(formData.value);
      showSuccess("Yangi department muvaffaqiyatli qo'shildi");
    }
    closeModal();
  } catch (error) {
    console.error("Xatolik:", error);
  }
};

// Departmentni o'chirish
const deleteDepartment = async (id) => {
  if (confirm("Haqiqatan ham bu departmentni o‘chirmoqchimisiz?")) {
    try {
      await departmentStore.deleteDepartment(id);
      showSuccess("Department muvaffaqiyatli o'chirildi");
    } catch (error) {
      console.error("Xatolik:", error);
    }
  }
};

// Muvaffaqiyat xabarini ko'rsatish
const showSuccess = (message) => {
  successMessage.value = message;
  showSuccessMessage.value = true;
  setTimeout(() => {
    showSuccessMessage.value = false;
  }, 3000);
};

// Komponent yuklanganda departmentlarni olish
onMounted(() => {
  departmentStore.fetchDepartments();
});
</script>

<style scoped>
.department-management {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
}

th {
  cursor: pointer;
  user-select: none;
}

th:hover {
  background-color: #f3f4f6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
