<template>
  <div class="analytics-dashboard space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AvailabilityCheck />
      <DailyStats />
    </div>

    <MonthlyStats />
  </div>
</template>

<script setup>
import AvailabilityCheck from "@/components/analytics/AvailabilityCheck.vue";
import DailyStats from "@/components/analytics/DailyStats.vue";
import MonthlyStats from "@/components/analytics/MonthlyStats.vue";
</script>
