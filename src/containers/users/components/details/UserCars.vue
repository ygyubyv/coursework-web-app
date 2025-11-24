<template>
  <div class="space-y-4 mt-6">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-semibold text-gray-900">
        {{ $t("cars.title") }}
      </h3>

      <button
        class="flex items-center gap-1 px-2 py-1 cursor-pointer text-black hover:underline"
        @click="emit('createCar', 'create')"
      >
        <font-awesome-icon :icon="['fas', 'plus']" class="text-black" />
        <span>{{ $t("actions.create") }}</span>
      </button>
    </div>

    <div v-if="cars.length === 0" class="text-gray-500 text-sm">
      {{ $t("cars.no_cars") }}
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <UserCar
        v-for="car in cars"
        :key="car.id"
        @update-car="emit('updateCar', 'update', $event)"
        @delete-car="emit('deleteCar', 'delete', $event)"
        :car="car"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Car, CarAction } from "@/types";
import UserCar from "./UserCar.vue";

interface Props {
  cars: Car[];
}

interface Emits {
  (e: "createCar", action: CarAction): void;
  (e: "updateCar", action: CarAction, car: Car): void;
  (e: "deleteCar", action: CarAction, car: Car): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
