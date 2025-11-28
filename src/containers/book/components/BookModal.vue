<template>
  <BaseSlideModal @on-close="emit('onClose')">
    <template #header>
      <h2 class="text-xl font-semibold text-gray-900">
        {{ $t("modals.book_parking.title") }}
      </h2>
    </template>

    <template #default>
      <div class="space-y-5">
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
            $t("forms.fields.start_time.label")
          }}</label>

          <BaseInput
            type="datetime-local"
            :placeholder="$t('forms.fields.start_time.placeholder')"
            v-bind="startAttrs"
            :error="errors.start"
            id="book-start"
            v-model="start"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">
            {{ $t("forms.fields.end_time.label") }}
          </label>
          <BaseInput
            type="datetime-local"
            :placeholder="$t('forms.fields.end_time.placeholder')"
            v-bind="endAttrs"
            :error="errors.end"
            id="book-end-date"
            v-model="end"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">
            {{ $t("selects.labels.select_car") }}
          </label>
          <BaseSelect
            :options="carOptions"
            v-model="selectedCar"
            :placeholder="$t('selects.labels.select_car')"
          />

          <div
            class="flex items-center gap-1 mr-1 text-black text-sm cursor-pointer hover:underline self-end"
            @click="emit('onAddCar')"
          >
            <font-awesome-icon :icon="['fas', 'plus']" class="text-black" />
            <span>{{ $t("buttons.add_car") }}</span>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-3 justify-end">
        <BaseButton
          icon="xmark"
          :text="$t('buttons.cancel')"
          mode="Secondary"
          size="Medium"
          @click="emit('onClose')"
        />

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
import type { BookForm } from "@/types";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import type { Parking, User } from "@/types";
import { useValidateBookModal } from "../composables/useValidateBookModal";

interface Props {
  user: User;
  parking: Parking;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "onAddCar"): void;
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
  start,
  startAttrs,
  end,
  endAttrs,
  errors,
  handleSubmit,
  resetForm,
} = useValidateBookModal();

const onSubmit = handleSubmit((values) => {
  emit("onSubmit", {
    userId: props.user.id,
    parkingId: props.parking.id,
    start: start.value,
    end: end.value,
    carId: selectedCar.value.value.id,
  });

  emit("onClose");
  resetForm();
});
</script>
