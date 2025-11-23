import {
  get_booking,
  get_bookings,
  create_booking,
  delete_booking,
} from "./api";
import type { Booking, BookForm } from "@/types";
import axiosInstance from "../../plugins/axios";

export const getBooking = async (id: string) => {
  const response = await axiosInstance.get<Booking>(get_booking(id));
  return response.data;
};

export const getBookings = async () => {
  const response = await axiosInstance.get<Booking[]>(get_bookings);
  return response.data;
};

export const createBooking = async (payload: BookForm) => {
  const response = await axiosInstance.post(create_booking, payload);
  return response.status;
};

export const deleteBooking = async (id: string) => {
  const response = await axiosInstance.delete(delete_booking(id));
  return response.status;
};
