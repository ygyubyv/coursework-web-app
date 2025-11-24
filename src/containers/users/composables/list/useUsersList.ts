import type { Role, UserSummary } from "@/types";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import { ref, computed, watch } from "vue";
import { getUsers } from "@/services/user";
import { useRouteQuery } from "@vueuse/router";
import { watchDebounced } from "@vueuse/core";

export const useUsersList = () => {
  const currentPage = useRouteQuery("page", "1", { transform: Number });
  const perPage = useRouteQuery("perPage", "5", { transform: Number });
  const searchQuery = useRouteQuery("name", "", { transform: String });
  const role = useRouteQuery<Role>("role", "user");
  const totalPages = ref(0);

  const debouncedQuery = ref("");

  const hasPrev = computed(() => {
    return data.value?.hasPrev ?? false;
  });

  const hasNext = computed(() => {
    return data.value?.hasNext ?? false;
  });

  const users = computed((): UserSummary[] => {
    return data.value?.users ?? [];
  });

  const { data, isPending: isLoading } = useQuery({
    queryKey: ["users", currentPage, debouncedQuery, perPage, role],
    queryFn: () =>
      getUsers({
        page: currentPage.value,
        name: debouncedQuery.value.trim(),
        per_page: perPage.value,
        role: role.value as Role,
      }),

    placeholderData: keepPreviousData,
  });

  watchDebounced(
    searchQuery,
    (newValue) => {
      debouncedQuery.value = newValue;
      currentPage.value = 1;
    },
    { debounce: 500 }
  );

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
    searchQuery,
    role,
    totalPages,
    hasPrev,
    hasNext,
    users,
    isLoading,
  };
};
