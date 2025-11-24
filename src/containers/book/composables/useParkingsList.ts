import { getParkings } from "@/services/parkings";
import type { BaseSelectOption, Parking } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { useRouteQuery } from "@vueuse/router";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export const useParkingsList = () => {
  const { t } = useI18n();
  const currentPage = useRouteQuery("page", "1", { transform: Number });
  const perPage = useRouteQuery("perPage", "5", { transform: Number });
  const totalPages = ref(0);

  const sortOptions = computed((): BaseSelectOption<string>[] => {
    return [
      { label: t("selects.distance"), value: "distance" },
      { label: t("selects.available_spots"), value: "spots" },
    ];
  });

  const perPageOptions: BaseSelectOption<number>[] = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "100", value: 100 },
  ];

  const hasPrev = computed(() => {
    return data.value?.hasPrev ?? false;
  });

  const hasNext = computed(() => {
    return data.value?.hasNext ?? false;
  });

  const parkings = computed((): Parking[] => {
    return data.value?.parkings ?? [];
  });

  const { data, isPending: isLoading } = useQuery({
    queryKey: ["parkings", currentPage, perPage],
    queryFn: () =>
      getParkings({
        page: currentPage.value,
        per_page: perPage.value,
      }),

    placeholderData: keepPreviousData,
  });

  watch(
    data,
    (newData) => {
      if (newData) {
        totalPages.value = newData.pages;
      }
    },
    { immediate: true }
  );

  return {
    currentPage,
    perPage,
    totalPages,
    hasPrev,
    hasNext,
    parkings,
    isLoading,
    perPageOptions,
    sortOptions,
  };
};
