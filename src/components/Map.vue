<template>
  <GoogleMap
    :api-key="GOOGLE_MAPS_API_KEY"
    :center="center || coordinates"
    :zoom="14"
    :styles="mapStyle"
    :map-type-control="false"
    :street-view-control="false"
    :rotate-control="false"
    :keyboard-shortcuts="false"
    ref="mapRef"
    class="w-full h-full relative"
  >
    <CustomMarker v-if="mePinIsVisible" :options="{ position: coordinates }">
      <div class="flex flex-col items-center">
        <div class="text-center text-gray-900 font-medium text-sm sm:text-base">
          Me
        </div>
        <img
          src="/user-pin.svg"
          alt="user-pin"
          class="w-12 h-12 cursor-pointer hover:scale-110 transition-transform mb-20"
        />
      </div>
    </CustomMarker>

    <template v-if="parkings">
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
                :onClick="
                  () =>
                    followMarker(coordinates, parking.coordinates, parking.name)
                "
                size="Small"
                class="w-full"
              />
            </div>
          </transition>
        </div>
      </CustomMarker>

      <div
        v-if="currentRoute"
        class="absolute bottom-0 left-0 w-full h-10 bg-white/90 flex items-center justify-between px-4 shadow-inner text-sm font-medium text-gray-900"
      >
        <div>{{ currentRoute.name }}</div>
        <div class="flex items-center gap-4">
          <div>{{ currentRoute.distance }} / {{ currentRoute.duration }}</div>
          <button
            @click="clearDestination()"
            class="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-gray-900 cursor-pointer text-lg"
            title="Clear route"
          >
            ✕
          </button>
        </div>
      </div>
    </template>
  </GoogleMap>
</template>

<script setup lang="ts">
import { GoogleMap, CustomMarker } from "vue3-google-map";
import BaseButton from "@/components/Base/BaseButton.vue";
import { GOOGLE_MAPS_API_KEY } from "@/config";
import type { Coordinates } from "@/types";
import { useMap } from "@/composables/useMap";
import type { Parking } from "@/types/User";
import { formatDistance, calculateDistance } from "@/utils/calculateDistance";

interface Props {
  center?: Coordinates;
  parkings?: Parking[];
  mePinIsVisible?: boolean;
  coordinates: Coordinates;
}

const {
  mapRef,
  mapStyle,
  currentRoute,
  activeParking,
  followMarker,
  toggleParkingInfo,
  clearDestination,
} = useMap();

withDefaults(defineProps<Props>(), {
  mePinIsVisible: true,
});

defineExpose({
  clearDestination,
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
