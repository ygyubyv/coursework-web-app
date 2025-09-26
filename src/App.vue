<template>
  <BaseModal
    v-if="authModalIsVisible"
    @submit="login"
    @close="authModalIsVisible = false"
    :title="$t('modals.required_auth.title')"
    :message="$t('modals.required_auth.message')"
    :submit-text="$t('modals.required_auth.submit_text')"
  />

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

<script setup lang="ts">
import { isLoading } from "./router";
import BaseModal from "./components/Base/BaseModal.vue";
import BaseSpinner from "./components/Base/BaseSpinner.vue";
import Header from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();

const { login } = authStore;
const { authModalIsVisible } = storeToRefs(authStore);
</script>
