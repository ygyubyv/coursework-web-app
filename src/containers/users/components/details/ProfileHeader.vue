<template>
  <div class="flex items-start gap-6 justify-between w-full">
    <div class="flex items-center gap-6">
      <!-- Avatar -->
      <img
        :src="user.avatarUrl ?? NoAvatarImage"
        class="w-28 h-28 rounded-xl object-cover bg-gray-100 shadow-sm"
      />

      <div class="flex flex-col gap-1">
        <!-- Name -->
        <p class="text-2xl font-semibold text-gray-900">{{ user.name }}</p>

        <!-- Email -->
        <p class="text-gray-600 text-base">{{ user.email }}</p>

        <!-- Phone Number -->
        <p class="text-gray-600 text-base">{{ user.phoneNumber || "—" }}</p>

        <!-- Joined -->
        <p class="text-sm text-gray-500 mt-1">
          Joined: {{ formatDate(user.createdAt) }}
        </p>
      </div>
    </div>

    <!-- Update User -->
    <button
      @click="emit('onUpdate')"
      class="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-black hover:bg-gray-100 transition text-black"
    >
      <font-awesome-icon :icon="['fas', 'pen-to-square']" />
      <span>Edit</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@/types";
import { formatDate } from "@/utils";
import NoAvatarImage from "@/assets/images/no-avatar-black.svg";

interface Props {
  user: User;
}

interface Emits {
  (e: "onUpdate"): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
