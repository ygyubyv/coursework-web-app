import type { Car } from "@/types/User";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Option {
  label: string;
  value: string | number | boolean;
}

export interface Destination {
  distance: string;
  duration: string;
  name: string;
}

export interface BookForm {
  parkingId: string;
  date: Date;
  start: string;
  end: string;
  car: Car;
}
