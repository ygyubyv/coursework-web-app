<template>
  <div class="flex flex-col md:flex-row md:items-center gap-2">
    <span class="w-32 text-gray-700 font-medium">{{ label }}:</span>
    <span class="text-black" data-cy="stat-value">{{ value }}</span>
  </div>
</template>
<script setup lang="ts">
interface Props {
  label: string;
  value: any;
}
defineProps<Props>();
</script>
