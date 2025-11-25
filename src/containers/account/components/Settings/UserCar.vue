<template>
  <div class="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
    <Confirm
      v-model="deleteCarModalIsVisible"
      :title="$t('modals.delete_car.title')"
      :message="$t('modals.delete_car.message')"
      :confirm-text="$t('modals.delete_car.submit_text')"
      :cancel-text="$t('buttons.cancel')"
      @confirm="onDelete"
    />

    <div class="flex flex-col md:flex-row md:items-center justify-center gap-2">
      <label class="w-32 text-gray-700 font-medium"
        >{{ $t("forms.fields.number.label") }}:</label
      >

      <BaseInput
        id="carNumber"
        placeholder="AA1234BB"
        class="w-full md:w-[300px] py-1.5 text-sm"
        type="text"
        v-bind="numberAttrs"
        v-model="number"
        :error="errors.number"
      />
    </div>

    <div class="flex flex-col md:flex-row md:items-center justify-center gap-2">
      <label class="w-32 text-gray-700 font-medium"
        >{{ $t("forms.fields.brand.label") }}:</label
      >

      <BaseInput
        id="carBrand"
        placeholder="Brand"
        class="w-full md:w-[300px] py-1.5 text-sm"
        type="text"
        v-bind="brandAttrs"
        v-model="brand"
        :error="errors.brand"
      />
    </div>

    <div class="flex flex-col md:flex-row md:items-center justify-center gap-2">
      <label class="w-32 text-gray-700 font-medium"
        >{{ $t("forms.fields.model.label") }}:</label
      >

      <BaseInput
        id="carModel"
        placeholder="Model"
        class="w-full md:w-[300px] py-1.5 text-sm"
        type="text"
        v-bind="modelAttrs"
        v-model="model"
        :error="errors.model"
      />
    </div>

    <div class="flex flex-col md:flex-row md:items-center justify-center gap-2">
      <label class="w-32 text-gray-700 font-medium"
        >{{ $t("forms.fields.color.label") }}:</label
      >

      <BaseInput
        id="carColor"
        placeholder="Color"
        class="w-full md:w-[300px] py-1.5 text-sm"
        type="text"
        v-bind="colorAttrs"
        v-model="color"
        :error="errors.color"
      />
    </div>

    <div class="flex justify-end mt-2 gap-3">
      <BaseButton
        :text="$t('buttons.cancel')"
        icon="xmark"
        mode="Secondary"
        class="w-full sm:w-auto"
        size="Small"
        v-if="meta.dirty"
        :onClick="resetForm"
      />

      <BaseButton
        :text="$t('buttons.save_changes')"
        icon="save"
        class="w-full sm:w-auto"
        size="Small"
        v-if="meta.dirty"
        :onClick="onUpdate"
      />

      <BaseButton
        :text="$t('buttons.delete')"
        icon="trash"
        mode="Danger"
        size="Small"
        @click="deleteCarModalIsVisible = true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Confirm from "@/components/Modals/Confirm.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import type { Car } from "@/types";
import { useValidateCar } from "@/composables/useValidateCar";
import { ref, toRef, watch } from "vue";

interface Props {
  car: Car;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "updateCar", carId: string, car: Car): void;
  (e: "deleteCar", carId: string): void;
}>();

const {
  meta,
  number,
  numberAttrs,
  brand,
  brandAttrs,
  color,
  colorAttrs,
  model,
  modelAttrs,
  errors,
  handleSubmit,
  resetForm,
} = useValidateCar(toRef(props, "car"));

const deleteCarModalIsVisible = ref(false);

const onUpdate = handleSubmit((values) => {
  const car = {
    number: values.number,
    brand: values.brand,
    color: values.color,
    model: values.model,
  } as Car;

  emit("updateCar", props.car.id, car);
});

const onDelete = () => {
  emit("deleteCar", props.car.id);
};

watch(
  () => props.car,
  (newCar) => {
    resetForm({
      values: {
        number: newCar.number,
        brand: newCar.brand,
        model: newCar.model,
        color: newCar.color,
      },
    });
  }
);
</script>
