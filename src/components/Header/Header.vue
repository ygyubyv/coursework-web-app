<template>
  <header
    class="bg-white text-black border-b border-gray-200 shadow sticky top-0 z-50"
  >
    <div
      class="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16"
    >
      <RouterLink
        to="/"
        class="text-xl font-bold text-black hover:underline hover:text-gray-700 transition-colors duration-200"
      >
        {{ $t("routes.main") }}
      </RouterLink>

      <div class="flex items-center gap-2 md:gap-6">
        <div class="hidden md:flex items-center gap-6">
          <RouterLink
            v-if="isAuthenticated"
            to="/my-bookings"
            class="text-black font-medium hover:underline hover:text-gray-700 transition-colors duration-200"
          >
            {{ $t("routes.my_bookings") }}
          </RouterLink>
          <RouterLink
            v-if="isAuthenticated && hasRole('admin')"
            to="/users"
            class="text-black font-medium hover:underline hover:text-gray-700 transition-colors duration-200"
          >
            {{ $t("routes.users") }}
          </RouterLink>
          <RouterLink
            to="/book"
            class="text-black font-medium hover:underline hover:text-gray-700 transition-colors duration-200"
          >
            {{ $t("routes.reserve") }}
          </RouterLink>
        </div>

        <LanguagePicker />

        <div class="flex items-center justify-center flex-shrink-0">
          <!-- IF Authenticated -->
          <Profile
            v-if="isAuthenticated && user"
            :user="user"
            :body-links="profileMenuLinks.body"
            :footer-links="profileMenuLinks.footer"
            @logout="logout"
          />

          <!-- IF Not -->
          <BaseButton
            v-else-if="!isAuthenticated"
            mode="Primary"
            :text="$t('buttons.sign_in')"
            icon="right-to-bracket"
            size="Medium"
            :onClick="login"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Profile from "./Profile.vue";
import BaseButton from "../Base/BaseButton.vue";
import LanguagePicker from "./LanguagePicker.vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useUserStore } from "@/stores/user";

const { login, logout, hasRole } = useAuthStore();
const { isAuthenticated } = storeToRefs(useAuthStore());

const { user } = storeToRefs(useUserStore());

const { t } = useI18n();

const profileMenuLinks = computed(() => ({
  body: [
    {
      to: "/my-bookings",
      text: t("routes.my_bookings"),
      icon: "calendar-check",
    },
    { to: "/book", text: t("routes.reserve"), icon: "credit-card" },
    { to: "/account", text: t("routes.account.default"), icon: "user" },
    {
      to: "/account/settings",
      text: t("routes.account.settings"),
      icon: "cog",
    },
    { to: "/help", text: t("routes.help"), icon: "circle-question" },
  ],
  footer: [
    { to: "/about", text: t("routes.about") },
    { to: "/faq", text: t("routes.faq") },
    { to: "/contact", text: t("routes.contact") },
  ],
}));
</script>
