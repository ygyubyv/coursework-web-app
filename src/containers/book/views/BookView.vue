<template>
  <div class="flex flex-col md:flex-row justify-center gap-5 md:gap-20 p-6">
    <AddCarModal v-if="addCarModalIsVisible" v-model="addCarModalIsVisible" />

    <BookModal
      v-if="bookModalIsVisible"
      :parking="bookedParking!"
      :user="user!"
      @on-add-car="addCarModalIsVisible = true"
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
        <p class="max-w-md mx-auto">{{ $t("map.location_access") }}</p>
      </div>
    </div>

    <div
      class="flex-1 rounded-2xl p-5 flex flex-col gap-4 max-h-[500px] border border-gray-200 bg-gray-50"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">
          {{ $t("parkings.nearby_parkings") }}
        </h2>

        <div class="w-[160px] md:w-[200px]">
          <BaseSelect
            :options="sortOptions"
            :placeholder="$t('selects.labels.sort_by')"
            v-model="selectedOption"
          />
        </div>
      </div>

      <Parkings
        v-if="parkings && parkings.length"
        :parkings="filteredParkings"
        :coordinates="coordinates"
        @on-book="handleBook"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Map from "@/components/Map.vue";
import { ref, computed, onMounted } from "vue";
import Parkings from "../components/Parkings.vue";
import type { BookForm, BaseSelectOption, Parking } from "@/types";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import { calculateDistance, showNotification } from "@/utils";
import BookModal from "../components/BookModal.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useMap } from "@/composables/useMap";
import { useI18n } from "vue-i18n";
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";
import { useUserStore } from "@/stores/user";
import { useParkingsStore } from "@/stores/parkings";
import { createBooking } from "@/services/bookings";
import AddCarModal from "@/components/Modals/BookCar/ui/AddCarModal.vue";

const authStore = useAuthStore();
const userStore = useUserStore();
const parkingsStore = useParkingsStore();

const { t } = useI18n();
const { coordinates } = useMap();

const { authModalIsVisible, isAuthenticated } = storeToRefs(authStore);

const { setUserCars } = userStore;
const { user } = storeToRefs(userStore);

const { setParkings } = parkingsStore;
const { parkings } = storeToRefs(parkingsStore);

const sortOptions: BaseSelectOption[] = [
  { label: t("selects.distance"), value: "distance" },
  { label: t("selects.available_spots"), value: "spots" },
];

const selectedOption = ref<BaseSelectOption>(sortOptions[0]);
const addCarModalIsVisible = ref(false);
const bookModalIsVisible = ref(false);
const bookedParking = ref<Parking | null>(null);

const filteredParkings = computed(() => {
  if (!coordinates.value) {
    return parkings.value;
  }

  switch (selectedOption.value.value) {
    case "distance":
      return parkings.value
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
      return parkings.value
        .slice()
        .sort((a, b) => b.availableSpots - a.availableSpots);

    default:
      return parkings.value;
  }
});

const handleBook = async (id: string) => {
  if (!isAuthenticated.value || !user.value) {
    authModalIsVisible.value = true;
    return;
  }

  await setUserCars();

  const targetParking = parkings.value.find((parking) => parking.id === id)!;
  bookedParking.value = targetParking;
  bookModalIsVisible.value = true;
};

const handleSubmit = async (form: BookForm) => {
  try {
    const status = await createBooking(form);

    if (status !== 201) {
      throw new Error("Failed create car");
    }

    showNotification(
      "success",
      t("toasts.success.created", {
        entity: t("common.booking"),
      })
    );
  } catch (error) {
    showNotification(
      "error",
      t("toasts.error.failed_action", {
        action: t("actions.create"),
        entity: t("common.booking"),
      })
    );
    console.error(error);
  }
};

onMounted(() => {
  setParkings();
});

useHead({
  title: t("seo.book.head.title"),
  titleTemplate: `%s | ${t("seo.book.head.titleTemplate")}`,
  meta: [
    {
      name: "description",
      content: t("seo.book.head.description", {
        appName: t("common.project_name"),
      }),
    },
    {
      name: "keywords",
      content: t("seo.book.head.keywords"),
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: t("seo.book.head.ogTitle", {
        appName: t("common.project_name"),
      }),
    },
    {
      property: "og:description",
      content: t("seo.book.head.ogDescription", {
        appName: t("common.project_name"),
      }),
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${APP_URL}/book`,
    },
  ],
});
</script>
