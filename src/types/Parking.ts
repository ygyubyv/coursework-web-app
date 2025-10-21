import type { Coordinates } from "./Common";

export interface Parking {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  availableSpots: number;
  totalSpots: number;
}
