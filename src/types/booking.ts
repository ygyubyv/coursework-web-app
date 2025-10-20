import type { Car } from "./Car";
import type { Parking } from "./Parking";

export interface Booking {
  id: string;
  status: "active" | "completed";
  date: string;
  start: string;
  end: string;
  car: Car;
  parking: Parking;
}

export interface BookForm {
  userId: string;
  parkingId: string;
  carId: string;
  start: string;
  end: string;
}
