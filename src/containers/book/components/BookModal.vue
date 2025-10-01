<template>
  <BaseSlideModal @on-close="emit('onClose')">
    <template #default>
      <div class="space-y-5">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ $t("modals.book_parking.title") }}
        </h2>

        <div class="flex justify-between text-sm">
          <p class="font-medium text-gray-800">
            {{ $t("common.station") }}: {{ parking.name }}
          </p>
          <p class="text-gray-600">
            {{ $t("parkings.available_spots") }}: {{ parking.availableSpots }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">{{
            $t("forms.fields.date_time.label")
          }}</label>
          <BaseInput
            type="date"
            :placeholder="$t('forms.fields.date_time.placeholder')"
            v-bind="dateAttrs"
            :error="errors.date"
            id="book-date"
            v-model="date"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">{{
            $t("forms.fields.start_time.label")
          }}</label>
          <BaseInput
            type="time"
            :placeholder="$t('forms.fields.start_time.placeholder')"
            v-bind="startTimeAttrs"
            :error="errors.startTime"
            id="book-start"
            v-model="startTime"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">{{
            $t("forms.fields.end_time.label")
          }}</label>
          <BaseInput
            type="time"
            :placeholder="$t('forms.fields.end_time.placeholder')"
            v-bind="endTimeAttrs"
            :error="errors.endTime"
            id="book-end"
            v-model="endTime"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">{{
            $t("selects.labels.select_car")
          }}</label>
          <BaseSelect
            :options="carOptions"
            v-model="selectedCar"
            :placeholder="$t('selects.labels.select_car')"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <BaseButton
          :text="$t('buttons.confirm')"
          icon="check"
          mode="Primary"
          :disabled="!meta.valid"
          :onClick="onSubmit"
        />
      </div>
    </template>
  </BaseSlideModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseSlideModal from "@/components/Base/BaseSlideModal.vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import type { BookForm } from "../types";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import type { Parking, User } from "@/types/User";
import { useValidateBookModal } from "../composables/useValidateBookModal";

interface Props {
  user: User;
  parking: Parking;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "onSubmit", form: BookForm): void;
  (e: "onClose"): void;
}>();

const carOptions = props.user.cars.map((car) => ({
  label: `${car.brand} ${car.model}`,
  value: car,
}));

const selectedCar = ref(carOptions[0]);

const {
  meta,
  date,
  dateAttrs,
  startTime,
  startTimeAttrs,
  endTime,
  endTimeAttrs,
  errors,
  handleSubmit,
  resetForm,
} = useValidateBookModal();

const onSubmit = handleSubmit((values) => {
  emit("onSubmit", {
    parkingId: props.parking.id,
    date: date.value,
    start: startTime.value,
    end: endTime.value,
    car: selectedCar.value.value,
  });

  emit("onClose");
  resetForm();
});
</script>
