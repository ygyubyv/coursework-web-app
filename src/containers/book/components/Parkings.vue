<template>
  <div class="flex-1 overflow-y-auto flex flex-col gap-3">
    <ParkingCard
      v-for="parking in parkings"
      :parking="parking"
      :key="parking.id"
      @on-book="emit('onBook', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Parking } from "../types";
import ParkingCard from "./ParkingCard.vue";

interface Props {
  parkings: Parking[];
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "onBook", id: string): void;
}>();
</script>
