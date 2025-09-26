<template>
  <div>Empty for now</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";

const { t } = useI18n();

useHead({
  title: t("seo.help.head.title"),
  titleTemplate: `%s | ${t("seo.help.head.titleTemplate")}`,
  meta: [
    {
      name: "description",
      content: t("seo.help.head.description"),
    },
    {
      name: "keywords",
      content: t("seo.help.head.keywords"),
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: t("seo.help.head.ogTitle"),
    },
    {
      property: "og:description",
      content: t("seo.help.head.ogDescription"),
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${APP_URL}/help`,
    },
  ],
});
</script>
