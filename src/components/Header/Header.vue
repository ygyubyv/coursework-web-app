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
        Virodip
      </RouterLink>

      <div class="flex items-center gap-12">
        <div class="hidden md:flex items-center gap-6">
          <RouterLink
            to="/parkings"
            class="text-black font-medium hover:underline hover:text-gray-700 transition-colors duration-200"
          >
            Parkings
          </RouterLink>
          <RouterLink
            to="/book"
            class="text-black font-medium hover:underline hover:text-gray-700 transition-colors duration-200"
          >
            Book
          </RouterLink>
        </div>

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
            v-else
            mode="Primary"
            text="Увійти"
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
import type { User } from "@/types/User";
import Profile from "./Profile.vue";
import BaseButton from "../Base/BaseButton.vue";

const isAuthenticated = true;

const user: User = {
  id: "1",
  name: "Example name",
  email: "dopi@gmail.com",
  avatarUrl: null,
  createdAt: "2025-09-04T16:25:50.636Z",
  phoneNumber: "+380687586410",
};

const profileMenuLinks = {
  body: [
    { to: "/parkings", text: "My parkings", icon: "calendar-check" },
    { to: "/book", text: "Book parking", icon: "credit-card" },
    { to: "/account", text: "Account", icon: "user" },
    { to: "/settings", text: "Settings", icon: "cog" },
    { to: "/help", text: "Help", icon: "circle-question" },
  ],
  footer: [
    { to: "/about", text: "About us" },
    { to: "/faq", text: "FAQ" },
    { to: "/contact", text: "Contact" },
  ],
};

const login = async () => {
  console.log("login");
};

const logout = async () => {
  console.log("Logout");
};
</script>
