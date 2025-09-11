import type { PaymentWay } from "../types";

export const paymentWays: PaymentWay[] = [
  {
    icon: "cash-register",
    title: "Pay at the Cashier",
    description: "Convenient option if you prefer paying directly on-site.",
  },
  {
    icon: "laptop",
    title: "Online Booking",
    description: "Reserve your parking spot in advance with just a few clicks.",
  },
  {
    icon: "calendar-check",
    title: "Subscription Plans",
    description:
      "Ideal for regular drivers and companies who want flexibility.",
  },
];
