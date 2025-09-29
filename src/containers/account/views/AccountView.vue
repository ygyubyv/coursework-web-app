<template>
  <section class="py-10">
    <div class="max-w-7xl mx-auto px-6">
      <div
        class="flex flex-col md:flex-row rounded-xl shadow-sm bg-white overflow-hidden min-h-[80vh]"
      >
        <aside
          class="w-full md:w-58 lg:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200 p-4 bg-gray-50"
        >
          <nav
            class="flex md:flex-col space-x-4 md:space-x-0 md:space-y-1 overflow-x-auto"
          >
            <RouterLink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              class="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-black hover:bg-gray-100 whitespace-nowrap"
              active-class="bg-gray-200 text-black"
            >
              <font-awesome-icon :icon="link.icon" />
              {{ link.text }}
            </RouterLink>
          </nav>
        </aside>

        <main class="flex-1 p-6">
          <RouterView />
        </main>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { APP_URL } from "@/config";
import { useHead } from "@unhead/vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const links = computed(() => {
  return [
    {
      to: "/account/profile",
      text: t("routes.account.profile"),
      icon: ["fas", "user"],
    },
    {
      to: "/account/payments",
      text: t("routes.account.payments"),
      icon: ["fas", "credit-card"],
    },
    {
      to: "/account/stats",
      text: t("routes.account.statistics"),
      icon: ["fas", "chart-line"],
    },
    {
      to: "/account/settings",
      text: t("routes.account.settings"),
      icon: ["fas", "cog"],
    },
    {
      to: "/account/security",
      text: t("routes.account.security"),
      icon: ["fas", "shield-alt"],
    },
  ];
});

useHead({
  title: t("seo.account.head.title"),
  titleTemplate: `%s | ${t("seo.account.head.titleTemplate")}`,
  meta: [
    {
      name: "description",
      content: t("seo.account.head.description", {
        appName: t("common.project_name"),
      }),
    },
    {
      name: "keywords",
      content: t("seo.account.head.keywords", {
        appName: t("common.project_name"),
      }),
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: t("seo.account.head.ogTitle", {
        appName: t("common.project_name"),
      }),
    },
    {
      property: "og:description",
      content: t("seo.account.head.ogDescription", {
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
      href: `${APP_URL}/account`,
    },
  ],
});
</script>

<style scoped>
aside nav::-webkit-scrollbar {
  height: 3px;
}
aside nav::-webkit-scrollbar-thumb {
  background: #000;
}
</style>
