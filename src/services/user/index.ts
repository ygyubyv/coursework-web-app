import { storeToRefs } from "pinia";
import {
  get_user,
  get_user_cars,
  get_user_subscriptions,
  get_user_transactions,
  get_user_bookings,
  create_user_car,
  create_user_avatar_upload_url,
  update_user,
  update_user_car,
  update_user_avatar,
  delete_user,
  delete_user_car,
} from "./api";

import { useAuthStore } from "@/stores/auth";

import type {
  Booking,
  Car,
  CreateCar,
  Transaction,
  User,
  UserSubscription,
  UserSummary,
} from "@/types";

interface GetUserCarsResponse {
  cars: Car[];
}

interface GetUserBookingsResponse {
  bookings: Booking[];
}

interface CreateUserAvatarUploadUrl {
  fileUrl: string;
  uploadUrl: string;
}

interface DeleteUserResponse {
  message: string;
  status: string;
}

// Get

export const getUser = async (id: string) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(get_user(id), {
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
    },
  });

  if (!response.ok) {
    return {
      errorStatus: response.status,
    };
  }

  const data = (await response.json()) as User;

  return data;
};

export const getUserCars = async (id: string) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(get_user_cars(id), {
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }

  const data = (await response.json()) as GetUserCarsResponse;

  return data.cars;
};

export const getUserSubscriptions = async (id: string) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(get_user_subscriptions(id), {
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch subscriptions");
  }

  const subscriptions = (await response.json()) as UserSubscription;

  return subscriptions;
};

export const getUserTransactions = async (id: string) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(get_user_transactions(id), {
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  const transactions = (await response.json()) as Transaction[];

  return transactions;
};

export const getUserBookings = async (id: string) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(get_user_bookings(id), {
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const data = (await response.json()) as GetUserBookingsResponse;

  return data.bookings;
};

// Post

export const createUserCar = async (id: string, car: CreateCar) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(create_user_car(id), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    throw new Error("Failed to create car");
  }

  return response.json();
};

export const createUserAvatarUploadUrl = async (id: string) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(create_user_avatar_upload_url(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: id,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create upload avatar url");
  }

  const data = (await response.json()) as CreateUserAvatarUploadUrl;

  return data;
};

// Patch

export const updateUser = async (id: string, user: Partial<UserSummary>) => {
  const { bearerToken } = storeToRefs(useAuthStore());
  const response = await fetch(update_user(id), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  const updatedUser = (await response.json()) as UserSummary;

  return updatedUser;
};

export const updateUserCar = async (
  userId: string,
  carId: string,
  car: Car
) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(update_user_car(userId, carId), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    throw new Error("Failed to update car");
  }

  const updatedCar = (await response.json()) as Car;

  return updatedCar;
};

export const updateUserAvatar = async (id: string, fileUrl: string) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(update_user_avatar(), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: id,
      fileUrl: fileUrl,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update avatar");
  }

  const data = await response.json();

  return data;
};

// Delete

export const deleteUser = async (id: string) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(delete_user(id), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete USER");
  }

  return response.status;
};

export const deleteUserCar = async (userId: string, carId: string) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(delete_user_car(userId, carId), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete car");
  }

  return response.status;
};
