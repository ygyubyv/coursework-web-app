<template>
  <section class="py-8 md:py-16">
    <div
      class="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6"
    >
      <div class="text-center sm:text-left">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
          {{ $t("views.main.contact.title") }}
        </h2>
        <p class="mt-2 text-gray-700">
          {{ $t("views.main.contact.description") }}
        </p>
      </div>

      <BaseButton
        mode="Primary"
        :text="$t('buttons.contact_us')"
        icon="arrow-right"
        :onClick="onContact"
        data-cy="contact-us-btn"
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
