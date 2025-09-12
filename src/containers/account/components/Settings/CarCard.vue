<template>
  <div class="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
    <InputField
      v-model="car.numbers"
      :input="{
        id: 'carNumber',
        type: 'text',
        placeholder: 'AA1234BB',
      }"
      label="Number"
    />
    <InputField
      v-model="car.brand"
      :input="{ id: 'carBrand', type: 'text', placeholder: 'Brand' }"
      label="Brand"
    />
    <InputField
      v-model="car.model"
      :input="{ id: 'carModel', type: 'text', placeholder: 'Model' }"
      label="Model"
    />
    <InputField
      v-model="car.year"
      :input="{ id: 'carYear', type: 'number', placeholder: '2020' }"
      label="Year"
    />
    <InputField
      v-model="car.color"
      :input="{ id: 'carColor', type: 'text', placeholder: 'Color' }"
      label="Color"
    />

    <div class="flex justify-end mt-2">
      <BaseButton
        text="Delete"
        icon="trash"
        mode="Danger"
        size="Small"
        @click="() => emit('onCarDelete', car.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/Base/BaseButton.vue";
import InputField from "./InputField.vue";
import type { Car } from "@/types/User";

interface Props {
  car: Car;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "onCarDelete", id: string): void;
}>();
</script>
