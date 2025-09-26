<template>
  <section class="w-full bg-white md:py-10 relative">
    <div
      class="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12"
    >
      <div class="flex-1 space-y-4">
        <h2 class="text-2xl md:text-3xl font-bold text-black leading-snug">
          {{ $t("views.main.how_it_works.title") }}
        </h2>
        <p class="text-gray-700 text-base md:text-lg max-w-md">
          {{ $t("views.main.how_it_works.description") }}
        </p>
      </div>

      <div class="flex-1 relative">
        <div
          class="hidden md:block absolute top-2.5 left-6 w-px h-[90%] bg-gray-300"
        ></div>

        <div class="flex flex-col md:space-y-20 space-y-12">
          <div
            v-for="step in steps"
            :key="step.title"
            class="flex items-center relative"
          >
            <div
              class="bg-black text-white flex items-center justify-center w-12 h-12 rounded-full z-10"
            >
              <font-awesome-icon
                :icon="['fas', step.icon]"
                class="text-sm md:text-xl"
              />
            </div>
            <div class="ml-6">
              <h3 class="font-semibold text-black text-lg">{{ step.title }}</h3>
              <p class="text-gray-600 text-sm max-w-xs">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Step } from "../types";

interface Props {
  steps: Step[];
}

defineProps<Props>();
</script>
