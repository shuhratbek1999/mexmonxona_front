<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold text-green-600 mb-2">
      ✅ To‘lov muvaffaqiyatli amalga oshirildi!
    </h1>
    <router-link to="/" class="text-blue-500 underline">
      Bosh sahifaga qaytish
    </router-link>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { bookingService } from "@/services/bookings";
const route = useRoute();
// const router = useRouter();
// const booking = bookingService();
onMounted(async () => {
  const bookingId = route.query.bookingId;
  if (bookingId) {
    let id = bookingId,
      paymentStatus = "paid";
    await bookingService.updatePaymentStatus(id, paymentStatus);
    // router.push("/");
  }
});
</script>
