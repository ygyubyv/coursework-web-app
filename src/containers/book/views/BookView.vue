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
      <Map
        v-if="coordinates"
        :coordinates="coordinates"
        :parkings="filteredParkings"
      />

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
import Map from "@/components/Map.vue";
import { ref, computed } from "vue";
import Parkings from "../components/Parkings.vue";
import type { BookForm, Option } from "../types";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import { calculateDistance } from "@/utils/calculateDistance";
import BookModal from "../components/BookModal.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import type { Parking } from "@/types/User";
import { parkings } from "@/constants";
import { useMap } from "@/composables/useMap";

const userStore = storeToRefs(useAuthStore());

const { coordinates } = useMap();
const { user, authModalIsVisible, isAuthenticated } = userStore;

const sortOptions: Option[] = [
  { label: "Distance", value: "distance" },
  { label: "Available spots", value: "spots" },
];

const selectedOption = ref<Option>(sortOptions[0]);
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

const handleBook = (id: string) => {
  if (!isAuthenticated.value || !user.value) {
    authModalIsVisible.value = true;
    return;
  }

  const targetParking = parkings.find((parking) => parking.id === id)!;
  bookedParking.value = targetParking;
  bookModalIsVisible.value = true;
};

const handleSubmit = (form: BookForm) => {
  console.log(form);
};
</script>
