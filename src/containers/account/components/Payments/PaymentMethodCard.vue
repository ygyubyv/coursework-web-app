<template>
  <div
    class="relative border border-gray-200 rounded-lg p-4 shadow-sm flex items-center justify-between"
  >
    <div>
      <p class="font-medium text-gray-800">
        {{ paymentMethod.brand }} {{ maskPan(paymentMethod.pan) }}
      </p>
      <p class="text-sm text-gray-500">Expires {{ paymentMethod.expires }}</p>
    </div>
    <button
      @click="emit('onDelete')"
      class="absolute top-3 right-3 text-gray-400 hover:scale-125 cursor-pointer"
      aria-label="Remove card"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { maskPan } from "@/utils/maskPan";
import type { PaymentMethod } from "../../types";

interface Props {
  paymentMethod: PaymentMethod;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "onDelete"): void;
}>();
</script>
