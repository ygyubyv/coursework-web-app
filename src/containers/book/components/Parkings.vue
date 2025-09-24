<template>
  <div class="flex-1 overflow-y-auto flex flex-col gap-3">
    <ParkingCard
      v-for="parking in parkings"
      :parking="parking"
      :key="parking.id"
      :coordinates="coordinates"
      @on-book="emit('onBook', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Parking } from "@/types/User";
import type { Coordinates } from "../types";
import ParkingCard from "./ParkingCard.vue";

interface Props {
  parkings: Parking[];
  coordinates: Coordinates | null;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "onBook", id: string): void;
}>();
</script>
