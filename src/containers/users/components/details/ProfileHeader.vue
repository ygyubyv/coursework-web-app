<template>
  <div class="flex items-center gap-6">
    <img
      :src="user.avatarUrl ?? DEFAULT_AVATAR"
      class="w-28 h-28 rounded-xl object-cover bg-gray-100 shadow-sm"
    />

    <div class="flex flex-col gap-1">
      <p class="text-2xl font-semibold text-gray-900">{{ user.name }}</p>
      <p class="text-gray-600 text-base">{{ user.email }}</p>
      <p class="text-gray-600 text-base">{{ user.phoneNumber || "—" }}</p>

      <p class="text-sm text-gray-500 mt-1">
        Joined: {{ formatDate(user.createdAt) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@/types";
import { formatDate } from "@/utils";
import { DEFAULT_AVATAR } from "@/constants";

interface Props {
  user: User;
}

defineProps<Props>();
</script>
