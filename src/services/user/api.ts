import { API_URL } from "@/config";

// Get

export const get_user = (id: string) => `${API_URL}/users/${id}`;

export const get_user_cars = (id: string) => `${API_URL}/users/${id}/cars`;

export const get_user_subscriptions = (id: string) =>
  `${API_URL}/users/${id}/subscriptions`;

export const get_user_transactions = (id: string) =>
  `${API_URL}/users/${id}/transactions`;

export const get_user_bookings = (id: string) =>
  `${API_URL}/users/${id}/bookings`;

// Post

export const create_user_car = (id: string) => `${API_URL}/users/${id}/cars`;

export const create_user_avatar_upload_url = () =>
  `${API_URL}/users/avatar/upload-url`;

// Patch

export const update_user = (id: string) => `${API_URL}/users/${id}`;

export const update_user_car = (userId: string, carId: string) =>
  `${API_URL}/users/${userId}/cars/${carId}`;

export const update_user_avatar = () => `${API_URL}/users/avatar`;

// Delete

export const delete_user = (id: string) => `${API_URL}/users/${id}`;

export const delete_user_car = (userId: string, carId: string) =>
  `${API_URL}/users/${userId}/cars/${carId}`;
