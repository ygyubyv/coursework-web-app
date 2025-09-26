<template>
  <section class="py-8 md:py-16 px-6 lg:px-8">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
        {{ $t("views.main.payments.title") }}
      </h2>
      <p class="mt-4 text-gray-600 max-w-2xl mx-auto">
        {{ $t("views.main.payments.description") }}
      </p>
    </div>

    <div
      class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
    >
      <PaymentWay v-for="way in ways" :key="way.title" :way="way" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PaymentWay as Way } from "../types";
import PaymentWay from "./PaymentWay.vue";

interface Props {
  ways: Way[];
}

defineProps<Props>();
</script>
