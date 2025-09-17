<template>Empty for now</template>

<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";

useHead({
  title: "Virodip",
  titleTemplate: "%s | About",
  meta: [
    {
      name: "description",
      content:
        "Learn more about Virodip, the smart parking service that helps you find and reserve parking spots in real-time.",
    },
    {
      name: "keywords",
      content:
        "smart parking, about, parking app, parking service, real-time parking, mobile parking",
    },
    {
      property: "og:title",
      content: "About Virodip — Smart Parking Service",
    },
    {
      property: "og:description",
      content:
        "Learn more about Virodip, the smart parking service that helps you find and reserve parking spots in real-time.",
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
