<template>Empty for now</template>

<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead({
  title: t("seo.about.head.title"),
  titleTemplate: `%s | ${t("seo.about.head.titleTemplate")}`,
  meta: [
    {
      name: "description",
      content: t("seo.about.head.description"),
    },
    {
      name: "keywords",
      content: t("seo.about.head.keywords"),
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: t("seo.about.head.ogTitle"),
    },
    {
      property: "og:description",
      content: t("seo.about.head.ogDescription"),
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${APP_URL}/about`,
    },
  ],
});
</script>
