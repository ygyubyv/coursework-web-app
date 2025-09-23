import type { Parking } from "../types";

export const parkings: Parking[] = [
  {
    id: "1",
    name: "Central Parking",
    address: "10 Soborna St, Lutsk",
    coordinates: { lat: 50.4794, lng: 26.0 },
    availableSpots: 5,
    totalSpots: 20,
  },
  {
    id: "2",
    name: "Southern Parking",
    address: "45 Bohdana Khmelnytskoho St, Lutsk",
    coordinates: { lat: 50.4755, lng: 25.9625 },
    availableSpots: 3,
    totalSpots: 15,
  },
  {
    id: "3",
    name: "Western Parking",
    address: "12 Myru Ave, Lutsk",
    coordinates: { lat: 50.482, lng: 25.9768 },
    availableSpots: 6,
    totalSpots: 25,
  },

  {
    id: "4",
    name: "Rivne City Center Parking",
    address: "1 Soborna St, Rivne",
    coordinates: { lat: 50.7392, lng: 26.34 },
    availableSpots: 7,
    totalSpots: 30,
  },
  {
    id: "5",
    name: "Rivne North Parking",
    address: "22 Kyivska St, Rivne",
    coordinates: { lat: 50.742, lng: 26.351 },
    availableSpots: 4,
    totalSpots: 18,
  },
  {
    id: "6",
    name: "Rivne West Parking",
    address: "15 Stepana Bandery St, Rivne",
    coordinates: { lat: 50.7365, lng: 26.3405 },
    availableSpots: 10,
    totalSpots: 40,
  },
];

export const mapStyle = [
  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [{ visibility: "on" }],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#ffffff" }, { weight: 1 }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ visibility: "off" }],
  },
];
