import type { Coordinates } from "@/types";
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";

interface Destination {
  distance: string;
  duration: string;
  name: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export const useMap = () => {
  const mapRef = useTemplateRef("mapRef");

  const coordinates = ref<Coordinates | null>(null);
  const navigationWatchId = ref<number | null>(null);
  const directionsRenderer = ref(null);
  const currentRoute = ref<Destination | null>(null);
  const activeParking = ref<string | null>(null);

  const toggleParkingInfo = (id: string) => {
    activeParking.value = activeParking.value === id ? null : id;
  };

  const clearDestination = () => {
    if (directionsRenderer.value) {
      // @ts-ignore
      directionsRenderer.value.setDirections({ routes: [] });
    }

    currentRoute.value = null;
  };

  const followMarker = (
    startCoordinates: Coordinates,
    targetCoordinates: Coordinates,
    targetLabel: string
  ) => {
    try {
      const request = {
        origin: startCoordinates,
        destination: targetCoordinates,
        travelMode: "DRIVING",
      };

      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(request, (response: any, status: any) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          if (!directionsRenderer.value) {
            directionsRenderer.value =
              new window.google.maps.DirectionsRenderer({
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "#1d4ed8",
                  strokeWeight: 3,
                },
              });
            // @ts-ignore
            directionsRenderer.value.setMap(mapRef.value.map);
          }
          // @ts-ignore
          directionsRenderer.value.setDirections(response);

          const leg = response.routes[0].legs[0];
          currentRoute.value = {
            name: targetLabel,
            distance: leg.distance.text,
            duration: leg.duration.text,
          };
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getCoordinates = () => {
    if (navigator.geolocation) {
      navigationWatchId.value = navigator.geolocation.watchPosition(
        (pos) => {
          coordinates.value = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
        },
        (err) => console.error(err),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
    }
  };

  const stopNavigation = () => {
    if (navigationWatchId.value !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(navigationWatchId.value);
    }
  };

  onMounted(() => {
    getCoordinates();
  });

  onBeforeUnmount(() => {
    stopNavigation();
  });

  const mapStyle = [
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

  return {
    mapRef,
    mapStyle,
    coordinates,
    currentRoute,
    activeParking,
    directionsRenderer,
    toggleParkingInfo,
    followMarker,
    clearDestination,
  };
};
