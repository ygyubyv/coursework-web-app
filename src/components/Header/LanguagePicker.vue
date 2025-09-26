<template>
  <div class="flex items-center gap-2 text-sm text-gray-500">
    <button
      :class="
        locale === 'uk' ? 'font-semibold text-gray-900' : 'cursor-pointer'
      "
      @click="selectLocale('uk')"
    >
      UK
    </button>
    /
    <button
      :class="
        locale === 'en' ? 'font-semibold text-gray-900' : 'cursor-pointer'
      "
      @click="selectLocale('en')"
    >
      EN
    </button>
  </div>
</template>

<script setup lang="ts">
import { useLocalization } from "@/composables/useLocalization";

const { locale, selectLocale } = useLocalization();
</script>
