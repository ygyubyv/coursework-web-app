<template>
  <div>
    <h2 class="text-xl font-bold text-black mb-6">{{ $t("cars.title") }}</h2>

    <div class="space-y-4" v-if="cars && cars?.length">
      <div
        class="flex items-center justify-between rounded-lg border border-gray-200 p-3 bg-gray-50"
      >
        <span class="font-medium text-gray-700"
          >{{ $t("cars.total_cars") }}:</span
        >
        <span class="font-bold text-black">{{ cars.length }}</span>
      </div>

      <div class="flex flex-col gap-4">
        <UserCar
          v-for="car in cars"
          :key="car.id"
          :car="car"
          @update-car="(carId, carData) => emit('updateCar', carId, carData)"
          @delete-car="(carId) => emit('deleteCar', carId)"
        />
      </div>
    </div>

    <div v-else>
      <p>{{ $t("cars.no_cars") }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserCar from "./UserCar.vue";
import type { Car } from "@/types";

interface Props {
  cars: Car[];
}

interface Emits {
  (e: "updateCar", carId: string, car: Car): void;
  (e: "deleteCar", carId: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
