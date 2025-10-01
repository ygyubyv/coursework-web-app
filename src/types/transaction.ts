export interface Transaction {
  id: string;
  date: string | Date;
  description: string;
  amount: number;
  status: "Success" | "Failed" | "Pending";
}
