<template>
  <section class="relative w-full bg-white">
    <div class="min-h-[calc(100vh-64px)] flex items-center">
      <Hero
        :app-android-url="ANDROIN_APP_URL"
        :app-ios-url="IOS_APP_URL"
        @learn-more="learnMore"
      />
    </div>

    <div ref="howItWorks" data-cy="how-it-works">
      <HowItWorks :steps="steps" />
    </div>

    <PaymentWays :ways="paymentWays" />

    <Tiers v-if="tiers" :tiers="tiers" @select-plan="handleSelectPlan" />

    <Contact />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from "vue";
import { ANDROIN_APP_URL, IOS_APP_URL } from "@/constants";
import { tiers as ts } from "../data/tiers";
import Hero from "../components/Hero.vue";
import HowItWorks from "../components/HowItWorks.vue";
import Tiers from "../components/Tiers.vue";
import PaymentWays from "../components/PaymentWays.vue";
import Contact from "../components/Contact.vue";
import { useRouter } from "vue-router";
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";
import { useI18n } from "vue-i18n";
import type { PaymentWay, Step, Tier } from "../types";

const { t, tm } = useI18n();
const router = useRouter();

const howItWorksRef = useTemplateRef("howItWorks");

const fetchedTiers = ref<Tier[] | null>(null);

const steps = computed(() => {
  return tm("views.main.how_it_works.steps") as Step[];
});

const paymentWays = computed(() => {
  return tm("views.main.payments.ways") as PaymentWay[];
});

const tiers = computed(() => {
  if (!fetchedTiers.value) {
    return [];
  }

  return fetchedTiers.value.map((tier) => {
    return {
      ...tier,
      plan: t(`pricing.tiers.${tier.id}.plan`),
      description: t(`pricing.tiers.${tier.id}.description`),
      features: tm(`pricing.tiers.${tier.id}.features`) as string[],
      ctaLabel: t(`pricing.tiers.${tier.id}.ctaLabel`),
      badgeLabel: tier.badgeLabel
        ? t(`pricing.tiers.${tier.id}.badgeLabel`)
        : undefined,
    };
  });
});

const getTiers = () => {
  fetchedTiers.value = ts;
};

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

useHead({
  title: t("seo.main.head.title"),
  titleTemplate: `%s | ${t("seo.main.head.titleTemplate")}`,
  meta: [
    {
      name: "description",
      content: t("seo.main.head.description"),
    },
    {
      name: "keywords",
      content: t("seo.main.head.keywords"),
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: t("seo.main.head.ogTitle"),
    },
    {
      property: "og:description",
      content: t("seo.main.head.ogDescription"),
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

onMounted(() => {
  getTiers();
});
</script>
