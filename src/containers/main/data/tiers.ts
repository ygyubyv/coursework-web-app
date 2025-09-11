import type { Tier } from "../types";

export const tiers: Tier[] = [
  {
    id: "standard",
    plan: "Standard",
    description: "Best for individual drivers",
    price: 9,
    features: ["Unlimited bookings", "Priority support", "Parking history"],
    ctaLabel: "Choose Plan",
  },
  {
    id: "business",
    plan: "Business",
    description: "For companies & fleets",
    price: 29,
    features: [
      "Team management",
      "Multiple vehicle support",
      "Reserved spots & reports",
    ],
    badgeLabel: "Popular",
    ctaLabel: "Contact Sales",
  },
];
