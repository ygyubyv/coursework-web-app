<script setup lang="ts">
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-1 w-full">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
