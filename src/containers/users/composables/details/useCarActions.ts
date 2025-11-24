import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { createUserCar, deleteUserCar, updateUserCar } from "@/services/user";
import type { Car, CarAction, CreateCar, UpdateCar } from "@/types";
import { computed, ref } from "vue";

export const useCarActions = (userId: string) => {
  const queryClient = useQueryClient();

  const selectedCar = ref<Car | null>(null);

  const createCarModalIsVisible = ref(false);
  const updateCarModalIsVisible = ref(false);
  const deleteCarModalIsVisible = ref(false);

  const isLoading = computed(() => {
    return (
      createCarLoading.value || updateCarLoading.value || deleteCarLoading.value
    );
  });

  const onCarAction = (action: CarAction, car?: Car) => {
    selectedCar.value = car ?? null;

    switch (action) {
      case "create":
        createCarModalIsVisible.value = true;
        break;
      case "update":
        updateCarModalIsVisible.value = true;
        break;
      case "delete":
        deleteCarModalIsVisible.value = true;
        break;
    }
  };

  const { mutate: handleCreateCar, isPending: createCarLoading } = useMutation({
    mutationFn: (car: CreateCar) => createUserCar(userId, car),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", userId, "cars"],
      });
    },

    onError: (err) => {
      console.error("Failed to create car", err);
    },
  });

  const { mutate: handleUpdateCar, isPending: updateCarLoading } = useMutation({
    mutationFn: async (car: UpdateCar) => {
      if (!selectedCar.value?.id) {
        throw new Error("No car selected");
      }

      return await updateUserCar(userId, selectedCar.value.id, car);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", userId, "cars"],
      });
    },

    onError: (err) => {
      console.error("Failed to update car", err);
    },
  });

  const { mutate: handleDeleteCar, isPending: deleteCarLoading } = useMutation({
    mutationFn: async () => {
      if (!selectedCar.value?.id) {
        throw new Error("No car selected");
      }

      return await deleteUserCar(userId, selectedCar.value.id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", userId, "cars"],
      });
    },

    onError: (err) => {
      console.error("Failed to delete car", err);
    },
  });

  return {
    isLoading,
    onCarAction,
    selectedCar,
    createCarModalIsVisible,
    handleCreateCar,
    updateCarModalIsVisible,
    handleUpdateCar,
    deleteCarModalIsVisible,
    handleDeleteCar,
  };
};
