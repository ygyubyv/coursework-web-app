import { API_URL } from "@/config";

export const get_parking = (id: string) => `${API_URL}/parkings/${id}`;

export const get_parkings = `${API_URL}/parkings/`;

export const create_parking = `${API_URL}/parkings/`;

export const delete_parking = (id: string) => `${API_URL}/parkings/${id}`;
