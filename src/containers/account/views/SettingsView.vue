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
          <div
            class="flex flex-col md:flex-row md:items-center justify-center gap-2"
          >
            <label class="w-32 text-gray-700 font-medium"
              >{{ $t("forms.fields.full_name.label") }}:</label
            >

            <BaseInput
              id="name"
              :placeholder="$t('forms.fields.full_name.placeholder')"
              class="w-full md:w-[300px] py-1.5 text-sm"
              type="text"
              v-bind="editedUser.fullNameAttrs.value"
              v-model="editedUser.fullName.value"
              :error="editedUser.errors.value.fullName"
            />
          </div>

          <div
            class="flex flex-col md:flex-row md:items-center justify-center gap-2"
          >
            <label class="w-32 text-gray-700 font-medium"
              >{{ $t("forms.fields.email.label") }}:</label
            >

            <BaseInput
              id="email"
              :placeholder="$t('forms.fields.email.placeholder')"
              class="w-full md:w-[300px] py-1.5 text-sm"
              type="email"
              v-bind="editedUser.emailAttrs.value"
              v-model="editedUser.email.value"
              :error="editedUser.errors.value.email"
            />
          </div>

          <div
            class="flex flex-col md:flex-row md:items-center justify-center gap-2"
          >
            <label class="w-32 text-gray-700 font-medium"
              >{{ $t("forms.fields.phone.label") }}:</label
            >

            <BaseInput
              id="name"
              :placeholder="$t('forms.fields.phone.placeholder')"
              class="w-full md:w-[300px] py-1.5 text-sm"
              type="tel"
              v-bind="editedUser.phoneNumberAttrs.value"
              v-model="editedUser.phoneNumber.value"
              :error="editedUser.errors.value.phoneNumber"
            />
          </div>
        </div>
      </div>

      <h2 class="text-xl font-bold text-black">{{ $t("cars.title") }}</h2>

      <div class="space-y-4" v-if="user?.cars">
        <div
          class="flex items-center justify-between rounded-lg border border-gray-200 p-3 bg-gray-50"
        >
          <span class="font-medium text-gray-700"
            >{{ $t("cars.total_cars") }}:</span
          >
          <span class="font-bold text-black">{{ user.cars.length }}</span>
        </div>

        <div class="flex flex-col gap-4">
          <CarCard
            v-for="car in user.cars"
            :key="car.id"
            :car="car"
            @on-car-delete="handleDeleteCar"
            @save-changes="handleSaveCarChanges"
          />
        </div>
      </div>
    </div>

    <Actions
      :has-changes="editedUser.meta.value.dirty || !!avatarPreview"
      @add-car="addCarModalIsVisible = true"
      @cancel="onCancel"
      @save-profile="saveProfile"
      @delete-account="deleteAccountModalIsVisible = true"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import Avatar from "../components/Settings/Avatar.vue";
import CarCard from "../components/Settings/CarCard.vue";
import Actions from "../components/Settings/Actions.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import BaseModal from "@/components/Base/BaseModal.vue";
import { useValidateUser } from "../composables/useValidateUser";
import { useValidateCar } from "../composables/useValidateCar";
import type { Car } from "@/types";

const { logout } = useAuthStore();
const { user } = storeToRefs(useAuthStore());

const editedUser = useValidateUser();
const newCar = useValidateCar();

const addCarModalIsVisible = ref(false);
const deleteCarModalIsVisible = ref(false);
const deleteAccountModalIsVisible = ref(false);

const deleteCarId = ref<string | null>(null);
const avatarPreview = ref<string | null>(user.value!.avatarUrl);

const handleAvatarChange = (file: File) => {
  avatarPreview.value = URL.createObjectURL(file);
};

const handleAddCar = newCar.handleSubmit((values) => {
  const car = {
    model: values.model,
    brand: values.brand,
    color: values.color,
    number: values.number,
  } as Car;

  console.log("Car", car);

  newCar.resetForm();
  addCarModalIsVisible.value = false;
});

const handleDeleteCar = (id: string) => {
  deleteCarModalIsVisible.value = true;
  deleteCarId.value = id;
};

const handleSaveCarChanges = (id: string, car: Car) => {
  console.log(id, car);
};

const confirmDeleteCar = () => {
  console.log(deleteCarId.value);
  deleteCarModalIsVisible.value = false;
};

const onCancel = () => {
  editedUser.resetForm();
  avatarPreview.value = user.value!.avatarUrl;
};

const saveProfile = editedUser.handleSubmit(() => {
  console.log("Save profile");
});

const handleDeleteAccount = async () => {
  try {
    await logout();
  } catch (error) {
    console.error(error);
  }
};
</script>
