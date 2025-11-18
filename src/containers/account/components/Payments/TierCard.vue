<template>
  <div
    class="relative border rounded-xl p-6 shadow-sm flex flex-col items-start transform transition duration-300 hover:scale-[1.01] hover:shadow-lg"
    data-cy="tier-card"
  >
    <h3 class="text-xl font-semibold">{{ tier.title }}</h3>
    <p class="text-gray-600">{{ tier.description }}</p>
    <p class="mt-4 font-bold text-black">{{ tier.price }}</p>

    <div class="mt-auto pt-4">
      <BaseButton
        v-if="tier.active"
        :text="$t('common.current')"
        mode="Secondary"
        :disabled="true"
      />

      <BaseButton
        v-else
        :text="$t('buttons.switch_to')"
        mode="Primary"
        :onClick="() => emit('onSwitch')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/Base/BaseButton.vue";
import type { Tier } from "../../types";

interface Props {
  tier: Tier;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "onSwitch"): void;
}>();
</script>
