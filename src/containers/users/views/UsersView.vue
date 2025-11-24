<template>
  <div class="w-full max-w-4xl mx-auto my-10 space-y-6 px-4">
    <div class="flex flex-col sm:flex-row sm:items-center gap-3">
      <BaseInput
        v-model="searchQuery"
        id="search-users"
        type="text"
        size="Medium"
        class="w-full"
        :placeholder="$t('forms.admin.fields.search_users.placeholder')"
      />

      <BaseSelect
        class="w-full sm:w-70"
        :placeholder="$t('selects.labels.role')"
        @update:model-value="((option: BaseSelectOption<Role>) => role = option.value)"
        :options="roleOptions"
      />

      <BaseSelect
        class="w-full sm:w-70"
        :placeholder="$t('selects.labels.per_page')"
        :options="perPageOptions"
        @update:model-value="((option: BaseSelectOption<number>) => perPage = option.value)"
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

    <Pagination
      :has-next="hasNext"
      :has-prev="hasPrev"
      :total-pages="totalPages"
      v-model="currentPage"
    />
  </div>
</template>

<script setup lang="ts">
import BaseInput from "@/components/Base/BaseInput.vue";
import BaseSpinner from "@/components/Base/BaseSpinner.vue";
import UserCard from "../components/list/UserCard.vue";
import BaseSelect from "@/components/Base/BaseSelect.vue";
import { useI18n } from "vue-i18n";
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";
import { useUsersList } from "../composables/list/useUsersList";
import Pagination from "@/components/Pagination/Pagination.vue";
import { type BaseSelectOption, type Role } from "@/types";
import { computed } from "vue";

const { t } = useI18n();
const {
  users,
  currentPage,
  perPage,
  totalPages,
  role,
  hasNext,
  hasPrev,
  searchQuery,
  isLoading,
} = useUsersList();

const perPageOptions: BaseSelectOption<number>[] = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];

const roleOptions = computed(() => {
  return [
    { label: t("selects.roles.admin"), value: "admin" },
    { label: t("selects.roles.user"), value: "user" },
    { label: t("selects.roles.guardian"), value: "guardian" },
    { label: t("selects.roles.owner"), value: "owner" },
  ];
});

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
