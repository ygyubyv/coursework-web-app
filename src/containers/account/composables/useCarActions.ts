import { createUserCar, deleteUserCar, updateUserCar } from "@/services/user";
import { useUserStore } from "@/stores/user";
import type { CreateCar, UpdateCar } from "@/types";
import { showNotification } from "@/utils";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useCarActions = () => {
  const userStore = useUserStore();
  const { setUserCars } = userStore;
  const { user } = storeToRefs(userStore);

  const { t } = useI18n();

  const createCarModalIsVisible = ref(false);

  const handleCreateUserCar = async (car: CreateCar) => {
    try {
      await createUserCar(user.value!.id, car);

      setUserCars(true);

      showNotification(
        "success",
        t("toasts.success.created", {
          entity: t("common.car"),
        })
      );
    } catch (error) {
      showNotification(
        "error",
        t("toasts.error.failed_action", {
          action: t("actions.create"),
          entity: t("common.car"),
        })
      );

      console.error(error);
    }
  };

  const handleUpdateUserCar = async (carId: string, car: UpdateCar) => {
    try {
      await updateUserCar(user.value!.id, carId, car);
      showNotification(
        "success",
        t("toasts.success.updated", {
          entity: t("common.car"),
        })
      );

      setUserCars(true);
    } catch (error) {
      showNotification(
        "error",
        t("toasts.error.failed_action", {
          action: t("actions.update"),
          entity: t("common.car"),
        })
      );
      console.error(error);
    }
  };

  const handleDeleteUserCar = async (carId: string) => {
    try {
      const responseStatus = await deleteUserCar(user.value!.id, carId);

      if (responseStatus !== 204) {
        throw new Error("Cant delete car");
      }

      showNotification(
        "success",
        t("toasts.success.deleted", {
          entity: t("common.car"),
        })
      );

      setUserCars(true);
    } catch (error) {
      showNotification(
        "error",
        t("toasts.error.failed_action", {
          action: t("actions.delete"),
          entity: t("common.car"),
        })
      );
      console.error(error);
    }
  };

  return {
    createCarModalIsVisible,
    handleCreateUserCar,
    handleUpdateUserCar,
    handleDeleteUserCar,
  };
};
