<template>
  <div class="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
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
        :onClick="onSave"
      />

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
import BaseInput from "@/components/Base/BaseInput.vue";
import type { Car } from "@/types/User";
import { useValidateCar } from "../../composables/useValidateCar";

interface Props {
  car: Car;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "saveChanges", id: string, car: Car): void;
  (e: "onCarDelete", id: string): void;
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
} = useValidateCar(props.car);

const onSave = handleSubmit((values) => {
  const car = {
    number: values.number,
    brand: values.brand,
    color: values.color,
    model: values.model,
  } as Car;

  emit("saveChanges", props.car.id, car);
});
</script>
