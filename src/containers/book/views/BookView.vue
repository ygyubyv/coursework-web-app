<template>
  <div class="flex flex-col md:flex-row justify-center gap-5 md:gap-20 p-6">
    <BookModal
      v-if="bookModalIsVisible"
      :parking="bookedParking!"
      :user="user!"
      @on-close="bookModalIsVisible = false"
      @on-submit="handleSubmit"
    />

    <div
      class="flex-1 rounded-xl overflow-hidden border border-gray-200 aspect-[3/2]"
    >
      <GoogleMap
        v-if="coordinates"
        :api-key="GOOGLE_MAPS_API_KEY"
        :center="coordinates"
        :zoom="14"
        :styles="mapStyle"
        :map-type-control="false"
        :street-view-control="false"
        :rotate-control="false"
        :keyboard-shortcuts="false"
        class="w-full h-full relative"
        ref="mapRef"
      >
        <CustomMarker :options="{ position: coordinates }">
          <div class="flex flex-col items-center">
            <div
              class="text-center text-gray-900 font-medium text-sm sm:text-base"
            >
              Me
            </div>
            <img
              src="/user-pin.svg"
              alt="user-pin"
              class="w-12 h-12 cursor-pointer hover:scale-110 transition-transform mb-20"
            />
          </div>
        </CustomMarker>

        <CustomMarker
          v-for="parking in parkings"
          :key="parking.id"
          :options="{
            position: parking.coordinates,
            anchorPoint: 'TOP_CENTER',
          }"
        >
          <div
            class="flex flex-col items-center cursor-pointer"
            @click="toggleParkingInfo(parking.id)"
          >
            <div
              class="text-center text-gray-900 font-medium text-sm sm:text-base"
            >
              {{ parking.name }}
            </div>
            <img
              src="/car-pin.svg"
              alt="parking-pin"
              class="w-12 h-12 hover:scale-110 transition-transform"
            />

            <transition name="fade">
              <div
                v-if="activeParking === parking.id"
                class="absolute top-full mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-xl p-3 text-sm text-gray-800 z-50"
                style="left: 50%; transform: translateX(-50%)"
              >
                <div class="font-semibold text-gray-900 mb-1">
                  {{ parking.name }}
                </div>
                <div class="mb-1">
                  Distance:
                  <span class="font-medium">
                    {{
                      formatDistance(
                        calculateDistance(
                          coordinates.lat,
                          coordinates.lng,
                          parking.coordinates.lat,
                          parking.coordinates.lng
                        )
                      )
                    }}
                  </span>
                </div>
                <div class="mb-2">
                  Available spots:
                  <span class="font-medium">{{ parking.availableSpots }}</span>
                </div>
                <BaseButton
                  mode="Primary"
                  text="Follow"
                  :onClick="() => followMarker(parking.id)"
                  size="Small"
                  class="w-full"
                />
              </div>
            </transition>
          </div>
        </CustomMarker>

        <div
          v-if="currentRoute"
          class="absolute bottom-0 left-0 w-full h-10 bg-white/90 flex items-center flr justify-between px-4 shadow-inner text-sm font-medium text-gray-900"
        >
          <div>{{ currentRoute.name }}</div>
          <div>{{ currentRoute.distance }} / {{ currentRoute.duration }}</div>
        </div>
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
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Nearby Parkings</h2>

        <div class="w-[160px] md:w-[200px]">
          <BaseSelect
            :options="sortOptions"
            placeholder="Sort by"
            v-model="selectedOption"
          />
        </div>
      </div>

      <Parkings
        :parkings="filteredParkings"
        :coordinates="coordinates"
        @on-book="handleBook"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, useTemplateRef } from "vue";
import { GoogleMap, CustomMarker } from "vue3-google-map";
import { GOOGLE_MAPS_API_KEY } from "@/config";
import Parkings from "../components/Parkings.vue";
import { parkings, mapStyle } from "../data";
import type {
  BookForm,
  Coordinates,
  Destination,
  Option,
  Parking,
} from "../types";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import { calculateDistance, formatDistance } from "@/utils/calculateDistance";
import BaseButton from "@/components/Base/BaseButton.vue";
import BookModal from "../components/BookModal.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

declare global {
  interface Window {
    google: any;
  }
}

const sortOptions: Option[] = [
  { label: "Distance", value: "distance" },
  { label: "Available spots", value: "spots" },
];

const mapRef = useTemplateRef("mapRef");

const userStore = storeToRefs(useAuthStore());

const { user, authModalIsVisible, isAuthenticated } = userStore;

const coordinates = ref<Coordinates | null>(null);
const navigationWatchId = ref<number | null>(null);
const selectedOption = ref<Option>(sortOptions[0]);
const activeParking = ref<string | null>(null);
const directionsRenderer = ref(null);
const currentRoute = ref<Destination | null>(null);
const bookModalIsVisible = ref(false);
const bookedParking = ref<Parking | null>(null);

const filteredParkings = computed(() => {
  if (!coordinates.value) {
    return parkings;
  }

  switch (selectedOption.value.value) {
    case "distance":
      return parkings
        .slice()
        .sort(
          (a, b) =>
            calculateDistance(
              coordinates.value!.lat,
              coordinates.value!.lng,
              a.coordinates.lat,
              a.coordinates.lng
            ) -
            calculateDistance(
              coordinates.value!.lat,
              coordinates.value!.lng,
              b.coordinates.lat,
              b.coordinates.lng
            )
        );

    case "spots":
      return parkings
        .slice()
        .sort((a, b) => b.availableSpots - a.availableSpots);

    default:
      return parkings;
  }
});

const handleSubmit = (form: BookForm) => {
  console.log(form);
};

const handleBook = (id: string) => {
  if (!isAuthenticated.value || !user.value) {
    authModalIsVisible.value = true;
    return;
  }

  const targetParking = parkings.find((parking) => parking.id === id)!;
  bookedParking.value = targetParking;
  bookModalIsVisible.value = true;
};

const toggleParkingInfo = (id: string) => {
  activeParking.value = activeParking.value === id ? null : id;
};

const followMarker = (id: string) => {
  try {
    const targetParking = filteredParkings.value.find(
      (parking) => parking.id === id
    );

    const request = {
      origin: coordinates.value,
      destination: targetParking!.coordinates,
      travelMode: "DRIVING",
    };

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(request, (response: any, status: any) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        if (!directionsRenderer.value) {
          directionsRenderer.value = new window.google.maps.DirectionsRenderer({
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
          name: targetParking!.name,
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
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
