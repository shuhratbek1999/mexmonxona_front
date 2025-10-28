<template>
  <div class="p-8">
    <h2 class="text-2xl font-bold mb-4">Xonani bron qilish</h2>
    <button
      @click="payNow"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      To‘lovni amalga oshirish
    </button>
  </div>
</template>

<script setup>
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51MWMckF05dpmbe1lu5dUAyzgSiQiES5dgxcIqPceiUbizwDDmUwVps4dbjDS7eLhzbnwBrqk122zl5SVydeGailb00v1JNekOo"
);
const payNow = async () => {
  const res = await fetch("http://176.53.163.29:7006/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ roomName: "Deluxe Room", price: 120 }),
  });

  const data = await res.json();
  console.log(data);

  // Yangi usul
  window.location.href = data.url;
};
</script>
