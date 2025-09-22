<template>
  <div class="flex flex-col md:flex-row justify-center gap-5 md:gap-20 p-6">
    <div
      class="flex-1 rounded-xl overflow-hidden border border-gray-200 aspect-[3/2]"
    >
      <GoogleMap
        v-if="coordinares"
        :api-key="GOOGLE_MAPS_API_KEY"
        :center="coordinares"
        :zoom="14"
        :styles="mapStyle"
        :map-type-control="false"
        :street-view-control="false"
        :rotate-control="false"
        :keyboard-shortcuts="false"
        class="w-full h-full"
        ref="mapRef"
      >
        <Marker :options="{ position: coordinares }" />

        <CustomMarker
          v-for="parking in parkings"
          :key="parking.id"
          :options="{
            position: parking.coordinates,
            anchorPoint: 'TOP_CENTER',
          }"
        >
          <div class="flex flex-col items-center">
            <div
              class="text-center text-gray-900 font-medium text-sm sm:text-base"
            >
              {{ parking.name }}
            </div>
            <img
              src="/car-pin.svg"
              alt="parking-pin"
              class="w-12 h-12 cursor-pointer hover:scale-110 transition-transform"
            />
          </div>
        </CustomMarker>
      </GoogleMap>
      <div
        v-else
        class="flex items-center justify-center w-full h-full bg-gray-50 text-gray-500 text-center p-4"
      >
        <p>
          Location access is required to use this feature.<br />
          Please enable location permissions in your browser settings.
        </p>
      </div>
    </div>

    <div
      class="flex-1 rounded-2xl p-5 flex flex-col gap-4 max-h-[500px] border border-gray-200 bg-gray-50"
    >
      <h2 class="text-lg font-semibold text-gray-900">Nearby Parkings</h2>

      <Parkings :parkings="parkings" @on-book="handleBook" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { GoogleMap, Marker, CustomMarker } from "vue3-google-map";
import { GOOGLE_MAPS_API_KEY } from "@/config";
import Parkings from "../components/Parkings.vue";
import { parkings } from "../data";
import type { Coordinates } from "../types";

const coordinares = ref<Coordinates | null>(null);
const navigationWatchId = ref<number | null>(null);

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

const getCoordinates = () => {
  if (navigator.geolocation) {
    navigationWatchId.value = navigator.geolocation.watchPosition(
      (pos) => {
        coordinares.value = {
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

const handleBook = (id: string) => {
  console.log(id);
};

onMounted(() => {
  getCoordinates();
});

onBeforeUnmount(() => {
  stopNavigation();
});
</script>
