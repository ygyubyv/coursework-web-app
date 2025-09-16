<template>
  <div class="flex flex-col items-center text-center">
    <font-awesome-icon :icon="['fas', icon]" class="text-black text-2xl mb-2" />
    <p class="text-sm text-gray-500">{{ text }}</p>
    <p class="text-lg font-bold text-black">
      {{ value }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
  text: string;
  value: number | string;
}

defineProps<Props>();
</script>
