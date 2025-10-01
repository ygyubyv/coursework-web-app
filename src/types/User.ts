import type { Car } from "./car";
import type { UserSubscription } from "./subscription";
import type { Transaction } from "./transaction";
import type { Booking } from "./booking";

export type Role = "user" | "guardian" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string | null;
  cars: Car[];
  roles: Role[];
  subscription: UserSubscription;
  transactions: Transaction[];
  createdAt: string;
  bookings: Booking[];
};
