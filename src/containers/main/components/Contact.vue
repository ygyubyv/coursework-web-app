<template>
  <section class="py-8 md:py-16">
    <div
      class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6"
    >
      <div class="text-center sm:text-left">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
          Have any questions?
        </h2>
        <p class="mt-2 text-gray-700">
          Our team is ready to help you. Reach out anytime!
        </p>
      </div>

      <BaseButton
        mode="Primary"
        text="Contact Us!"
        icon="arrow-right"
        :onClick="onContact"
        class="whitespace-nowrap"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from "@/components/Base/BaseButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const onContact = () => {
  router.push("/contact");
};
</script>
