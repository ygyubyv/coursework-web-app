<template>
  <BaseSlideModal @on-close="emit('onClose')">
    <template #default>
      <div class="space-y-5">
        <h2 class="text-xl font-semibold text-gray-900">Book Parking</h2>

        <div class="flex justify-between text-sm">
          <p class="font-medium text-gray-800">Station: {{ parking.name }}</p>
          <p class="text-gray-600">
            Available spots: {{ parking.availableSpots }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">Date & Time</label>
          <BaseInput
            type="date"
            placeholder="Date & Time"
            id="book-date"
            v-model="form.date"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">Start Time</label>
          <BaseInput
            type="time"
            placeholder="Start Time"
            id="book-start"
            v-model="form.start"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700">End Time</label>
          <BaseInput
            type="time"
            placeholder="End Time"
            id="book-end"
            v-model="form.end"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700"
            >Select your car</label
          >
          <BaseSelect
            :options="carOptions"
            v-model="selectedCar"
            placeholder="Select your car"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <BaseButton text="Confirm Booking" mode="Primary" :onClick="onSubmit" />
      </div>
    </template>
  </BaseSlideModal>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import BaseSlideModal from "@/components/Base/BaseSlideModal.vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import type { BookForm } from "../types";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import type { Parking, User } from "@/types/User";

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

const form = reactive({
  date: null,
  start: null,
  end: null,
});

const clearForm = () => {
  form.date = null;
  form.start = null;
  form.end = null;
  selectedCar.value = carOptions[0];
};

const onSubmit = () => {
  emit("onSubmit", {
    parkingId: props.parking.id,
    date: form.date!,
    start: form.start!,
    end: form.end!,
    car: selectedCar.value.value,
  });
  emit("onClose");
  clearForm();
};
</script>
