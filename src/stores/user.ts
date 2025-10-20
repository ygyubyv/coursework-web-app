import { ref } from "vue";
import { defineStore } from "pinia";
import type { User, UserSummary } from "@/types";
import {
  getUser,
  getUserCars,
  getUserSubscriptions,
  getUserTransactions,
  getUserBookings,
} from "@/services/user";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);

  const setUser = async (id: string) => {
    if (user.value) {
      return;
    }

    try {
      const response = await getUser(id);

      if ("errorStatus" in response) {
        // Toast
        return;
      }

      user.value = response;
    } catch (error) {
      console.error(error);
    }
  };

  const setUserCars = async (forceRefresh = false) => {
    if (user.value!.cars?.length && !forceRefresh) {
      return;
    }

    try {
      const response = await getUserCars(user.value!.id);

      user.value!.cars = response;
    } catch (error) {
      console.error(error);
    }
  };

  const setUserSubscriptions = async () => {
    if (user.value!.subscription) {
      return;
    }

    try {
      const response = await getUserSubscriptions(user.value!.id);

      user.value!.subscription = response;
    } catch (error) {
      console.error(error);
    }
  };

  const setUserTransactions = async () => {
    if (user.value!.transactions?.length) {
      return;
    }

    try {
      const response = await getUserTransactions(user.value!.id);

      user.value!.transactions = response;
    } catch (error) {
      console.error(error);
    }
  };

  const setUserBookings = async () => {
    if (user.value!.bookings?.length) {
      return;
    }

    try {
      const response = await getUserBookings(user.value!.id);

      user.value!.bookings = response;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserSummary = (updates: Partial<UserSummary>) => {
    if (!user.value) {
      return;
    }

    user.value = {
      ...user.value,
      ...updates,
    };
  };

  return {
    user,
    setUser,
    setUserCars,
    setUserSubscriptions,
    setUserTransactions,
    setUserBookings,
    updateUserSummary,
  };
});
