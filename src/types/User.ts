export type Role = "user" | "guardian" | "admin";

export interface Car {
  id: string;
  numbers: string;
  brand: string;
  model: string;
  year: number;
  color: string;
}

export type Tier = {
  id: string;
  name: string;
  price: number;
};

export type UserSubscription = {
  tier: Tier; // Зв'язок в бд один до одного
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "canceled";
};

export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string | null;
  cars: Car[]; // Зв'язок в бд один до багатьох
  roles: Role[];
  subscription: UserSubscription; // Зв'язок в бд один до одного
  createdAt: string;
};
