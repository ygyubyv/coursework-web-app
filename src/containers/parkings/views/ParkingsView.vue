<template>
  <div class="flex flex-col md:flex-row justify-center gap-6 p-6">
    <div
      class="flex-1 md:max-w-3xl rounded-2xl p-5 flex flex-col gap-4 max-h-[500px] overflow-auto border border-gray-200 bg-gray-50"
    >
      <div class="flex flex-col gap-3">
        <h2 class="text-lg font-semibold text-gray-900">My Bookings</h2>

        <div
          class="grid gap-3 grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[1fr_auto]"
        >
          <BaseInput
            id="book-name"
            v-model="selectedName"
            placeholder="Filter by name"
            class="w-full"
          />

          <BaseSelect
            :options="filterOptions"
            placeholder="Filter By"
            v-model="selectedOption"
            class="w-full md:w-40"
          />
        </div>
      </div>

      <template v-if="filteredBookings.length">
        <BookCard
          v-for="booking in filteredBookings"
          :key="booking.id"
          :booking="booking"
          @show-parking-on-map="showParkingOnMap"
        />
      </template>

      <div v-else>
        <p>No bookings found</p>
      </div>
    </div>

    <div
      class="flex-1 md:max-w-lg rounded-xl overflow-hidden border border-gray-200 aspect-[3/2]"
      v-if="mapIsVisible"
    >
      <Map
        v-if="coordinates && currentParking"
        ref="mapComponent"
        :coordinates="coordinates"
        :center="currentParking.coordinates"
        :parkings="[currentParking]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";
import { computed, ref, useTemplateRef } from "vue";
import type { Parking } from "@/types/User";
import BookCard from "../components/BookCard.vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import type { BaseSelectOption } from "@/types";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import Map from "@/components/Map.vue";
import { useMap } from "@/composables/useMap";

const { coordinates } = useMap();

const { user } = storeToRefs(useAuthStore());

const filterOptions: BaseSelectOption[] = [
  { label: "All", value: "all" },
  { label: "Finished", value: "finished" },
  { label: "Active", value: "active" },
];

const mapComponent = useTemplateRef("mapComponent");
const mapIsVisible = ref(false);
const selectedName = ref("");
const selectedOption = ref<BaseSelectOption>(filterOptions[0]);

const currentParking = ref<Parking | null>(null);

const filteredBookings = computed(() => {
  if (!user.value?.bookings || !user.value.bookings.length) {
    return [];
  }

  let bookings = user.value!.bookings.slice();

  if (selectedName.value) {
    bookings = bookings.filter((booking) =>
      booking.parking.name
        .toUpperCase()
        .includes(selectedName.value.toUpperCase())
    );
  }

  switch (selectedOption.value.value) {
    case "all":
      bookings = bookings;
      break;

    case "finished":
      bookings = bookings.filter((booking) => booking.status === "completed");
      break;

    case "active":
      bookings = bookings.filter((booking) => booking.status === "active");
      break;
  }

  return bookings;
});

const showParkingOnMap = (parking: Parking) => {
  mapComponent.value?.clearDestination();
  currentParking.value = parking;
  mapIsVisible.value = true;
};

useHead({
  title: "Virodip",
  titleTemplate: "%s | Parkings",
  meta: [
    {
      name: "description",
      content:
        "Explore available parking spots with Virodip. Find, reserve, and navigate to parking spaces in real-time for a seamless parking experience.",
    },
    {
      name: "keywords",
      content:
        "smart parking, parkings, parking spots, reserve parking, parking app, real-time parking, mobile parking",
    },
    {
      property: "og:title",
      content: "Parkings — Virodip Smart Parking Service",
    },
    {
      property: "og:description",
      content:
        "Explore available parking spots with Virodip. Find, reserve, and navigate to parking spaces in real-time for a seamless parking experience.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${APP_URL}/parkings`,
    },
  ],
});
</script>
