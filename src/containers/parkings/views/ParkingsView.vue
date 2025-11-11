<template>
  <div class="flex flex-col md:flex-row justify-center gap-6 p-6">
    <div
      class="flex-1 md:max-w-3xl rounded-2xl p-5 flex flex-col gap-4 max-h-[500px] overflow-auto border border-gray-200 bg-gray-50"
    >
      <div class="flex flex-col gap-3">
        <h2 class="text-lg font-semibold text-gray-900">
          {{ $t("views.parkings.title") }}
        </h2>

        <div
          class="grid gap-3 grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[1fr_auto]"
        >
          <BaseInput
            id="book-name"
            v-model="selectedName"
            :placeholder="$t('forms.fields.parking_name.placeholder')"
            class="w-full"
          />

          <BaseSelect
            :options="filterOptions"
            :placeholder="$t('common.filter_by')"
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
        <p>{{ $t("views.parkings.not_found") }}</p>
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
import { computed, onMounted, ref, useTemplateRef } from "vue";
import type { Parking } from "@/types";
import BookCard from "../components/BookCard.vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import type { BaseSelectOption } from "@/types";
import { storeToRefs } from "pinia";
import Map from "@/components/Map.vue";
import { useMap } from "@/composables/useMap";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user";

const { coordinates } = useMap();
const { t } = useI18n();

const userStore = useUserStore();

const { setUserBookings } = userStore;
const { user } = storeToRefs(userStore);

const filterOptions: BaseSelectOption[] = [
  { label: t("selects.all"), value: "all" },
  { label: t("selects.finished"), value: "finished" },
  { label: t("selects.active"), value: "active" },
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
      booking.parkingObj?.name
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

onMounted(() => {
  setUserBookings();
});

useHead({
  title: t("seo.parkings.head.title"),
  titleTemplate: `%s | ${t("seo.parkings.head.titleTemplate")}`,
  meta: [
    {
      name: "description",
      content: t("seo.parkings.head.description"),
    },
    {
      name: "keywords",
      content: t("seo.parkings.head.keywords"),
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: t("seo.parkings.head.ogTitle"),
    },
    {
      property: "og:description",
      content: t("seo.parkings.head.ogDescription"),
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
