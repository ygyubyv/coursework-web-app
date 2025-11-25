import { createBooking } from "@/services/bookings";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import type { BookForm, Parking } from "@/types";
import { showNotification } from "@/utils";
import { storeToRefs } from "pinia";
import { ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";

export const useBookActions = (parkings: Ref<Parking[]>) => {
  const { t } = useI18n();

  const userStore = useUserStore();
  const authStore = useAuthStore();

  const { setUserCars } = userStore;
  const { user } = storeToRefs(userStore);
  const { authModalIsVisible, isAuthenticated } = storeToRefs(authStore);

  const bookModalIsVisible = ref(false);
  const selectedParking = ref<Parking | null>(null);

  const handleBook = async (id: string) => {
    if (!isAuthenticated.value || !user.value) {
      authModalIsVisible.value = true;
      return;
    }

    await setUserCars();

    selectedParking.value = parkings.value.find((parking) => {
      return parking.id === id;
    })!;

    bookModalIsVisible.value = true;
  };

  const handleSubmit = async (form: BookForm) => {
    try {
      const status = await createBooking(form);

      if (status !== 201) {
        throw new Error("Failed create car");
      }

      showNotification(
        "success",
        t("toasts.success.created", {
          entity: t("common.booking"),
        })
      );
    } catch (error) {
      showNotification(
        "error",
        t("toasts.error.failed_action", {
          action: t("actions.create"),
          entity: t("common.booking"),
        })
      );
      console.error(error);
    }
  };

  return {
    selectedParking,
    bookModalIsVisible,
    handleBook,
    handleSubmit,
  };
};
