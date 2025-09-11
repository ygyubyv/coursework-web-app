<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-md transition"
  >
    <font-awesome-icon
      :icon="['fas', way.icon]"
      class="text-black text-3xl mb-4"
    />
    <h3 class="text-lg font-semibold text-gray-900">{{ way.title }}</h3>
    <p class="mt-2 text-gray-600 text-sm">
      {{ way.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { PaymentWay } from "../types";

interface Props {
  way: PaymentWay;
}

defineProps<Props>();
</script>
