<template>
  <div class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
    <div class="flex items-center gap-4">
      <img
        :src="user.avatarUrl ?? NoAvatarImage"
        alt="avatar"
        class="w-12 h-12 rounded-full object-cover border border-gray-300"
      />

      <div class="flex flex-col">
        <span
          class="text-base font-semibold text-gray-900 cursor-pointer hover:text-gray-700 transition-colors duration-150"
          @click="navigateToUserDetails"
        >
          {{ user.name }}
        </span>

        <span class="text-sm text-gray-600">
          {{ user.email }}
        </span>
      </div>
    </div>

    <div class="flex flex-col gap-3 mt-4 text-sm">
      <InfoItem :label="$t('common.phone')" :value="user.phoneNumber" />
      <InfoItem
        :label="$t('common.joined')"
        :value="formatDate(user.createdAt)"
      />
      <InfoItem label="ID" :value="user.id" />
    </div>

    <div class="mt-4">
      <h4 class="text-sm font-semibold text-gray-700 mb-1">
        {{ $t("common.roles") }}
      </h4>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="role in user.roles"
          :key="role"
          class="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200"
        >
          {{ role }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NoAvatarImage from "@/assets/images/no-avatar-black.svg";
import type { UserSummary } from "@/types";
import InfoItem from "../list/InfoItem.vue";
import { formatDate } from "@/utils";
import { useRouter } from "vue-router";

interface Props {
  user: UserSummary;
}

const props = defineProps<Props>();
const router = useRouter();

const navigateToUserDetails = () => {
  router.push(`/users/${props.user.id}`);
};
</script>
