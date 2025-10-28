<template>
  <div class="employee-management p-6 bg-gray-50 min-h-screen">
    <!-- Boshqaruv paneli -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
    >
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">
        Xodimlar Boshqaruvi
      </h1>
      <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <div class="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Xodimlarni qidirish..."
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
          <i class="fas fa-plus mr-2"></i> Xodim Qo'shish
        </button>
      </div>
    </div>

    <!-- Xodimlar ro'yxati -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div
        class="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <h2 class="text-xl font-semibold text-gray-700 mb-2 sm:mb-0">
          Xodimlar Ro'yxati
        </h2>
        <div class="text-sm text-gray-500">
          Jami:
          <span class="font-semibold"
            >{{ filteredEmployees.length }} ta xodim</span
          >
        </div>
      </div>

      <!-- Yuklanmoqda... -->
      <div
        v-if="employeeStore.loading"
        class="flex justify-center items-center py-12"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        ></div>
      </div>

      <!-- Xatolik -->
      <div
        v-else-if="employeeStore.error"
        class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4"
        role="alert"
      >
        <p class="font-bold">Xatolik</p>
        <p>{{ employeeStore.error }}</p>
      </div>

      <!-- Xodimlar jadvali -->
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
                Ism
                <span v-if="sortField === 'name'" class="ml-1">
                  {{ sortOrder === "asc" ? "↑" : "↓" }}
                </span>
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="sortBy('position')"
              >
                Lavozim
                <span v-if="sortField === 'position'" class="ml-1">
                  {{ sortOrder === "asc" ? "↑" : "↓" }}
                </span>
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="sortBy('department')"
              >
                Bo'lim
                <span v-if="sortField === 'department'" class="ml-1">
                  {{ sortOrder === "asc" ? "↑" : "↓" }}
                </span>
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="sortBy('salary')"
              >
                Maosh
                <span v-if="sortField === 'salary'" class="ml-1">
                  {{ sortOrder === "asc" ? "↑" : "↓" }}
                </span>
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="sortBy('email')"
              >
                Email
                <span v-if="sortField === 'email'" class="ml-1">
                  {{ sortOrder === "asc" ? "↑" : "↓" }}
                </span>
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="sortBy('phone')"
              >
                Telefon
                <span v-if="sortField === 'phone'" class="ml-1">
                  {{ sortOrder === "asc" ? "↑" : "↓" }}
                </span>
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
              v-for="employee in filteredEmployees"
              :key="employee.id"
              class="hover:bg-gray-50 transition-colors duration-150"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {{ employee.id }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold"
              >
                {{ employee.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ employee.position }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                >
                  {{ employee.department }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <span class="font-mono"
                  >{{ employee.salary.toLocaleString() }} $</span
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ employee.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ employee.phone }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="openEditModal(employee)"
                  class="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  <i class="fas fa-edit mr-1"></i> Tahrirlash
                </button>
                <button
                  @click="deleteEmployee(employee.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  <i class="fas fa-trash mr-1"></i> O'chirish
                </button>
              </td>
            </tr>
            <tr v-if="filteredEmployees.length === 0">
              <td
                colspan="9"
                class="px-6 py-8 text-center text-sm text-gray-500"
              >
                Hech qanday xodim topilmadi
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Xodim qo'shish/tahrirlash modali -->
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
            {{ isEditing ? "Xodimni Tahrirlash" : "Yangi Xodim Qo'shish" }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Modal tarkibi -->
        <form @submit.prevent="saveEmployee" class="px-6 py-4">
          <!-- Ism familiya -->
          <div class="mb-4">
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Ism Familiya *</label
            >
            <input
              v-model="formData.name"
              type="text"
              id="name"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Ali Valiyev"
            />
          </div>

          <!-- Lavozim -->
          <div class="mb-4">
            <label
              for="position"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Lavozim *</label
            >
            <input
              v-model="formData.position"
              type="text"
              id="position"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Dasturchi"
            />
          </div>

          <!-- Bo'lim -->
          <div class="mb-4">
            <label
              for="department"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Bo'lim *</label
            >
            <select
              v-model="formData.department"
              id="department"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="" disabled selected>Bo'limni tanlang</option>
              <option
                v-for="dept in employeeStore.departmentsAll"
                :key="dept.id"
                :value="dept.id"
              >
                {{ dept.name }}
              </option>
            </select>
          </div>

          <!-- Maosh -->
          <div class="mb-4">
            <label
              for="salary"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Maosh ($) *</label
            >
            <input
              v-model.number="formData.salary"
              type="number"
              id="salary"
              required
              min="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="1500"
            />
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Email *</label
            >
            <input
              v-model="formData.email"
              type="email"
              id="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="ali.valiyev@example.com"
            />
          </div>

          <!-- Telefon raqami -->
          <div class="mb-4">
            <label
              for="phone"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Telefon raqami *</label
            >
            <input
              v-model="formData.phone"
              type="tel"
              id="phone"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="+998 90 123 45 67"
            />
          </div>

          <!-- Ish boshlash sanasi -->
          <div class="mb-6">
            <label
              for="start_date"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Ish boshlash sanasi *</label
            >
            <input
              v-model="formData.start_date"
              type="date"
              id="start_date"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
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
              :disabled="employeeStore.loading"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition flex items-center"
            >
              <i class="fas fa-save mr-2"></i>
              {{ employeeStore.loading ? "Saqlanmoqda..." : "Saqlash" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Xodim muvaffaqiyatli qo'shildi xabari -->
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
import { useEmployeeStore } from "@/stores/employeeStore";

// Pinia store'ini ishlatish
const employeeStore = useEmployeeStore();

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
  position: "",
  department: "",
  salary: "",
  email: "",
  phone: "",
  start_date: new Date().toISOString().split("T")[0],
});

// Filtrlangan xodimlar ro'yxati
const filteredEmployees = computed(() => {
  let result = [...employeeStore.employees];

  // Qidiruv bo'yicha filtrlash
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.position.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.phone.toLowerCase().includes(query)
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

// Sana formatlash
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("uz-UZ", options);
};

// Modalni ochish va yopish
const openAddModal = () => {
  isEditing.value = false;
  formData.value = {
    id: null,
    name: "",
    position: "",
    department: "",
    salary: "",
    email: "",
    phone: "",
    start_date: new Date().toISOString().split("T")[0],
  };
  showModal.value = true;
};

const openEditModal = (employee) => {
  isEditing.value = true;
  formData.value = { ...employee };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

// Xodimni saqlash
const saveEmployee = async () => {
  try {
    if (isEditing.value) {
      // Tahrirlash
      await employeeStore.updateEmployee(formData.value.id, formData.value);
      showSuccess("Xodim muvaffaqiyatli tahrirlandi");
    } else {
      // Yangi qo'shish
      await employeeStore.addEmployee(formData.value);
      showSuccess("Yangi xodim muvaffaqiyatli qo'shildi");
    }
    closeModal();
  } catch (error) {
    console.error("Xatolik:", error);
  }
};

// Xodimni o'chirish
const deleteEmployee = async (id) => {
  if (confirm("Haqiqatan ham bu xodimni o‘chirmoqchimisiz?")) {
    try {
      await employeeStore.deleteEmployee(id);
      showSuccess("Xodim muvaffaqiyatli o'chirildi");
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

// Komponent yuklanganda xodimlarni olish
onMounted(() => {
  employeeStore.fetchEmployees();
  employeeStore.departments();
});
</script>

<style scoped>
.employee-management {
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
