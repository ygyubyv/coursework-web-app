<template>
  <section class="py-6">
    <div
      class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-6 mb-8"
    >
      <h2 class="text-xl font-bold text-black text-center md:text-left">
        Personal Information
      </h2>

      <div
        class="flex flex-col md:flex-col-reverse lg:flex-row md:items-start gap-6"
      >
        <Avatar
          :avatar-url="avatarPreview || user!.avatarUrl"
          @on-avatar-change="handleAvatarChange"
        />

        <div class="flex-1 space-y-4 order-2 md:order-1">
          <InputField
            label="Full Name"
            :input="{ id: 'name', placeholder: 'Your full name', type: 'text' }"
            v-model="form.name"
          />

          <InputField
            label="Email"
            :input="{ id: 'email', placeholder: 'Your email', type: 'email' }"
            v-model="form.email"
          />

          <InputField
            label="Phone"
            :input="{
              id: 'phone',
              placeholder: '+380 123 456 789',
              type: 'text',
            }"
            v-model="form.phoneNumber"
          />
        </div>
      </div>

      <h2 class="text-xl font-bold text-black">Cars</h2>

      <div class="space-y-4">
        <div
          class="flex items-center justify-between rounded-lg border border-gray-200 p-3 bg-gray-50"
        >
          <span class="font-medium text-gray-700">Total Cars:</span>
          <span class="font-bold text-black">{{ form.cars.length }}</span>
        </div>

        <div class="flex flex-col gap-4">
          <CarCard
            v-for="car in form.cars"
            :key="car.id"
            :car="car"
            @on-car-delete="deleteCar"
          />
        </div>
      </div>

      <div class="space-y-2">
        <h2 class="text-xl font-bold text-black mb-2">Preferences</h2>

        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <span class="text-gray-700 font-medium w-full md:w-40"
            >Preferred Language:</span
          >
          <BaseSelect
            placeholder="Choose Language"
            :options="languages"
            v-model="preferredLanguage"
            class="md:min-w-[200px]"
          />
        </div>
      </div>
    </div>

    <Actions
      :has-changes="hasChanges"
      @add-car="addCar"
      @cancel="onCancel"
      @save-profile="saveProfile"
      @delete-account="deleteAccount"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed, toRaw } from "vue";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import InputField from "../components/Settings/InputField.vue";
import Avatar from "../components/Settings/Avatar.vue";
import CarCard from "../components/Settings/CarCard.vue";
import Actions from "../components/Settings/Actions.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useAuthStore());

const languages = [
  { label: "English", value: "en" },
  { label: "Ukrainian", value: "ukr" },
];

const initialForm = structuredClone({
  name: toRaw(user.value!.name),
  email: toRaw(user.value!.email),
  phoneNumber: toRaw(user.value!.phoneNumber),
  cars: toRaw(user.value!.cars),
});

const form = reactive({
  name: user.value!.name,
  email: user.value!.email,
  phoneNumber: user.value!.phoneNumber,
  cars: [...user.value!.cars],
});

const preferredLanguage = ref();

const avatarPreview = ref<string | null>(user.value!.avatarUrl);

const hasChanges = computed(() => {
  return (
    JSON.stringify(initialForm) !== JSON.stringify(form) ||
    !!avatarPreview.value
  );
});

const handleAvatarChange = (file: File) => {
  avatarPreview.value = URL.createObjectURL(file);
};

const addCar = () => {
  console.log("Add car");
};

const deleteCar = (id: string) => {
  const carIndex = form.cars.findIndex((c) => c.id === id);
  form.cars.splice(carIndex, 1);
};

const onCancel = () => {
  form.name = initialForm.name;
  form.email = initialForm.email;
  form.phoneNumber = initialForm.phoneNumber;

  form.cars.splice(0, form.cars.length, ...structuredClone(initialForm.cars));

  avatarPreview.value = null;
};

const saveProfile = () => {
  console.log("Saved");
};

const deleteAccount = () => {
  console.log("Account deleted!");
};
</script>
