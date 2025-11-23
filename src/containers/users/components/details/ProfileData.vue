<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
    <div>
      <p class="text-sm text-gray-500 font-medium mb-1">User ID</p>
      <p class="font-semibold break-all">{{ user.id }}</p>
    </div>

    <div>
      <p class="text-sm text-gray-500 font-medium mb-1">Email</p>
      <p class="font-semibold">{{ user.email }}</p>
    </div>

    <div>
      <p class="text-sm text-gray-500 font-medium mb-1">Phone Number</p>
      <p class="font-semibold">{{ user.phoneNumber || "—" }}</p>
    </div>

    <div>
      <p class="text-sm text-gray-500 font-medium mb-1">Created At</p>
      <p class="font-semibold">{{ formatDate(user.createdAt) }}</p>
    </div>

    <div class="col-span-full">
      <p class="text-sm text-gray-500 font-medium mb-2">Roles</p>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="role in user.roles"
          :key="role"
          class="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 border border-gray-200 text-gray-800"
        >
          {{ role }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@/types";
import { formatDate } from "@/utils";

interface Props {
  user: User;
}

defineProps<Props>();
</script>
