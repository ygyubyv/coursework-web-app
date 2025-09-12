import type { User } from "@/types/User";

export const ANDROIN_APP_URL = "https://www.google.com/?hl=uk";
export const IOS_APP_URL = "https://www.google.com/?hl=uk";
export const DEFAULT_AVATAR = "/src/assets/images/no-avatar-black.svg";

export const DEFAULT_USER: User = {
  id: "1",
  name: "Vasyl Kozubovych",
  email: "vasyl@example.com",
  phoneNumber: "+380 123 456 789",
  avatarUrl: null,
  createdAt: "2024-06-18T12:34:56Z",
  roles: ["user", "guardian", "admin"],
  cars: [
    {
      id: "1",
      numbers: "AA1234BB",
      brand: "Toyota",
      model: "Camry",
      year: 2020,
      color: "White",
    },
    {
      id: "2",
      numbers: "CC5678DD",
      brand: "BMW",
      model: "X5",
      year: 2022,
      color: "Black",
    },
  ],
  subscription: {
    tier: {
      id: "1",
      name: "Basic",
      price: 30,
    },
    startDate: "2024-06-01T09:00:00Z",
    endDate: "2025-06-01T09:00:00Z",
    status: "active",
  },
};
