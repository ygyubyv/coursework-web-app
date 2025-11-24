import {
  getUser,
  getUserCars,
  getUserBookings,
  getUserTransactions,
} from "@/services/user";
import type { User } from "@/types";
import { useQuery } from "@tanstack/vue-query";
import { ref, computed, watch } from "vue";

export const useUserDetails = (userId: string) => {
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

  const isLoading = computed(() => {
    return (
      userLoading.value ||
      userCarsLoading.value ||
      userBookingsLoading.value ||
      userTransactionsLoading.value
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
  };
};
