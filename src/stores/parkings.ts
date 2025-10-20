import { createParking, getParkings } from "@/services/parkings";
import type { Parking } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useParkingsStore = defineStore("parkings", () => {
  const parkings = ref<Parking[]>([]);

  const setParkings = async (forceRefresh = false) => {
    try {
      if (parkings.value.length && !forceRefresh) {
        return;
      }

      const data = await getParkings();

      parkings.value = data;
    } catch (error) {
      // Toast
      console.error(error);
    }
  };

  const handleCreateParking = async () => {
    try {
      const status = await createParking();

      if (status !== 201) {
        // Toast
        return;
      }

      // Toast
      await setParkings(true);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    parkings,
    setParkings,
  };
});
