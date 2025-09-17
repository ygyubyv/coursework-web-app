<template>Empty for now</template>

<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";

useHead({
  title: "Virodip",
  titleTemplate: "%s | Parkings",
  meta: [
    {
      name: "description",
      content:
        "Explore available parking spots with Virodip. Find, reserve, and navigate to parking spaces in real-time for a seamless parking experience.",
    },
    {
      name: "keywords",
      content:
        "smart parking, parkings, parking spots, reserve parking, parking app, real-time parking, mobile parking",
    },
    {
      property: "og:title",
      content: "Parkings — Virodip Smart Parking Service",
    },
    {
      property: "og:description",
      content:
        "Explore available parking spots with Virodip. Find, reserve, and navigate to parking spaces in real-time for a seamless parking experience.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${APP_URL}/parkings`,
    },
  ],
});
</script>
