<template>
  <section class="relative w-full bg-white">
    <div class="min-h-[calc(100vh-64px)] flex items-center">
      <Hero
        :app-android-url="ANDROIN_APP_URL"
        :app-ios-url="IOS_APP_URL"
        @learn-more="learnMore"
      />
    </div>

    <div ref="howItWorks">
      <HowItWorks :steps="steps" />
    </div>

    <PaymentWays :ways="paymentWays" />

    <Tiers :tiers="tiers" @select-plan="handleSelectPlan" />

    <Contact />
  </section>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";
import { ANDROIN_APP_URL, IOS_APP_URL } from "@/constants";
import { tiers } from "../data/tiers";
import { paymentWays } from "../data/paymentWays";
import { steps } from "../data/step";
import Hero from "../components/Hero.vue";
import HowItWorks from "../components/HowItWorks.vue";
import Tiers from "../components/Tiers.vue";
import PaymentWays from "../components/PaymentWays.vue";
import Contact from "../components/Contact.vue";
import { useRouter } from "vue-router";
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";

useHead({
  title: "Virodip",
  titleTemplate: "%s | Main",
  meta: [
    {
      name: "description",
      content:
        "Discover the nearest available parking spots in real-time, reserve your space, and enjoy a seamless parking experience with our smart parking app.",
    },
    {
      name: "keywords",
      content:
        "smart parking, parking app, reserve parking, real-time parking, parking spots, mobile parking, IoT parking",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: "Smart Parking — Find and Reserve Parking Spots Instantly",
    },
    {
      property: "og:description",
      content:
        "Discover the nearest available parking spots in real-time, reserve your space, and enjoy a seamless parking experience with our smart parking app.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: APP_URL,
    },
  ],
});

const howItWorksRef = useTemplateRef("howItWorks");

const router = useRouter();

const learnMore = () => {
  if (howItWorksRef.value) {
    const top =
      howItWorksRef.value.getBoundingClientRect().top + window.scrollY;
    const headerOffset = 64;
    const extraPadding = 64;
    window.scrollTo({
      top: top - headerOffset - extraPadding,
      behavior: "smooth",
    });
  }
};

const handleSelectPlan = (id: string) => {
  router.push("/account/payments");
};
</script>
