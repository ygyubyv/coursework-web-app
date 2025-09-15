import type { Tier, PaymentMethod, Transaction } from "../types";

export const tiers: Tier[] = [
  {
    title: "Standard",
    description: "Best for individual drivers",
    price: "$9 / month",
    active: true,
  },
  {
    title: "Business",
    description: "For companies & fleets",
    price: "$29 / month",
    active: false,
  },
];

export const paymentMethods: PaymentMethod[] = [
  {
    brand: "VISA",
    expires: "07/28",
    pan: "4417394756294737",
  },
  {
    brand: "Master Card",
    expires: "05/27",
    pan: "4417394756295716",
  },
];

export const transactions: Transaction[] = [
  {
    id: "1",
    date: "Sep 10, 2025",
    description: "Pro Plan Subscription",
    amount: "-$9.99",
    status: "Success",
  },
  {
    id: "2",
    date: "Aug 10, 2025",
    description: "Pro Plan Subscription",
    amount: "-$9.99",
    status: "Success",
  },
  {
    id: "3",
    date: "Jul 10, 2025",
    description: "Pro Plan Subscription",
    amount: "-$9.99",
    status: "Failed",
  },
];
