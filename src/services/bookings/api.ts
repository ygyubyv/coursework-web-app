import { API_URL } from "@/config";

export const get_booking = (id: string) => `${API_URL}/booking/${id}`;

export const get_bookings = `${API_URL}/bookings/`;

export const create_booking = `${API_URL}/bookings/`;

export const update_booking = (id: string) => `${API_URL}/bookings/${id}`;

export const delete_booking = (id: string) => `${API_URL}/bookings/${id}/`;
