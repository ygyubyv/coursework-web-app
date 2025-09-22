<template>
  <div
    class="p-4 border border-gray-200 rounded-lg bg-white transition flex flex-col gap-2"
  >
    <h3 class="text-md font-medium text-gray-900">{{ parking.name }}</h3>

    <div class="flex justify-between text-sm text-gray-700">
      <span>Distance:</span>
      <!-- <span>{{ parking.distance }} km</span> -->
    </div>

    <div class="flex justify-between text-sm text-gray-700">
      <span>Available spots:</span>
      <span>{{ parking.availableSpots }}</span>
    </div>

    <div class="flex justify-between text-sm text-gray-700">
      <span>Address:</span>
      <span>{{ parking.address }}</span>
    </div>

    <div class="flex justify-end mt-2">
      <BaseButton
        mode="Primary"
        icon="plus"
        text="Book"
        :onClick="() => emit('onBook', parking.id)"
        size="Small"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/Base/BaseButton.vue";
import type { Parking } from "../types";

interface Props {
  parking: Parking;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "onBook", id: string): void;
}>();
</script>
