<template>
  <div
    class="bg-white rounded-2xl shadow-md border border-gray-200 p-8 cursor-pointer flex flex-col relative transform transition duration-300 hover:scale-102 hover:shadow-xl"
    @click="emit('selectPlan', tier.id)"
  >
    <span
      class="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full"
      v-if="tier.badgeLabel"
    >
      {{ tier.badgeLabel }}
    </span>
    <h3 class="text-xl font-semibold text-gray-900">{{ tier.plan }}</h3>
    <p class="mt-2 text-gray-500">{{ tier.description }}</p>
    <p class="mt-6 text-4xl font-bold text-gray-900">
      $ {{ tier.price }}<span class="text-lg">/mo</span>
    </p>
    <ul class="mt-6 space-y-3 text-sm text-gray-600 flex-1">
      <li
        v-for="feature in tier.features"
        :key="feature"
        class="flex items-center gap-2"
      >
        <font-awesome-icon :icon="['fas', 'check-circle']" class="text-black" />
        {{ feature }}
      </li>
    </ul>
    <button
      class="mt-6 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition"
    >
      {{ tier.ctaLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Tier } from "../types";

interface Props {
  tier: Tier;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "selectPlan", id: string): void;
}>();
</script>
