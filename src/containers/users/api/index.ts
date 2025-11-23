import { API_URL } from "@/config";

// Get

export const get_user = (id: string) => `${API_URL}/users/${id}`;

export const get_users = () => `${API_URL}/users`;
