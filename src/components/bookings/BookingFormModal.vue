<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white"
    >
      <!-- Modal header -->
      <div class="flex justify-between items-center pb-3 border-b">
        <h3 class="text-xl font-semibold">
          {{ isEditing ? "Bronni tahrirlash" : "Yangi bron qilish" }}
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
        <!-- Sana tanlash qismi -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Kirish sanasi *</label
            >
            <input
              v-model="formData.arrival_date"
              type="date"
              required
              :min="minDate"
              @change="checkRoomAvailability"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Chiqish sanasi *</label
            >
            <input
              v-model="formData.departure_date"
              type="date"
              required
              :min="formData.arrival_date || minDate"
              @change="checkRoomAvailability"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Xona tanlash qismi -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Xona *</label
          >
          <select
            v-model="formData.xona_id"
            required
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Xonani tanlang</option>
            <option
              v-for="room in allAvailableRooms"
              :key="room.id"
              :value="room.id"
              :disabled="isRoomDisabled(room.id)"
            >
              Xona {{ room.numbers }} - {{ roomTypeText(room.tur) }} (${{
                room.price
              }})
              <span
                v-if="isRoomDisabled(room.id) && room.id !== originalRoomId"
              >
                (Band)
              </span>
              <span v-else-if="room.id === originalRoomId">
                (Hozirgi tanlangan)
              </span>
              <span v-else> (Bo'sh) </span>
            </option>
          </select>

          <!-- Xona bandligi xabari -->
          <div
            v-if="
              formData.xona_id &&
              isRoomOccupied(formData.xona_id) &&
              formData.xona_id !== originalRoomId
            "
            class="text-red-500 text-sm mt-1"
          >
            Bu xona tanlangan sanalarda band! Iltimos, boshqa xona tanlang.
          </div>
          <div
            v-else-if="availableRooms.length === 0 && !isEditing"
            class="text-red-500 text-sm mt-1"
          >
            Tanlangan sanalarda barcha xonalar band. Iltimos, boshqa sanalarni
            tanlang.
          </div>
          <div
            v-else-if="isEditing && originalRoomId"
            class="text-blue-500 text-sm mt-1"
          >
            Hozirgi tanlangan xona: Xona {{ getRoomNumbers(originalRoomId) }}
          </div>
          <div v-else class="text-green-500 text-sm mt-1">
            {{ availableRooms.length }} ta xona mavjud
          </div>
        </div>

        <!-- Mijoz tanlash qismi -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Mijoz *</label
          >
          <select
            v-model="formData.mijoz_id"
            required
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Mijozi tanlang</option>
            <option
              v-for="client in clientStore.clients"
              :key="client.id"
              :value="client.id"
            >
              {{ client.name }} ({{ client.phone }})
            </option>
          </select>
        </div>

        <!-- Narx hisoblash qismi -->
        <div
          v-if="formData.xona_id"
          class="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Kechalar soni</label
            >
            <input
              :value="nights"
              type="number"
              readonly
              class="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Bir kecha narxi</label
            >
            <input
              :value="roomPrice"
              type="number"
              readonly
              class="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Jami narx</label
            >
            <input
              :value="totalPrice"
              type="number"
              readonly
              class="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 font-bold"
            />
          </div>
        </div>

        <!-- Status va to'lov holati -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Bron holati *</label
            >
            <select
              v-model="formData.status"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="pending">Kutilmoqda</option>
              <option value="confirmed">Tasdiqlangan</option>
              <option value="completed">Yakunlangan</option>
              <option value="cancelled">Bekor qilingan</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >To'lov holati</label
            >
            <select
              v-model="formData.payment_status"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="pending">To'lanmagan</option>
              <option value="partial">Qisman to'langan</option>
              <option value="paid">To'langan</option>
            </select>
          </div>
        </div>

        <!-- Qo'shimcha ma'lumotlar -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Qo'shimcha ma'lumotlar</label
          >
          <textarea
            v-model="formData.notes"
            rows="3"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Qo'shimcha ma'lumotlar..."
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
            :disabled="loading || !isFormValid"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            <span v-if="loading">Saqlanmoqda...</span>
            <span v-else>{{ isEditing ? "Saqlash" : "Bron qilish" }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive, onMounted } from "vue";
import { useBookingStore } from "@/stores/bookings";
import { useRoomStore } from "@/stores/rooms";
import { useClientStore } from "@/stores/clients";

const props = defineProps({
  show: Boolean,
  booking: Object,
});

const emit = defineEmits(["close", "saved"]);

const bookingStore = useBookingStore();
const roomStore = useRoomStore();
const clientStore = useClientStore();

const loading = ref(false);
const error = ref("");
const nights = ref(0);
const availableRooms = ref([]);
const originalRoomId = ref(null); // Asl xona ID sini saqlash uchun

const minDate = new Date().toISOString().split("T")[0];

const formData = reactive({
  mijoz_id: "",
  xona_id: "",
  arrival_date: "",
  departure_date: "",
  status: "pending",
  payment_status: "pending",
  notes: "",
});

const isEditing = computed(() => !!props.booking);

// Barcha mavjud xonalar (tahrirlashda original xonani ham qo'shish uchun)
const allAvailableRooms = computed(() => {
  if (!isEditing.value) {
    return availableRooms.value;
  }

  // Tahrirlash holati: availableRooms + original xona
  const allRooms = [...availableRooms.value];

  if (originalRoomId.value) {
    const originalRoom = roomStore.rooms.find(
      (room) => room.id === originalRoomId.value
    );
    if (
      originalRoom &&
      !allRooms.find((room) => room.id === originalRoomId.value)
    ) {
      allRooms.push(originalRoom);
    }
  }

  return allRooms;
});

// Form to'g'ri to'ldirilganligini tekshirish
const isFormValid = computed(() => {
  return (
    formData.mijoz_id &&
    formData.xona_id &&
    formData.arrival_date &&
    formData.departure_date &&
    formData.status &&
    // Agar xona band bo'lsa, faqat o'z xonasini tanlashga ruxsat berish
    (!isRoomOccupied(formData.xona_id) ||
      formData.xona_id === originalRoomId.value)
  );
});

// Xona narxini olish
const roomPrice = computed(() => {
  if (!formData.xona_id) return 0;
  const room = roomStore.rooms.find((r) => r.id == formData.xona_id);
  return room ? room.price : 0;
});

// Umumiy narxni hisoblash
const totalPrice = computed(() => {
  return nights.value * roomPrice.value;
});

// Xona raqamini olish
const getRoomNumbers = (roomId) => {
  const room = roomStore.rooms.find((r) => r.id == roomId);
  return room ? room.numbers : "";
};

// Kechalar sonini hisoblash
const calculateNights = () => {
  if (formData.arrival_date && formData.departure_date) {
    const arrivalDate = new Date(formData.arrival_date);
    const departureDate = new Date(formData.departure_date);
    const diffTime = departureDate.getTime() - arrivalDate.getTime();
    nights.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } else {
    nights.value = 0;
  }
};

// Xona turini matnga aylantirish
const roomTypeText = (type) => {
  const typeMap = {
    standard: "Standard",
    lux: "Lyuks",
    vip: "VIP",
  };
  return typeMap[type] || type;
};

// Xona bandligini tekshirish
const isRoomOccupied = (roomId) => {
  if (!formData.arrival_date || !formData.departure_date || !roomId)
    return false;

  // O'z xonasini band deb hisoblamaslik
  if (roomId === originalRoomId.value) return false;

  const arrival = new Date(formData.arrival_date);
  const departure = new Date(formData.departure_date);

  return bookingStore.bookings.some((booking) => {
    if (booking.status === "cancelled" || booking.id === props.booking?.id)
      return false;

    if (booking.xona_id == roomId) {
      const bookingArrival = new Date(booking.arrival_date);
      const bookingDeparture = new Date(booking.departure_date);

      // Sana to'qnashuvini tekshirish
      return arrival <= bookingDeparture && departure >= bookingArrival;
    }
    return false;
  });
};

// Xona disabled ekanligini tekshirish
const isRoomDisabled = (roomId) => {
  // Tahrirlashda original xona disabled bo'lmasin
  if (isEditing.value && roomId === originalRoomId.value) {
    return false;
  }

  return isRoomOccupied(roomId);
};

// Xona mavjudligini tekshirish
const checkRoomAvailability = async () => {
  if (!formData.arrival_date || !formData.departure_date) {
    availableRooms.value = [];
    return;
  }

  try {
    calculateNights();

    // Barcha xonalarni olish
    const allRooms = roomStore.rooms.filter((room) => room.status === "empty");

    // Band xonalarni aniqlash (o'z xonasidan tashqari)
    const bookedRoomIds = bookingStore.bookings
      .filter((booking) => {
        if (booking.status === "cancelled" || booking.id === props.booking?.id)
          return false;

        const bookingArrival = new Date(booking.arrival_date);
        const bookingDeparture = new Date(booking.departure_date);
        const selectedArrival = new Date(formData.arrival_date);
        const selectedDeparture = new Date(formData.departure_date);

        // Sana to'qnashuvini tekshirish
        return (
          selectedArrival <= bookingDeparture &&
          selectedDeparture >= bookingArrival
        );
      })
      .map((booking) => booking.xona_id);

    // Band bo'lmagan xonalarni filtrlash
    availableRooms.value = allRooms.filter(
      (room) => !bookedRoomIds.includes(room.id)
    );

    // console.log("Mavjud xonalar:", availableRooms.value);
    // console.log("Original xona ID:", originalRoomId.value);
  } catch (err) {
    console.error("Xona mavjudligini tekshirishda xatolik:", err);
    error.value = "Xona mavjudligini tekshirishda xatolik yuz berdi.";
  }
};

// Formani yuborish
const handleSubmit = async () => {
  loading.value = true;
  error.value = "";

  try {
    const bookingData = {
      ...formData,
      nights: nights.value,
      total_price: totalPrice.value,
    };

    if (isEditing.value) {
      await bookingStore.updateBooking(props.booking.id, bookingData);
    } else {
      await bookingStore.createBooking(bookingData);

      // Mijozning bronlar sonini yangilash
      if (formData.mijoz_id) {
        clientStore.incrementBookingsCount(formData.mijoz_id);
      }

      // Xona holatini yangilash
      if (formData.xona_id && formData.status === "confirmed") {
        roomStore.updateRoomStatus(formData.xona_id, { status: "busy" });
      }
    }

    emit("saved");
    emit("close");
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      "Xatolik yuz berdi. Iltimos, qayta urunib ko'ring.";
  } finally {
    loading.value = false;
  }
};

// Formani tozalash
const resetForm = () => {
  Object.assign(formData, {
    mijoz_id: "",
    xona_id: "",
    arrival_date: "",
    departure_date: "",
    status: "pending",
    payment_status: "pending",
    notes: "",
  });
  nights.value = 0;
  availableRooms.value = [];
  originalRoomId.value = null;
  error.value = "";
};

// Booking prop o'zgarganida formani yangilash
watch(
  () => props.booking,
  (newBooking) => {
    if (newBooking) {
      // Asl xona ID sini saqlash
      originalRoomId.value = newBooking.xona_id;

      // Ma'lumotlarni formaga to'ldirish
      Object.assign(formData, {
        ...newBooking,
        arrival_date: new Date(newBooking.arrival_date)
          .toISOString()
          .split("T")[0],
        departure_date: new Date(newBooking.departure_date)
          .toISOString()
          .split("T")[0],
      });

      // Kechalar sonini hisoblash
      calculateNights();

      // Xona mavjudligini tekshirish
      checkRoomAvailability();
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// Sana o'zgarganida xona mavjudligini tekshirish
watch(
  () => [formData.arrival_date, formData.departure_date],
  () => {
    checkRoomAvailability();
  }
);

// Komponent yuklanganda ma'lumotlarni yuklash
onMounted(async () => {
  if (roomStore.rooms.length === 0) {
    await roomStore.fetchRooms();
  }
  if (clientStore.clients.length === 0) {
    await clientStore.fetchClients();
  }
});
</script>
