<template>
  <div class="flex flex-col lg:flex-row gap-5 md:gap-12 p-6">
    <!-- Add Car Modal -->
    <CreateCar
      v-model:modal-is-visible="createCarModalIsVisible"
      @submit="handleCreateUserCar"
    />

    <!-- Book Modal -->
    <BookModal
      v-if="bookModalIsVisible"
      :parking="selectedParking!"
      :user="user!"
      @on-add-car="createCarModalIsVisible = true"
      @on-close="bookModalIsVisible = false"
      @on-submit="handleSubmit"
    />

    <!-- Map -->
    <div
      class="rounded-xl overflow-hidden border border-gray-200 h-[400px] sm:h-[500px] lg:h-auto lg:flex-1"
      data-cy="book-map"
    >
      <Map
        v-if="coordinates"
        :coordinates="coordinates"
        :parkings="parkings"
        class="w-full h-full"
      />

      <div
        v-else
        class="flex items-center justify-center w-full h-full bg-gray-50 text-gray-500"
      >
        {{ $t("map.location_access") }}
      </div>
    </div>

    <!-- Parking List -->
    <div
      class="flex-1 rounded-2xl p-5 flex flex-col border border-gray-200 bg-gray-50 max-h-[600px] min-h-[600px]"
    >
      <!-- Header -->
      <div
        class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 mb-4"
      >
        <h2 class="text-lg font-semibold text-gray-900">
          {{ $t("parkings.nearby_parkings") }}
        </h2>

        <div class="flex flex-col sm:flex-row gap-2.5 w-full xl:w-auto">
          <!-- Sort select -->
          <BaseSelect
            :options="sortOptions"
            :placeholder="$t('selects.labels.sort_by')"
            class="sm:w-[200px] w-full"
            data-cy="parking-sort"
          />

          <!-- Pagination select -->
          <BaseSelect
            class="sm:w-40 w-full"
            :placeholder="$t('selects.labels.per_page')"
            :options="perPageOptions"
            @update:model-value="((option: BaseSelectOption<number>) => perPage = option.value)"
          />
        </div>
      </div>

      <!-- Parkings -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <div
          v-if="parkings && parkings.length && !isLoading"
          class="overflow-auto"
        >
          <Parkings
            :parkings="parkings"
            :coordinates="coordinates"
            @on-book="handleBook"
          />
        </div>

        <div
          v-else-if="isLoading"
          class="flex-1 flex items-center justify-center"
        >
          <BaseSpinner mode="Black-spinner" />
        </div>

        <div
          v-else
          class="flex-1 flex items-center justify-center text-gray-500"
        >
          {{ $t("parkings.no_results") }}
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-4">
        <Pagination
          :has-next="hasNext"
          :has-prev="hasPrev"
          :total-pages="totalPages"
          v-model="currentPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Map from "@/components/Map.vue";
import Parkings from "../components/Parkings.vue";
import type { BaseSelectOption } from "@/types";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import BookModal from "../components/BookModal.vue";
import { storeToRefs } from "pinia";
import { useMap } from "@/composables/useMap";
import { useI18n } from "vue-i18n";
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";
import { useUserStore } from "@/stores/user";
import CreateCar from "@/components/Modals/Cars/CreateCar.vue";
import { useParkingsList } from "../composables/useParkingsList";
import Pagination from "@/components/Pagination/Pagination.vue";
import BaseSpinner from "@/components/Base/BaseSpinner.vue";
import { useCreateUserCar } from "../composables/useCreateUserCar";
import { useBookActions } from "../composables/useBookActions";

const userStore = useUserStore();

const { t } = useI18n();

const { coordinates } = useMap();

const {
  parkings,
  totalPages,
  perPage,
  isLoading,
  currentPage,
  hasNext,
  hasPrev,
  perPageOptions,
  sortOptions,
} = useParkingsList();

const { createCarModalIsVisible, handleCreateUserCar } = useCreateUserCar();

const { selectedParking, bookModalIsVisible, handleBook, handleSubmit } =
  useBookActions(parkings);

const { user } = storeToRefs(userStore);

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
