import type { Car } from "./car";
import type { Parking } from "./parking";

export interface Booking {
  id: string;
  status: "active" | "completed";
  date: string;
  start: string;
  end: string;
  car: Car;
  parking: Parking;
}
