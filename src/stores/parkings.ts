import { createParking, getParkings } from "@/services/parkings";
import type { Parking } from "@/types";
import { showNotification } from "@/utils";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

export const useParkingsStore = defineStore("parkings", () => {
  const { t } = useI18n();
  const parkings = ref<Parking[]>([]);

  const setParkings = async (forceRefresh = false) => {
    try {
      if (parkings.value.length && !forceRefresh) {
        return;
      }

      const data = await getParkings();

      parkings.value = data;
    } catch (error) {
      showNotification(
        "error",
        t("toasts.error.failed_action", {
          action: t("actions.get"),
          entity: t("common.parkings"),
        })
      );
      console.error(error);
    }
  };

  const handleCreateParking = async () => {
    try {
      const status = await createParking();

      if (status !== 201) {
        throw new Error("Failed create parking");
      }

      // Toast
      await setParkings(true);
    } catch (error) {
      showNotification(
        "error",
        t("toasts.error.failed_action", {
          action: t("actions.create"),
          entity: t("common.parking"),
        })
      );
      console.error(error);
    }
  };

  return {
    parkings,
    setParkings,
  };
});
