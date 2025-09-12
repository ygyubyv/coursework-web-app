<template>
  <label
    for="avatar"
    class="relative flex justify-center md:justify-end order-1 md:order-2 cursor-pointer"
  >
    <img
      :src="avatarUrl || DEFAULT_AVATAR"
      alt="Avatar"
      class="w-28 h-28 md:w-24 md:h-24 rounded-full object-cover border border-gray-300"
    />

    <button
      type="button"
      class="absolute bottom-2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-7 h-7 md:w-6 md:h-6 rounded-full bg-black text-white flex items-center justify-center border-2 border-white hover:bg-gray-800 transition pointer-events-none"
    >
      <font-awesome-icon :icon="['fas', 'plus']" class="w-3 h-3" />
    </button>
  </label>

  <input
    id="avatar"
    type="file"
    accept="image/*"
    @change="onChange"
    class="hidden"
  />
</template>

<script setup lang="ts">
import { DEFAULT_AVATAR } from "@/constants";

interface Props {
  avatarUrl: string | null;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "onAvatarChange", avatar: File): void;
}>();

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    emit("onAvatarChange", file);
  }
};
</script>
