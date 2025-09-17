<template>Empty for now</template>

<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";

useHead({
  title: "Virodip",
  titleTemplate: "%s | Book",
  meta: [
    {
      name: "description",
      content:
        "Reserve your parking spot instantly with Virodip, the smart parking service that helps you find and book parking spaces in real-time.",
    },
    {
      name: "keywords",
      content:
        "smart parking, book, reserve parking, parking app, parking service, real-time parking, mobile parking",
    },
    {
      property: "og:title",
      content: "Book a Parking Spot — Virodip Smart Parking Service",
    },
    {
      property: "og:description",
      content:
        "Reserve your parking spot instantly with Virodip, the smart parking service that helps you find and book parking spaces in real-time.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${APP_URL}/book`,
    },
  ],
});
</script>
