<template>
  <div
    class="relative border border-gray-200 rounded-lg p-4 shadow-sm flex items-center justify-between"
  >
    <div>
      <p class="font-medium text-gray-800">
        {{ detectCardBrand(String(paymentMethod.pan)) }}
        {{ maskPan(paymentMethod.pan) }}
      </p>
      <p class="text-sm text-gray-500">
        {{ $t("pricing.expires") }} {{ paymentMethod.expires }}
      </p>
    </div>
    <button
      @click="emit('onDelete', paymentMethod.id)"
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
import { detectCardBrand } from "@/utils/detectCardBrand";

interface Props {
  paymentMethod: PaymentMethod;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "onDelete", id: string): void;
}>();
</script>
