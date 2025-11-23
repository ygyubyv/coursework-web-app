import type { Role } from "@/types";

export interface IUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
  roles: Role[];
  createdAt: string;
}
