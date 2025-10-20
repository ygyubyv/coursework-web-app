<template>
  <AddCarModal v-if="addCarModalIsVisible" v-model="addCarModalIsVisible" />

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
          :avatar-url="avatarPreview || user?.avatarUrl || DEFAULT_AVATAR"
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
              v-bind="editedUser.nameAttrs.value"
              v-model="editedUser.name.value"
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
              id="phoneNumber"
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

      <div class="space-y-4" v-if="user!.cars && user!.cars?.length">
        <div
          class="flex items-center justify-between rounded-lg border border-gray-200 p-3 bg-gray-50"
        >
          <span class="font-medium text-gray-700"
            >{{ $t("cars.total_cars") }}:</span
          >
          <span class="font-bold text-black">{{ user!.cars.length }}</span>
        </div>

        <div class="flex flex-col gap-4">
          <CarCard
            v-for="car in user!.cars"
            :key="car.id"
            :car="car"
            @on-car-delete="handleDeleteCar"
            @save-changes="handleUpdateCar"
          />
        </div>
      </div>

      <div v-else>
        <p>У вас поки що не додано жодного автомобіля</p>
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
import { onMounted, ref } from "vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import Avatar from "../components/Settings/Avatar.vue";
import CarCard from "../components/Settings/CarCard.vue";
import Actions from "../components/Settings/Actions.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import BaseModal from "@/components/Base/BaseModal.vue";
import { useValidateUser } from "../composables/useValidateUser";
import type { Car } from "@/types";
import { useUserStore } from "@/stores/user";
import { DEFAULT_AVATAR } from "@/constants";
import AddCarModal from "@/components/Modals/BookCar/ui/AddCarModal.vue";
import {
  deleteUser,
  deleteUserCar,
  updateUser,
  updateUserCar,
} from "@/services/user";

const userStore = useUserStore();

const { logout } = useAuthStore();
const { setUserCars, updateUserSummary } = userStore;
const { user } = storeToRefs(userStore);

const editedUser = useValidateUser();

const addCarModalIsVisible = ref(false);
const deleteCarModalIsVisible = ref(false);
const deleteAccountModalIsVisible = ref(false);

const deleteCarId = ref<string | null>(null);
const avatarPreview = ref<string | null>(user.value?.avatarUrl || null);

const handleAvatarChange = (file: File) => {
  avatarPreview.value = URL.createObjectURL(file);
};

const handleDeleteCar = (id: string) => {
  deleteCarModalIsVisible.value = true;
  deleteCarId.value = id;
};

const handleUpdateCar = async (carId: string, car: Car) => {
  try {
    await updateUserCar(user.value!.id, carId, car);
    setUserCars(true);
  } catch (error) {
    console.error(error);
  }
};

const confirmDeleteCar = async () => {
  try {
    const responseStatus = await deleteUserCar(
      user.value!.id,
      deleteCarId.value!
    );

    if (responseStatus !== 204) {
      // Toast
      throw new Error("Cant delete car");
    }

    setUserCars(true);
    deleteCarModalIsVisible.value = false;

    // Toast
  } catch (error) {
    console.error(error);
  }
};

const saveProfile = editedUser.handleSubmit(async (values) => {
  try {
    const updates = await updateUser(user.value!.id, {
      ...values,
    });

    updateUserSummary(updates);
  } catch (error) {
    console.error(error);
  }
});

const handleDeleteAccount = async () => {
  try {
    const status = await deleteUser(user.value!.id);

    if (status === 204) {
      // Toast
      await logout();
    }
  } catch (error) {
    console.error(error);
  }
};

const onCancel = () => {
  editedUser.resetForm();
  avatarPreview.value = user.value!.avatarUrl;
};

onMounted(() => {
  setUserCars();
});
</script>
