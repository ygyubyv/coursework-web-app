<template>
  <section class="w-full flex items-center">
    <div
      class="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 w-full"
    >
      <div class="flex-1 space-y-4 text-left">
        <h1 class="text-4xl font-bold text-black leading-snug">
          {{ $t("views.main.project_title") }}
        </h1>
        <p class="text-base sm:text-lg md:text-lg text-gray-700 max-w-md">
          {{ $t("views.main.project_description") }}
        </p>

        <p class="text-sm text-gray-500 font-medium mt-4">
          {{ $t("views.main.download_app") }}
        </p>

        <div class="flex flex-col sm:flex-row gap-2 mt-2">
          <a
            :href="appAndroidUrl"
            target="_blank"
            class="flex items-center justify-center gap-1.75 px-4 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-900 transition md:px-3 md:py-1.5"
          >
            <font-awesome-icon :icon="['fab', 'android']" />
            {{ $t("android") }}
          </a>

          <a
            :href="appIosUrl"
            target="_blank"
            class="flex items-center justify-center gap-1.75 px-4 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-900 transition md:px-3 md:py-1.5"
          >
            <font-awesome-icon :icon="['fab', 'apple']" />
            {{ $t("ios") }}
          </a>

          <BaseButton
            mode="Primary"
            icon="info-circle"
            :text="$t('buttons.learn_more')"
            class="w-full sm:w-auto"
            :onClick="() => emit('learnMore')"
          />
        </div>
      </div>

      <div class="hidden flex-1 md:flex justify-center mt-6 md:mt-0">
        <img
          src="/src/assets/images/phone.jpg"
          alt="Parking Illustration"
          class="w-full max-w-sm sm:max-w-md rounded-2xl"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from "@/components/Base/BaseButton.vue";

interface Props {
  appAndroidUrl: string;
  appIosUrl: string;
}
const emit = defineEmits<{
  (e: "learnMore"): void;
}>();

defineProps<Props>();
</script>
