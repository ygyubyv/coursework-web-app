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

import axiosInstance from "../../plugins/axios";

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

interface UpdateUserAvatarResponse {
  avatarUrl: string;
}

interface DeleteUserResponse {
  message: string;
  status: string;
}

// Get

export const getUser = async (id: string) => {
  const response = await axiosInstance.get<User>(get_user(id));
  return response.data;
};

export const getUserCars = async (id: string) => {
  const response = await axiosInstance.get<GetUserCarsResponse>(
    get_user_cars(id)
  );
  return response.data.cars;
};

export const getUserSubscriptions = async (id: string) => {
  const response = await axiosInstance.get<UserSubscription>(
    get_user_subscriptions(id)
  );
  return response.data;
};

export const getUserTransactions = async (id: string) => {
  const response = await axiosInstance.get<Transaction[]>(
    get_user_transactions(id)
  );
  return response.data;
};

export const getUserBookings = async (id: string) => {
  const response = await axiosInstance.get<GetUserBookingsResponse>(
    get_user_bookings(id)
  );
  return response.data.bookings;
};

// Post

export const createUserCar = async (id: string, car: CreateCar) => {
  const response = await axiosInstance.post<Car>(create_user_car(id), car);
  return response.data;
};

export const createUserAvatarUploadUrl = async (id: string) => {
  const response = await axiosInstance.post<CreateUserAvatarUploadUrl>(
    create_user_avatar_upload_url(),
    { userId: id }
  );
  return response.data;
};

// Patch

export const updateUser = async (id: string, user: Partial<UserSummary>) => {
  const response = await axiosInstance.patch<UserSummary>(
    update_user(id),
    user
  );
  return response.data;
};

export const updateUserCar = async (
  userId: string,
  carId: string,
  car: Car
) => {
  const response = await axiosInstance.patch<Car>(
    update_user_car(userId, carId),
    car
  );
  return response.data;
};

export const updateUserAvatar = async (id: string, fileUrl: string) => {
  const response = await axiosInstance.patch<UpdateUserAvatarResponse>(
    update_user_avatar(),
    { userId: id, fileUrl: fileUrl }
  );
  return response.data.avatarUrl;
};

// Delete

export const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete<DeleteUserResponse>(
    delete_user(id)
  );
  return Number(response.data.status);
};

export const deleteUserCar = async (userId: string, carId: string) => {
  const response = await axiosInstance.delete<number>(
    delete_user_car(userId, carId)
  );
  return response.status;
};
