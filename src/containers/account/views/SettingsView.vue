<template>
  <BaseModal
    v-if="addCarModalIsVisible"
    @close="addCarModalIsVisible = false"
    @submit="handleAddCar"
    :title="$t('modals.add_car.title')"
    :submit-text="$t('modals.add_car.submit_text')"
    :message="$t('modals.add_car.message')"
  >
    <template #default>
      <div class="flex flex-col gap-3">
        <BaseInput
          v-model="newCar.numbers"
          :placeholder="$t('forms.fields.numbers.placeholder')"
          id="car-numbers"
          type="text"
          size="Medium"
        />
        <BaseInput
          v-model="newCar.brand"
          :placeholder="$t('forms.fields.brand.placeholder')"
          id="car-brand"
          type="text"
          size="Medium"
        />
        <BaseInput
          v-model="newCar.model"
          :placeholder="$t('forms.fields.model.placeholder')"
          id="car-model"
          type="text"
          size="Medium"
        />
        <BaseInput
          v-model="newCar.year"
          :placeholder="$t('forms.fields.year.placeholder')"
          id="car-year"
          type="number"
          size="Medium"
        />
        <BaseInput
          v-model="newCar.color"
          :placeholder="$t('forms.fields.color.placeholder')"
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
    :title="$t('modals.delete_account.title')"
    :submit-text="$t('modals.delete_account.submit_text')"
    :message="$t('modals.delete_account.message')"
  />

  <BaseModal
    v-if="deleteCarModalIsVisible"
    @close="deleteCarModalIsVisible = false"
    @submit="confirmDeleteCar"
    :title="$t('modals.delete_car.title')"
    :submit-text="$t('modals.delete_car.submit_text')"
    :message="$t('modals.delete_car.message')"
  />

  <section class="py-6">
    <div
      class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-6 mb-8"
    >
      <h2 class="text-xl font-bold text-black text-center md:text-left">
        {{ $t("views.account.settings.title") }}
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
            :label="$t('forms.fields.full_name.label')"
            :input="{
              id: 'name',
              placeholder: $t('forms.fields.full_name.placeholder'),
              type: 'text',
            }"
            v-model="form.name"
          />

          <InputField
            :label="$t('forms.fields.email.label')"
            :input="{
              id: 'email',
              placeholder: $t('forms.fields.email.placeholder'),
              type: 'email',
            }"
            v-model="form.email"
          />

          <InputField
            :label="$t('forms.fields.phone.label')"
            :input="{
              id: 'phone',
              placeholder: $t('forms.fields.phone.placeholder'),
              type: 'text',
            }"
            v-model="form.phoneNumber"
          />
        </div>
      </div>

      <h2 class="text-xl font-bold text-black">{{ $t("cars.title") }}</h2>

      <div class="space-y-4">
        <div
          class="flex items-center justify-between rounded-lg border border-gray-200 p-3 bg-gray-50"
        >
          <span class="font-medium text-gray-700"
            >{{ $t("cars.total_cars") }}:</span
          >
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
