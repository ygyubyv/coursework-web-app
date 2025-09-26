<template>
  <footer class="bg-white text-black border-t border-gray-200 shadow-inner">
    <div
      class="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between gap-6"
    >
      <div class="flex flex-col items-start">
        <RouterLink
          to="/"
          class="text-lg font-bold hover:underline hover:text-gray-700 transition-colors duration-200"
        >
          {{ $t("routes.main") }}
        </RouterLink>
        <p class="text-xs text-gray-500 mt-1">
          {{ $t("footer.description") }}
        </p>
      </div>

      <div class="flex flex-col md:items-end gap-4 w-full md:w-auto">
        <div
          class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm md:flex md:flex-wrap md:gap-6"
        >
          <RouterLink
            v-for="link in footerLinks"
            :key="link.to"
            :to="link.to"
            class="hover:underline hover:text-gray-700 transition-colors duration-200"
          >
            {{ link.text }}
          </RouterLink>
        </div>

        <div class="text-xs text-gray-500 text-center md:text-right">
          {{ $t("footer.copyright", { year }) }}
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const year = new Date().getFullYear();

const footerLinks = computed(() => {
  return [
    { to: "/parkings", text: t("routes.my_parkings") },
    { to: "/book", text: t("routes.reserve") },
    { to: "/account", text: t("routes.account.default") },
    { to: "/help", text: t("routes.help") },
    { to: "/about", text: t("routes.about") },
    { to: "/faq", text: t("routes.faq") },
    { to: "/contact", text: t("routes.contact") },
  ];
});
</script>
