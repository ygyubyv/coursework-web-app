import type { Parking } from "./Parking";

export interface Booking {
  id: number;
  carId: number;
  userId: string;
  start: string;
  end: string;
  status: "active" | "completed";
  parkingObj?: Parking;
}

export interface BookForm {
  userId: string;
  parkingId: string;
  carId: string;
  start: string;
  end: string;
}
