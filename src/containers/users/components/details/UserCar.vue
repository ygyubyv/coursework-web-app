<template>
  <div class="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2">
    <div class="flex justify-between items-start">
      <p class="text-gray-900 font-medium">{{ car.brand }} {{ car.model }}</p>

      <div class="flex gap-2">
        <button class="text-black" @click="emit('updateCar', car)">
          <font-awesome-icon :icon="['fas', 'pen-to-square']" />
        </button>

        <button class="text-black" @click="emit('deleteCar', car)">
          <font-awesome-icon :icon="['fas', 'trash']" />
        </button>
      </div>
    </div>

    <p class="text-sm text-gray-600">
      Number:
      <span class="font-medium text-gray-800">{{ car.number }}</span>
    </p>

    <p class="text-sm text-gray-600">
      Color: <span class="font-medium">{{ car.color }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Car } from "@/types";

interface Props {
  car: Car;
}

interface Emits {
  (e: "updateCar", car: Car): void;
  (e: "deleteCar", car: Car): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
