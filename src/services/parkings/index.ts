import type { PaginatedResponse, PaginationParams, Parking } from "@/types";
import {
  create_parking,
  delete_parking,
  get_parking,
  get_parkings,
} from "./api";
import axiosInstance from "../../plugins/axios";

export const getParking = async (id: string) => {
  const response = await axiosInstance.get<Parking>(get_parking(id));
  return response.data;
};

export const getParkings = async (query?: PaginationParams) => {
  const response = await axiosInstance.get<
    PaginatedResponse<Parking, "parkings">
  >(get_parkings, {
    params: query,
  });
  return response.data;
};

export const createParking = async () => {
  const response = await axiosInstance.post(create_parking);
  return response.status;
};

export const deleteParking = async (id: string) => {
  const response = await axiosInstance.delete(delete_parking(id));
  return response.status;
};
