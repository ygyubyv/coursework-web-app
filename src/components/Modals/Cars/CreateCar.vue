<template>
  <BaseModal
    v-if="modalIsVisible"
    @close="closeModal"
    @submit="handleAddCar"
    :title="$t('modals.add_car.title')"
    :submit-text="$t('modals.add_car.submit_text')"
    :message="$t('modals.add_car.message')"
  >
    <template #default>
      <div class="flex flex-col gap-3">
        <BaseInput
          v-model="newCar.number.value"
          :placeholder="$t('forms.fields.number.placeholder')"
          v-bind="newCar.numberAttrs.value"
          :error="newCar.errors.value.number"
          id="car-number"
          type="text"
          size="Medium"
        />

        <BaseInput
          v-model="newCar.brand.value"
          :placeholder="$t('forms.fields.brand.placeholder')"
          v-bind="newCar.brandAttrs.value"
          :error="newCar.errors.value.brand"
          id="car-brand"
          type="text"
          size="Medium"
        />

        <BaseInput
          v-model="newCar.model.value"
          :placeholder="$t('forms.fields.model.placeholder')"
          v-bind="newCar.modelAttrs.value"
          :error="newCar.errors.value.model"
          id="car-model"
          type="text"
          size="Medium"
        />

        <BaseInput
          v-model="newCar.color.value"
          :placeholder="$t('forms.fields.color.placeholder')"
          v-bind="newCar.colorAttrs.value"
          :error="newCar.errors.value.color"
          id="car-color"
          type="text"
          size="Medium"
        />
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseInput from "@/components/Base/BaseInput.vue";
import BaseModal from "@/components/Base/BaseModal.vue";
import { useValidateCar } from "@/composables/useValidateCar";
import type { CreateCar } from "@/types";

interface Props {
  modalIsVisible: boolean;
}

interface Emits {
  (e: "update:modalIsVisible", value: boolean): void;
  (e: "submit", car: CreateCar): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const newCar = useValidateCar();

const closeModal = () => {
  emit("update:modalIsVisible", false);
};

const handleAddCar = newCar.handleSubmit(async (values) => {
  const car = {
    number: values.number,
    color: values.color,
    brand: values.brand,
    model: values.model,
  };

  emit("submit", car);

  newCar.resetForm();

  closeModal();
});
</script>
