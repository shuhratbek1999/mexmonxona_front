<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
    @click.self="$emit('close')"
  >
    <div
      class="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
    >
      <!-- Modal header -->
      <div class="flex items-center justify-between p-5 border-b rounded-t">
        <h3 class="text-xl font-semibold text-gray-900">
          {{ isEditing ? "Xonani tahrirlash" : "Yangi xona qo'shish" }}
        </h3>
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          @click="$emit('close')"
        >
          <i class="fas fa-times text-lg"></i>
        </button>
      </div>

      <!-- Modal body -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Xona raqami *</label
            >
            <input
              v-model="formData.numbers"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="101"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Xona turi *</label
            >
            <select
              v-model="formData.tur"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="standart">Standard</option>
              <option value="lyuks">Lyuks</option>
              <option value="president">VIP</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Narx ($) *</label
            >
            <input
              v-model="formData.price"
              type="number"
              required
              min="0"
              step="0.01"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="99.99"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Sig'im *</label
            >
            <input
              v-model="formData.capacity"
              type="number"
              required
              min="1"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="2"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Holati *</label
            >
            <select
              v-model="formData.status"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="empty">Bo'sh</option>
              <option value="busy">Band</option>
              <option value="maintenance">Ta'mirlanmoqda</option>
              <option value="cleaning_need">Tozalanmoqda</option>
            </select>
          </div>

          <div class="space-y-4">
            <!-- Upload input -->
            <label
              class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div class="text-center p-4">
                <i
                  class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"
                ></i>
                <span class="text-gray-500">Rasm yuklash uchun bosing</span>
                <p class="text-xs text-gray-400 mt-1">
                  PNG, JPG, JPEG (max 5MB)
                </p>
              </div>
              <input
                type="file"
                class="hidden"
                multiple
                accept="image/*"
                @change="handleUpload"
                ref="fileInput"
                name="img"
              />
            </label>

            <!-- Yuklangan rasmlar -->
            <div v-if="images.length" class="grid grid-cols-3 gap-4 mt-2">
              <div
                v-for="(img, index) in images"
                :key="img.id || img.tempId"
                class="relative group cursor-pointer"
                @click="setPrimaryImage(img)"
              >
                <!-- {{ img }} -->
                <img
                  :src="
                    !img?.file
                      ? BASE_URL + '/img/' + img.image_url
                      : img.image_url
                  "
                  class="w-full h-32 object-cover rounded-xl border-4"
                  :class="
                    img.is_primary ? 'border-blue-500' : 'border-transparent'
                  "
                />
                <!-- Belgilash -->
                <div
                  v-if="img.is_primary"
                  class="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded"
                >
                  Asosiy
                </div>
                <div
                  v-else
                  class="absolute top-2 left-2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  Asosiy qilish
                </div>

                <!-- O'chirish tugmasi -->
                <button
                  type="button"
                  @click.stop="removeImage(index)"
                  class="absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  &times;
                </button>

                <!-- Tartib raqami -->
                <div
                  class="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded"
                >
                  #{{ img.image_order }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Tavsif</label
          >
          <textarea
            v-model="formData.description"
            rows="3"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Xona haqida qisqacha tavsif..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Qulayliklar</label
          >
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <label
              v-for="amenity in amenitiesList"
              :key="amenity.id"
              class="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
            >
              <input
                type="checkbox"
                :value="amenity.id"
                v-model="amenities"
                class="rounded text-blue-600 focus:ring-blue-500"
              />
              <span class="text-sm">{{ amenity.name }}</span>
            </label>
          </div>
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
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 transition"
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
import { ref, computed, watch, reactive, onMounted, inject } from "vue";
import { useRoomStore } from "@/stores/rooms";

const props = defineProps({
  show: Boolean,
  room: Object,
});
const BASE_URL = inject("BASE_URL");
const emit = defineEmits(["close", "saved"]);

const roomStore = useRoomStore();
const loading = ref(false);
const error = ref("");
const images = ref([]);
const fileInput = ref(null);
const amenities = ref([]);
const amenitiesList = ref([]);

const formData = ref({
  numbers: "",
  tur: "standart",
  price: 0,
  capacity: 1,
  status: "empty",
  description: "",
});

const isEditing = computed(() => {
  return !!props.room;
});

function resetForm() {
  formData.value = {
    numbers: "",
    tur: "standart",
    price: 0,
    capacity: 1,
    status: "empty",
    description: "",
  };
  images.value = [];
  amenities.value = [];
  error.value = "";
}

function handleUpload(event) {
  const files = event.target.files;
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!files.length) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Fayl hajmini tekshirish
    if (file.size > maxSize) {
      error.value = `${file.name} fayli juda katta (maksimum 5MB)`;
      fileInput.value.value = "";
      return;
    }

    if (!file.type.match("image.*")) continue;

    const reader = new FileReader();
    reader.onload = (e) => {
      const newImage = {
        tempId: Date.now() + i, // Vaqtinchalik ID
        image_url: e.target.result,
        image_order: images.value.length + 1,
        is_primary: images.value.length === 0,
        file: file, // Asl fayl obyektini saqlash
      };

      images.value.push(newImage);
    };
    reader.readAsDataURL(file);
  }

  // Inputni tozalash
  event.target.value = "";
}

function setPrimaryImage(img) {
  // Barcha rasmlardan asosiylikni olib tashlash
  images.value = images.value.map((image) => ({
    ...image,
    is_primary: image.tempId === img.tempId || image.id === img.id,
  }));
}

function removeImage(index) {
  const removedImage = images.value[index];
  const wasPrimary = removedImage.is_primary;

  images.value.splice(index, 1);

  // Tartib raqamlarini yangilash
  images.value.forEach((img, idx) => {
    img.image_order = idx + 1;
  });

  // Agar asosiy rasm o'chirilgan bo'lsa, birinchi rasmni asosiy qilish
  if (wasPrimary && images.value.length > 0) {
    images.value[0].is_primary = true;
  }
}

async function handleSubmit() {
  // Asosiy rasmni tekshirish
  const hasPrimary = images.value.some((img) => img.is_primary);
  if (images.value.length > 0 && !hasPrimary) {
    error.value = "Iltimos, asosiy rasmni belgilang";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    // Ma'lumotlarni tayyorlash
    const submitData = {
      ...formData.value,
      amenities: amenities.value,
      images: images.value,
    };

    if (isEditing.value) {
      await roomStore.updateRoom(submitData.id, submitData);
    } else {
      await roomStore.createRoom(submitData);
    }

    emit("saved");
    emit("close");
    resetForm();
  } catch (err) {
    error.value =
      err.message || "Xatolik yuz berdi. Iltimos, qayta urunib ko'ring.";
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await roomStore.allAmenities();
  amenitiesList.value = roomStore.amenitiesAlls;
});

watch(
  () => props.room,
  (newRoom) => {
    if (newRoom) {
      formData.value = {
        id: newRoom.id,
        numbers: newRoom.numbers || "",
        tur: newRoom.tur || "standart",
        price: newRoom.price || 0,
        capacity: newRoom.capacity || 1,
        status: newRoom.status || "empty",
        description: newRoom.description || "",
      };

      // Amenities ma'lumotlarini aks ettirish
      if (newRoom.AmenitiesRoom && newRoom.AmenitiesRoom.length) {
        amenities.value = newRoom.AmenitiesRoom.map((a) => a.amenities_id);
      }

      // Mavjud rasm ma'lumotlarini aks ettirish
      if (newRoom.images && newRoom.images.length) {
        images.value = [...newRoom.images];
      }
    } else {
      resetForm();
    }
  },
  { immediate: true }
);
</script>
