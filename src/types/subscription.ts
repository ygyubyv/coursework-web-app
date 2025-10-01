export type Tier = {
  id: string;
  name: string;
  price: number;
};

export type UserSubscription = {
  tier: Tier;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "canceled";
};
