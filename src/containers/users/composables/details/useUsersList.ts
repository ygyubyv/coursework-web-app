import type { UserSummary } from "@/types";
import { useQuery } from "@tanstack/vue-query";
import { ref, computed } from "vue";
import { getUsers } from "@/services/user";

export const useUsersList = () => {
  const searchQuery = ref("");

  const users = computed((): UserSummary[] => {
    if (!data.value) {
      return [];
    }

    if (searchQuery.value.trim()) {
      return data.value.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
      );
    }

    return data.value;
  });

  const { data, isPending: isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    users,
    searchQuery,
    isLoading,
  };
};
