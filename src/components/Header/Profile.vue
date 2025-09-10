<template>
  <div class="relative inline-block text-left" ref="profile">
    <img
      :src="user.avatarUrl || NoAvatarImage"
      alt="Profile"
      class="w-12 h-12 p-0.5 rounded-full cursor-pointer"
      :class="isOpen ? 'border border-black' : ''"
      @click="toggleMenu"
    />

    <transition name="fade-scale">
      <div
        v-show="isOpen"
        class="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
      >
        <RouterLink
          to="/account"
          class="p-4 flex items-center space-x-3 border-b border-gray-200 hover:bg-gray-50 transition"
          @click="toggleMenu"
        >
          <img
            :src="user.avatarUrl || NoAvatarImage"
            alt="Profile"
            class="w-12 h-12 rounded-full"
          />
          <div class="pb-1">
            <h2 class="font-semibold text-black">{{ user.name }}</h2>
            <p class="text-sm text-black cursor-pointer">View profile</p>
          </div>
        </RouterLink>

        <RouterLink
          v-for="link in bodyLinks"
          :to="link.to"
          :key="link.text"
          @click="toggleMenu"
          class="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-50 transition cursor-pointer text-black"
        >
          <font-awesome-icon
            :icon="['fas', link.icon]"
            class="w-5 h-5 text-black"
          />
          <span>{{ link.text }}</span>
        </RouterLink>

        <div class="border-t border-gray-200 py-2 hover:bg-gray-50 transition">
          <button
            @click="emit('logout')"
            class="flex items-center space-x-2 w-full rounded-md text-black hover:bg-gray-100 transition px-3 py-2"
          >
            <font-awesome-icon
              :icon="['fas', 'right-from-bracket']"
              class="w-5 h-5 text-black"
            />
            <span>Sign out</span>
            <span class="text-xs text-black ml-auto">{{
              maskEmail(user.email)
            }}</span>
          </button>
        </div>

        <div
          class="border-t border-gray-200 p-3 grid gap-2 text-xs text-black"
          :class="`grid-cols-${Math.ceil(footerLinks.length / 4)}`"
        >
          <RouterLink
            v-for="link in footerLinks"
            :key="link.to"
            :to="link.to"
            @click="toggleMenu"
            class="cursor-pointer hover:underline px-1 py-1"
          >
            {{ link.text }}
          </RouterLink>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import NoAvatarImage from "@/assets/images/no-avatar-black.svg";
import { maskEmail } from "@/utils/maskEmail";
import { onClickOutside } from "@vueuse/core";
import type { User } from "@/types/User";
import { ref, useTemplateRef } from "vue";

interface BodyLink {
  to: string;
  text: string;
  icon: string;
}

interface FooterLink {
  to: string;
  text: string;
}

interface Props {
  user: User;
  bodyLinks: BodyLink[];
  footerLinks: FooterLink[];
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "logout"): void;
}>();

const isOpen = ref(false);
const profileMenu = useTemplateRef("profile");

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

onClickOutside(profileMenu, () => {
  isOpen.value = false;
});
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
