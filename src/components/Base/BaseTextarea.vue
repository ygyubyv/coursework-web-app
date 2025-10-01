<template>
  <div class="flex flex-col w-full">
    <label v-if="error" :for="id" class="mb-1 text-sm text-red-600">
      {{ error }}
    </label>

    <textarea
      v-model="textAreaValue"
      :id="id"
      :name="name"
      :rows="rows"
      :placeholder="placeholder"
      v-bind="$attrs"
      :class="[
        'w-full max-w-xs sm:max-w-full rounded-lg border px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base duration-200 resize-none',
        error
          ? 'border-red-500 bg-red-50 text-black focus:ring-red-400 focus:outline-none'
          : 'border-gray-300 text-black focus:border-black focus:ring-black/30',
      ]"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  placeholder: string;
  id: string;
  name: string;
  rows: number;
  error?: string;
}

defineOptions({
  inheritAttrs: false,
});

defineProps<Props>();

const textAreaValue = defineModel<string>();
</script>

<style scoped>
textarea {
  appearance: none;
  -webkit-appearance: none;
  outline: none;
}
</style>
