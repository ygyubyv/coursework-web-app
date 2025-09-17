<template>
  <BaseModal
    v-if="addCarModalIsVisible"
    @close="addCarModalIsVisible = false"
    @submit="handleAddCar"
    title="Add New Car"
    submit-text="Add Car"
  >
    <template #default>
      <p class="text-gray-700 mb-2">Enter the details of your car below:</p>
      <div class="flex flex-col gap-3">
        <BaseInput
          v-model="newCar.numbers"
          placeholder="License Plate Number"
          id="car-numbers"
          type="text"
          size="Medium"
        />
        <BaseInput
          v-model="newCar.brand"
          placeholder="Brand"
          id="car-brand"
          type="text"
          size="Medium"
        />
        <BaseInput
          v-model="newCar.model"
          placeholder="Model"
          id="car-model"
          type="text"
          size="Medium"
        />
        <BaseInput
          v-model="newCar.year"
          placeholder="Year"
          id="car-year"
          type="number"
          size="Medium"
        />
        <BaseInput
          v-model="newCar.color"
          placeholder="Color"
          id="car-color"
          type="text"
          size="Medium"
        />
      </div>
    </template>
  </BaseModal>

  <BaseModal
    v-if="deleteAccountModalIsVisible"
    @submit="handleDeleteAccount"
    @close="deleteAccountModalIsVisible = false"
    title="Delete Account"
    message="Are you sure you want to permanently delete your account? All your data will be lost and this action cannot be undone."
    submit-text="Delete Account"
  />

  <BaseModal
    v-if="deleteCarModalIsVisible"
    @close="deleteCarModalIsVisible = false"
    @submit="confirmDeleteCar"
    title="Confirm Car Deletion"
    message="Are you sure you want to permanently delete this car? This action cannot be undone."
    submit-text="Delete Car"
  />

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
            @on-car-delete="handleDeleteCar"
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
      @add-car="addCarModalIsVisible = true"
      @cancel="onCancel"
      @save-profile="saveProfile"
      @delete-account="deleteAccountModalIsVisible = true"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import InputField from "../components/Settings/InputField.vue";
import Avatar from "../components/Settings/Avatar.vue";
import CarCard from "../components/Settings/CarCard.vue";
import Actions from "../components/Settings/Actions.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import BaseModal from "@/components/Base/BaseModal.vue";
import type { Car } from "@/types/User";

const { logout } = useAuthStore();
const { user } = storeToRefs(useAuthStore());

const languages = [
  { label: "English", value: "en" },
  { label: "Ukrainian", value: "ukr" },
];

const initialForm = reactive({
  name: user.value!.name,
  email: user.value!.email,
  phoneNumber: user.value!.phoneNumber,
  cars: user.value!.cars.map((car) => ({ ...car })),
});

const form = reactive({
  name: user.value!.name,
  email: user.value!.email,
  phoneNumber: user.value!.phoneNumber,
  cars: [...user.value!.cars],
});

const newCar = reactive<Car>({
  id: "",
  numbers: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  color: "",
});

const addCarModalIsVisible = ref(false);
const deleteCarModalIsVisible = ref(false);
const deleteAccountModalIsVisible = ref(false);

const deleteCarId = ref<string | null>(null);
const preferredLanguage = ref();
const avatarPreview = ref<string | null>(user.value!.avatarUrl);

const hasChanges = computed(() => {
  return (
    JSON.stringify(initialForm) !== JSON.stringify(form) ||
    avatarPreview.value !== user.value!.avatarUrl
  );
});

const handleAvatarChange = (file: File) => {
  avatarPreview.value = URL.createObjectURL(file);
};

const handleAddCar = () => {
  form.cars.push({
    ...newCar,
    id: String(Date.now()),
  });

  newCar.id = "";
  newCar.numbers = "";
  newCar.brand = "";
  newCar.model = "";
  newCar.color = "";

  addCarModalIsVisible.value = false;
};

const handleDeleteCar = (id: string) => {
  deleteCarModalIsVisible.value = true;
  deleteCarId.value = id;
};

const confirmDeleteCar = () => {
  const targetIndex = form.cars.findIndex((c) => c.id === deleteCarId.value);

  if (targetIndex === -1) {
    return;
  }

  form.cars.splice(targetIndex, 1);
  deleteCarModalIsVisible.value = false;
};

const onCancel = () => {
  form.name = initialForm.name;
  form.email = initialForm.email;
  form.phoneNumber = initialForm.phoneNumber;

  form.cars.splice(
    0,
    form.cars.length,
    ...initialForm.cars.map((car) => ({ ...car }))
  );

  avatarPreview.value = user.value!.avatarUrl;
};

const saveProfile = () => {
  user.value!.name = form.name;
  user.value!.cars = form.cars;
  user.value!.email = form.email;
  user.value!.phoneNumber = form.phoneNumber;
  user.value!.avatarUrl = avatarPreview.value;

  initialForm.name = form.name;
  initialForm.email = form.email;
  initialForm.phoneNumber = form.phoneNumber;
  initialForm.cars.splice(
    0,
    initialForm.cars.length,
    ...form.cars.map((car) => ({ ...car }))
  );
};

const handleDeleteAccount = async () => {
  try {
    await logout();
  } catch (error) {
    console.error(error);
  }
};
</script>
