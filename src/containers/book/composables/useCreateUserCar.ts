import { createUserCar } from "@/services/user";
import { useUserStore } from "@/stores/user";
import type { CreateCar } from "@/types";
import { showNotification } from "@/utils";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useCreateUserCar = () => {
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

  return {
    createCarModalIsVisible,
    handleCreateUserCar,
  };
};
