<template>
  <!-- Modals -->
  <div>
    <CreateCar
      v-model:modal-is-visible="createCarModalIsVisible"
      @submit="handleCreateUserCar"
    />

    <BaseModal
      v-if="deleteAccountModalIsVisible"
      @submit="handleDeleteAccount"
      @close="deleteAccountModalIsVisible = false"
      :title="$t('modals.delete_account.title')"
      :submit-text="$t('modals.delete_account.submit_text')"
      :message="$t('modals.delete_account.message')"
    />
  </div>

  <section class="py-6">
    <div
      class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-6 mb-8"
    >
      <UserData
        :edited-user="editedUser"
        :avatar-preview="avatarPreview"
        :avatar-url="user!.avatarUrl"
        @on-avatar-change="handleAvatarChange"
      />

      <UserCars
        :cars="user!.cars"
        @update-car="handleUpdateUserCar"
        @delete-car="handleDeleteUserCar"
      />
    </div>

    <Actions
      :has-changes="editedUser.meta.value.dirty || !!avatarFile"
      @add-car="createCarModalIsVisible = true"
      @cancel="clearState"
      @save-profile="saveProfile"
      @delete-account="deleteAccountModalIsVisible = true"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import UserCars from "../components/Settings/UserCars.vue";
import Actions from "../components/Settings/Actions.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import BaseModal from "@/components/Base/BaseModal.vue";
import { useValidateUser } from "../composables/useValidateUser";
import { useUserStore } from "@/stores/user";
import CreateCar from "@/components/Modals/Cars/CreateCar.vue";
import { deleteUser, updateUser } from "@/services/user";
import { showNotification } from "@/utils";
import { useI18n } from "vue-i18n";
import { useCarActions } from "../composables/useCarActions";
import { useAvatarActions } from "../composables/useAvatarActions";
import UserData from "../components/Settings/UserData.vue";

const { t } = useI18n();

const { logout } = useAuthStore();

const userStore = useUserStore();
const { setUserCars, updateUserSummary } = userStore;
const { user } = storeToRefs(userStore);

const editedUser = useValidateUser();

const {
  createCarModalIsVisible,
  handleCreateUserCar,
  handleUpdateUserCar,
  handleDeleteUserCar,
} = useCarActions();

const { avatarFile, avatarPreview, handleAvatarChange, saveAvatar } =
  useAvatarActions();

const deleteAccountModalIsVisible = ref(false);

const saveProfile = editedUser.handleSubmit(async (values) => {
  try {
    const updates = await updateUser(user.value!.id, {
      ...values,
    });

    if (avatarFile.value) {
      const newAvatar = await saveAvatar();
      updates.avatarUrl = newAvatar;
    }

    updateUserSummary(updates);

    clearState();

    showNotification(
      "success",
      t("toasts.success.updated", {
        entity: t("common.account"),
      })
    );
  } catch (error) {
    showNotification(
      "error",
      t("toasts.error.failed_action", {
        action: t("actions.save"),
        entity: t("common.account"),
      })
    );
    console.error(error);
  }
});

const handleDeleteAccount = async () => {
  try {
    const status = await deleteUser(user.value!.id);

    if (status === 204) {
      showNotification(
        "success",
        t("toasts.success.updated", {
          entity: t("common.account"),
        })
      );
      await logout();
    }
  } catch (error) {
    showNotification(
      "error",
      t("toasts.error.failed_action", {
        action: t("actions.delete"),
        entity: t("common.account"),
      })
    );
    console.error(error);
  }
};

const clearState = () => {
  editedUser.resetForm();
  avatarFile.value = null;
  avatarPreview.value = user.value!.avatarUrl;
};

onMounted(() => {
  setUserCars();
});
</script>
