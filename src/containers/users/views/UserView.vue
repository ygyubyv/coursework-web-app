<template>
  <div class="max-w-5xl mx-auto p-6" v-if="user && !isLoading">
    <!-- Modals -->
    <div>
      <CreateCar
        v-model:modal-is-visible="createCarModalIsVisible"
        @submit="handleCreateCar"
      />

      <UpdateCar
        v-if="selectedCar"
        v-model:modal-is-visible="updateCarModalIsVisible"
        :initial-values="selectedCar"
        @submit="handleUpdateCar"
      />

      <Confirm
        v-model="deleteCarModalIsVisible"
        :title="$t('modals.delete_car.title')"
        :message="$t('modals.delete_car.message')"
        :confirm-text="$t('modals.delete_car.submit_text')"
        :cancel-text="$t('buttons.cancel')"
        @confirm="handleDeleteCar"
      />
    </div>

    <ProfileHeader :user="user" />

    <Divider />

    <ProfileData :user="user" />

    <UserCars
      :cars="user.cars"
      @create-car="onCarAction"
      @update-car="onCarAction"
      @delete-car="onCarAction"
    />
  </div>

  <div
    v-if="isLoading"
    class="w-full h-[70vh] flex items-center justify-center"
  >
    <BaseSpinner mode="Black-spinner" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import BaseSpinner from "@/components/Base/BaseSpinner.vue";
import { useUserDetails } from "../composables/details/useUserDetails";
import ProfileHeader from "../components/details/ProfileHeader.vue";
import Divider from "../components/details/Divider.vue";
import ProfileData from "../components/details/ProfileData.vue";
import UserCars from "../components/details/UserCars.vue";
import CreateCar from "@/components/Modals/Cars/CreateCar.vue";
import UpdateCar from "@/components/Modals/Cars/UpdateCar.vue";
import Confirm from "@/components/Modals/Confirm.vue";
import { useCarActions } from "../composables/details/useCarActions";
import { computed } from "vue";

const route = useRoute();
const userId = route.params.id as string;

const { user, isLoading: userDetailsLoading } = useUserDetails(userId);
const {
  isLoading: carActionsLoading,
  onCarAction,
  selectedCar,
  createCarModalIsVisible,
  handleCreateCar,
  updateCarModalIsVisible,
  handleUpdateCar,
  deleteCarModalIsVisible,
  handleDeleteCar,
} = useCarActions(userId);

const isLoading = computed(() => {
  return userDetailsLoading.value || carActionsLoading.value;
});
</script>
