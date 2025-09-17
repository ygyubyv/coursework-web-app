<template>Empty for now</template>

<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";

useHead({
  title: "Virodip",
  titleTemplate: "%s | Help",
  meta: [
    {
      name: "description",
      content:
        "Get help and support for Virodip, the smart parking service that assists you in finding and reserving parking spots in real-time.",
    },
    {
      name: "keywords",
      content:
        "smart parking, help, support, parking app, parking service, real-time parking, mobile parking",
    },
    {
      property: "og:title",
      content: "Help — Virodip Smart Parking Service",
    },
    {
      property: "og:description",
      content:
        "Get help and support for Virodip, the smart parking service that assists you in finding and reserving parking spots in real-time.",
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
