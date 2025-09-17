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
