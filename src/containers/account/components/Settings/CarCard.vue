<template>
  <div class="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
    <InputField
      v-model="car.numbers"
      :input="{
        id: 'carNumber',
        type: 'text',
        placeholder: 'AA1234BB',
      }"
      :label="$t('forms.fields.numbers.label')"
    />

    <InputField
      v-model="car.brand"
      :input="{ id: 'carBrand', type: 'text', placeholder: 'Brand' }"
      :label="$t('forms.fields.brand.label')"
    />

    <InputField
      v-model="car.model"
      :input="{ id: 'carModel', type: 'text', placeholder: 'Model' }"
      :label="$t('forms.fields.model.label')"
    />

    <InputField
      v-model="car.year"
      :input="{ id: 'carYear', type: 'number', placeholder: '2020' }"
      :label="$t('forms.fields.year.label')"
    />

    <InputField
      v-model="car.color"
      :input="{ id: 'carColor', type: 'text', placeholder: 'Color' }"
      :label="$t('forms.fields.color.label')"
    />

    <div class="flex justify-end mt-2">
      <BaseButton
        :text="$t('buttons.delete')"
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
