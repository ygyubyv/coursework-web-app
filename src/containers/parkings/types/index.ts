import type { Parking } from "@/types/User";

export interface Booking {
  id: string;
  status: "active" | "completed";
  date: string;
  start: string;
  end: string;
  car: { id: string; brand: string; model: string };
  parking: Parking;
}
