<template>
  <button
    @click="currentPage = page"
    :class="[
      'px-3 py-2 rounded-md text-sm font-medium border border-black',
      currentPage === page
        ? 'bg-black text-white'
        : 'bg-white text-black hover:bg-gray-100',
    ]"
  >
    {{ page }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  page: number;
}

defineProps<Props>();

const currentPage = defineModel();
</script>
