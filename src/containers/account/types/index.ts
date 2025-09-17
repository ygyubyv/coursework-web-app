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

export interface Transaction {
  id: string;
  date: string | Date;
  description: string;
  amount: number;
  status: "Success" | "Failed" | "Pending";
}
