export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Parking {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  availableSpots: number;
  totalSpots: number;
}
