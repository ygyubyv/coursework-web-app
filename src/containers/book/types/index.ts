import type { Car } from "@/types";

export interface BookForm {
  parkingId: string;
  date: string;
  start: string;
  end: string;
  car: Car;
}
