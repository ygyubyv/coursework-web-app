<template>
  <div class="w-full max-w-4xl mx-auto my-10 space-y-6 px-4">
    <div class="flex gap-2 items-center">
      <BaseInput
        v-model="searchQuery"
        id="search-users"
        type="text"
        size="Medium"
        :placeholder="$t('forms.admin.fields.search_users.placeholder')"
      />
    </div>

    <div
      v-if="!isLoading && users.length === 0"
      class="text-gray-500 text-center py-8"
    >
      {{ $t("common.not_found", { entity: $t("common.users") }) }}
    </div>

    <div v-if="isLoading" class="text-center py-10">
      <BaseSpinner mode="Black-spinner" />
    </div>

    <div v-if="!isLoading && users.length" class="space-y-4">
      <UserCard v-for="user in users" :key="user.id" :user="user" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from "@/components/Base/BaseInput.vue";
import BaseSpinner from "@/components/Base/BaseSpinner.vue";
import UserCard from "../components/list/UserCard.vue";
import { useI18n } from "vue-i18n";
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";
import { useUsersList } from "../composables/details/useUsersList";

const { t } = useI18n();
const { users, searchQuery, isLoading } = useUsersList();

useHead({
  title: t("seo.users.head.title"),
  titleTemplate: `%s | ${t("seo.users.head.titleTemplate")}`,
  meta: [
    {
      name: "description",
      content: t("seo.users.head.description"),
    },
    {
      name: "keywords",
      content: t("seo.users.head.keywords"),
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: t("seo.users.head.ogTitle", {
        appName: t("common.project_name"),
      }),
    },
    {
      property: "og:description",
      content: t("seo.users.head.ogDescription"),
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${APP_URL}/users`,
    },
  ],
});
</script>
