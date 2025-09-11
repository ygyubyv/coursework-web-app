<template>
  <footer
    class="bg-white text-black border-t border-gray-200 shadow-inner mt-12"
  >
    <div
      class="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between gap-6"
    >
      <div class="flex flex-col items-start">
        <RouterLink
          to="/"
          class="text-lg font-bold hover:underline hover:text-gray-700 transition-colors duration-200"
        >
          Virodip
        </RouterLink>
        <p class="text-xs text-gray-500 mt-1">
          Safe and easy parking management.
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
          &copy; 2025 Virodip. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = [
  { to: "/parkings", text: "Parkings" },
  { to: "/book", text: "Book" },
  { to: "/account", text: "Account" },
  { to: "/help", text: "Help" },
  { to: "/about", text: "About us" },
  { to: "/faq", text: "FAQ" },
  { to: "/contact", text: "Contact" },
];
</script>
