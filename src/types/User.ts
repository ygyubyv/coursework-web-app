import type { Car } from "./Car";
import type { UserSubscription } from "./Subscription";
import type { Transaction } from "./Transaction";
import type { Booking } from "./Booking";

export type Role = "user" | "guardian" | "admin" | "owner";

export type UserSummary = Pick<
  User,
  "id" | "name" | "email" | "phoneNumber" | "avatarUrl" | "createdAt"
>;

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
  cars: Car[];
  roles: Role[];
  subscription: UserSubscription | null;
  transactions: Transaction[];
  createdAt: string;
  bookings: Booking[];
};
