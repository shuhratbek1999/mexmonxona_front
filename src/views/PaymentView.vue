<template>
  <div class="payment-view">
    <div class="container mx-auto p-6">
      <!-- Sarlavha -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">To'lov Boshqaruvi</h1>
        <p class="text-gray-600 mt-2">Bronlar uchun to'lovlarni boshqaring</p>
      </div>

      <!-- Statistika -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <i class="fas fa-money-bill-wave text-blue-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Jami Daromad</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ formatCurrency(paymentStore.totalRevenue) }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <i class="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">To'langanlar</p>
              <p class="text-2xl font-bold text-gray-900">
                {{
                  paymentStore.payments.filter((p) => p.status === "paid")
                    .length
                }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <i class="fas fa-clock text-yellow-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Kutilayotgan</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ paymentStore.pendingPayments.length }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Xatolik xabari -->
      <div
        v-if="paymentStore.error"
        class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
      >
        {{ paymentStore.error }}
        <button
          @click="paymentStore.clearError()"
          class="float-right font-bold"
        >
          ×
        </button>
      </div>

      <!-- Filtrlar -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Holati</label
            >
            <select
              v-model="filters.status"
              class="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Hammasi</option>
              <option value="pending">Kutilmoqda</option>
              <option value="paid">To'langan</option>
              <option value="failed">Xatolik</option>
              <option value="refunded">Qaytarilgan</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >To'lov turi</label
            >
            <select
              v-model="filters.type"
              class="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Hammasi</option>
              <option value="cash">Naqd</option>
              <option value="card">Karta</option>
              <option value="transfer">O'tkazma</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Sana</label
            >
            <input
              type="date"
              v-model="filters.date"
              class="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div class="flex items-end">
            <button
              @click="resetFilters"
              class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Tozalash
            </button>
          </div>
        </div>
      </div>

      <!-- To'lovlar jadvali -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div
          class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
        >
          <h2 class="text-lg font-semibold text-gray-800">
            To'lovlar Ro'yxati
          </h2>
          <button
            @click="showCreateModal = true"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <i class="fas fa-plus mr-2"></i>
            Yangi To'lov
          </button>
        </div>

        <!-- Yuklanish -->
        <div v-if="paymentStore.loading" class="p-8 text-center">
          <i class="fas fa-spinner fa-spin text-2xl text-blue-600"></i>
          <p class="mt-2 text-gray-600">Yuklanmoqda...</p>
        </div>

        <!-- Jadval -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Bron ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Miqdor
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Turi
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Holati
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  To'langan Sana
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="payment in filteredPayments"
                :key="payment.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium text-gray-900"
                    >#{{ payment.bron_id }}</span
                  >
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-bold text-green-600">
                    {{ formatCurrency(payment.amount) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getPaymentTypeClass(payment.type)"
                  >
                    {{ getPaymentTypeText(payment.type) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusClass(payment.status)"
                  >
                    {{ getStatusText(payment.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(payment.paid_date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    @click="viewPayment(payment)"
                    class="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <i class="fas fa-eye"></i>
                  </button>
                  <button
                    @click="editPayment(payment)"
                    class="text-green-600 hover:text-green-900 mr-3"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    @click="deletePayment(payment.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Bo'sh holat -->
          <div v-if="filteredPayments.length === 0" class="text-center py-8">
            <i class="fas fa-receipt text-4xl text-gray-300 mb-4"></i>
            <p class="text-gray-500">To'lovlar topilmadi</p>
          </div>
        </div>
      </div>

      <!-- To'lov yaratish/modal -->
      <PaymentModal
        v-if="showCreateModal"
        :payment="null"
        @save="handleSavePayment"
        @close="showCreateModal = false"
      />

      <!-- To'lovni tahrirlash modal -->
      <PaymentModal
        v-if="showEditModal && selectedPayment"
        :payment="selectedPayment"
        @save="handleUpdatePayment"
        @close="showEditModal = false"
      />

      <!-- To'lov ma'lumotlari modal -->
      <PaymentDetailModal
        v-if="showDetailModal && selectedPayment"
        :payment="selectedPayment"
        @close="showDetailModal = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePaymentStore } from "@/stores/paymentStore";
import PaymentModal from "@/components/payment/PaymentModal.vue";
import PaymentDetailModal from "@/components/payment/PaymentDetailModal.vue";

const paymentStore = usePaymentStore();

// Modal holatlari
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDetailModal = ref(false);
const selectedPayment = ref(null);

// Filtrlar
const filters = ref({
  status: "",
  type: "",
  date: "",
});

// Filtrlangan to'lovlar
const filteredPayments = computed(() => {
  let result = paymentStore.payments;

  if (filters.value.status) {
    result = result.filter((p) => p.status === filters.value.status);
  }

  if (filters.value.type) {
    result = result.filter((p) => p.type === filters.value.type);
  }

  if (filters.value.date) {
    result = result.filter((p) => p.paid_date?.startsWith(filters.value.date));
  }

  return result;
});

// Formatlash funksiyalari
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("uz-UZ");
};

const getStatusClass = (status) => {
  const classes = {
    pending: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    refunded: "bg-gray-100 text-gray-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getStatusText = (status) => {
  const texts = {
    pending: "Kutilmoqda",
    paid: "To'langan",
    failed: "Xatolik",
    refunded: "Qaytarilgan",
  };
  return texts[status] || status;
};

const getPaymentTypeClass = (type) => {
  const classes = {
    cash: "bg-blue-100 text-blue-800",
    card: "bg-purple-100 text-purple-800",
    transfer: "bg-indigo-100 text-indigo-800",
  };
  return classes[type] || "bg-gray-100 text-gray-800";
};

const getPaymentTypeText = (type) => {
  const texts = {
    cash: "Naqd",
    card: "Karta",
    transfer: "O'tkazma",
  };
  return texts[type] || type;
};

// Amallar
const viewPayment = (payment) => {
  selectedPayment.value = payment;
  showDetailModal.value = true;
};

const editPayment = (payment) => {
  selectedPayment.value = { ...payment };
  showEditModal.value = true;
};

const deletePayment = async (id) => {
  if (confirm("Haqiqatan ham bu to'lovni o'chirmoqchimisiz?")) {
    await paymentStore.deletePayment(id);
    await paymentStore.fetchPayments();
  }
};

const handleSavePayment = async (paymentData) => {
  await paymentStore.createPayment(paymentData);
  showCreateModal.value = false;
  await paymentStore.fetchPayments();
};

const handleUpdatePayment = async (paymentData) => {
  await paymentStore.updatePayment(selectedPayment.value.id, paymentData);
  showEditModal.value = false;
  await paymentStore.fetchPayments();
};

const resetFilters = () => {
  filters.value = {
    status: "",
    type: "",
    date: "",
  };
};

// Komponent yuklanganda
onMounted(async () => {
  await paymentStore.fetchPayments();
});
</script>

<style scoped>
.payment-view {
  min-height: 100vh;
  background-color: #f8fafc;
}
</style>
