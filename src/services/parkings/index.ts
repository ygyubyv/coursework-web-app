import type { Parking } from "@/types";
import {
  create_parking,
  delete_parking,
  get_parking,
  get_parkings,
} from "./api";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

export const getParking = async (id: string) => {
  const response = await fetch(get_parking(id));

  if (!response.ok) {
    throw new Error("Failed to fetch parking");
  }

  const parking = await response.json();

  return parking as Parking;
};

export const getParkings = async () => {
  const response = await fetch(get_parkings);

  if (!response.ok) {
    throw new Error("Failed to fetch parkings");
  }

  const parkings = await response.json();

  return parkings as Parking[];
};

export const createParking = async () => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(create_parking, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create parking");
  }

  return response.status;
};

export const deleteParking = async (id: string) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(delete_parking(id), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete parking");
  }

  return response.status;
};
