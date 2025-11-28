import {
  getUser,
  getUserCars,
  getUserBookings,
  getUserTransactions,
  updateUser,
} from "@/services/user";
import { useAuthStore } from "@/stores/auth";
import type { User, UserSummary } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { ref, computed, watch } from "vue";
import { showNotification } from "@/utils";
import { useI18n } from "vue-i18n";

export const useUserDetails = (userId: string) => {
  const { hasRole } = useAuthStore();

  const queryClient = useQueryClient();
  const { t } = useI18n();

  const emptyUser: User = {
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    avatarUrl: null,
    createdAt: "",
    roles: [],
    cars: [],
    bookings: [],
    subscription: null,
    transactions: [],
  };

  const user = ref<User>(emptyUser);
  const updateUserModalIsVisible = ref(false);

  const isLoading = computed(() => {
    return (
      userLoading.value ||
      userCarsLoading.value ||
      userBookingsLoading.value ||
      userTransactionsLoading.value ||
      updateUserLoading.value
    );
  });

  const {
    isPending: userLoading,
    isSuccess: userLoaded,
    data: userData,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });

  const { data: userCars, isPending: userCarsLoading } = useQuery({
    queryKey: ["user", userId, "cars"],
    queryFn: () => getUserCars(userId),
    enabled: userLoaded,
  });

  const { data: userBookings, isPending: userBookingsLoading } = useQuery({
    queryKey: ["user", userId, "bookings"],
    queryFn: () => getUserBookings(userId),
    enabled: userLoaded,
  });

  const { data: userTransactions, isPending: userTransactionsLoading } =
    useQuery({
      queryKey: ["user", userId, "transactions"],
      queryFn: () => getUserTransactions(userId),
      enabled: userLoaded,
    });

  const { mutate: handleUpdateUser, isPending: updateUserLoading } =
    useMutation({
      mutationFn: async (payload: Partial<UserSummary>) => {
        if ("roles" in payload) {
          if (payload.roles?.includes("admin") && !hasRole("owner")) {
            showNotification("error", t("toasts.error.auth.no_permission"));
            throw new Error("NO_PERMISSION");
          }
        }

        return await updateUser(userId, payload);
      },

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user", userId],
        });
      },

      onError: (err) => {
        console.error("Failed to update user:", err);
      },
    });

  watch(userData, (val) => {
    if (val) {
      user.value = { ...val };
    }
  });

  watch(userCars, (val) => {
    if (val) {
      user.value!.cars = [...val];
    }
  });

  watch(userBookings, (val) => {
    if (val) {
      user.value!.bookings = [...val];
    }
  });

  watch(userTransactions, (val) => {
    if (val) {
      user.value!.transactions = [...val];
    }
  });

  return {
    user,
    isLoading,
    updateUserModalIsVisible,
    handleUpdateUser,
  };
};
