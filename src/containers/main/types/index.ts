export interface Tier {
  id: string;
  plan: string;
  description: string;
  price: number;
  features: string[];
  badgeLabel?: string;
  ctaLabel: string;
}

export interface PaymentWay {
  icon: string;
  title: string;
  description: string;
}

export interface Step {
  icon: string;
  title: string;
  description: string;
}
