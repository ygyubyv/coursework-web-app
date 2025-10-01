export interface Tier {
  title: string;
  description: string;
  price: string;
  active: boolean;
}

export interface PaymentMethod {
  id: string;
  pan: string;
  expires: string;
}
