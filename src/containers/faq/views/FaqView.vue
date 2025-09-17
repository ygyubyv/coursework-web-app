<template>Empty for now</template>

<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";

useHead({
  title: "Virodip",
  titleTemplate: "%s | FAQ",
  meta: [
    {
      name: "description",
      content:
        "Find answers to frequently asked questions about Virodip, the smart parking service that helps you locate and reserve parking spots in real-time.",
    },
    {
      name: "keywords",
      content:
        "smart parking, FAQ, frequently asked questions, parking app, parking service, real-time parking, mobile parking",
    },
    {
      property: "og:title",
      content: "FAQ — Virodip Smart Parking Service",
    },
    {
      property: "og:description",
      content:
        "Find answers to frequently asked questions about Virodip, the smart parking service that helps you locate and reserve parking spots in real-time.",
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
