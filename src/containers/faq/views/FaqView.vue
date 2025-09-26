<template>Empty for now</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";

const { t } = useI18n();

useHead({
  title: t("seo.faq.head.title"),
  titleTemplate: `%s | ${t("seo.faq.head.titleTemplate")}`,
  meta: [
    {
      name: "description",
      content: t("seo.faq.head.description"),
    },
    {
      name: "keywords",
      content: t("seo.faq.head.keywords"),
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: t("seo.faq.head.ogTitle"),
    },
    {
      property: "og:description",
      content: t("seo.faq.head.ogDescription"),
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${APP_URL}/faq`,
    },
  ],
});
</script>
