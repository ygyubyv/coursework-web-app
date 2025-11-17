<template>
  <section class="py-16 px-6 lg:px-8" data-cy="pricing-section">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
        {{ $t("views.main.pricing.title") }}
      </h2>
      <p class="mt-4 text-gray-600 max-w-2xl mx-auto">
        {{ $t("views.main.pricing.description") }}
      </p>
    </div>

    <div
      class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto"
    >
      <TierCard
        v-for="tier in tiers"
        :key="tier.id"
        :tier="tier"
        @selectPlan="emit('selectPlan', $event)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Tier } from "../types";
import TierCard from "./TierCard.vue";

interface Props {
  tiers: Tier[];
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "selectPlan", id: string): void;
}>();
</script>
