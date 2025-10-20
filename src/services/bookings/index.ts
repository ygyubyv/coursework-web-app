import {
  get_booking,
  get_bookings,
  create_booking,
  delete_booking,
} from "./api";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import type { Booking, BookForm } from "@/types";

export const getBooking = async (id: string) => {
  const response = await fetch(get_booking(id));

  if (!response.ok) {
    throw new Error("Failed to fetch booking");
  }

  const booking = await response.json();

  return booking as Booking;
};

export const getBookings = async () => {
  const response = await fetch(get_bookings);

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const bookings = await response.json();

  return bookings as Booking[];
};

export const createBooking = async (payload: BookForm) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(create_booking, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }

  return response.status;
};

export const deleteBooking = async (id: string) => {
  const { bearerToken } = storeToRefs(useAuthStore());

  const response = await fetch(delete_booking(id), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${bearerToken.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete booking");
  }

  return response.status;
};
