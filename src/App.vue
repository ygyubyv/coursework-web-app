<script setup lang="ts">
import { isLoading } from "./router";
import BaseSpinner from "./components/Base/BaseSpinner.vue";
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-1 w-full">
      <RouterView v-if="!isLoading" />
      <div class="flex min-h-screen items-center justify-center" v-else>
        <BaseSpinner mode="Black-spinner" />
      </div>
    </main>

    <Footer />
  </div>
</template>
