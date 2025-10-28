<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div
        class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
      >
        <h3 class="text-lg font-semibold text-gray-800">To'lov Ma'lumotlari</h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600"
        >
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <div class="p-6 space-y-4">
        <div class="flex justify-between">
          <span class="text-gray-600">Bron ID:</span>
          <span class="font-semibold">#{{ payment.bron_id }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Client Name:</span>
          <span class="font-semibold">{{ payment.client?.name }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-600">Miqdor:</span>
          <span class="font-bold text-green-600">{{
            formatCurrency(payment.amount)
          }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-600">To'lov Turi:</span>
          <span
            :class="getPaymentTypeClass(payment.type)"
            class="px-2 py-1 rounded-full text-xs font-medium"
          >
            {{ getPaymentTypeText(payment.type) }}
          </span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-600">Holati:</span>
          <span
            :class="getStatusClass(payment.status)"
            class="px-2 py-1 rounded-full text-xs font-medium"
          >
            {{ getStatusText(payment.status) }}
          </span>
        </div>

        <div class="flex justify-between">
          <span class="text-gray-600">To'langan Sana:</span>
          <span class="font-medium">{{ formatDate(payment.paid_date) }}</span>
        </div>

        <div v-if="payment.created_at" class="flex justify-between">
          <span class="text-gray-600">Yaratilgan:</span>
          <span class="text-sm text-gray-500">{{
            formatDateTime(payment.created_at)
          }}</span>
        </div>
      </div>

      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <button
          @click="$emit('close')"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Yopish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  payment: {
    type: Object,
    required: true,
  },
});

defineEmits(["close"]);

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

const formatDateTime = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("uz-UZ");
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
</script>
