<template>
  <input
    v-model="inputValue"
    :id="id"
    :type="type"
    :placeholder="placeholder"
    v-bind="$attrs"
    :class="[
      'w-full max-w-xs sm:max-w-full rounded-md border px-4 py-2 sm:px-5 sm:py-2.5  text-sm sm:text-base transition-colors duration-200',
      error
        ? 'border-red-500 bg-red-50 text-black focus:ring-red-400 focus:outline-none'
        : 'border-gray-300  text-black focus:border-black focus:ring-black/30',
    ]"
  />
</template>

<script setup lang="ts">
type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "datetime-local"
  | "month"
  | "week"
  | "time"
  | "color";

interface Props {
  placeholder: string;
  id: string;
  type?: InputType;
  error?: boolean;
}

defineProps<Props>();
defineOptions({
  inheritAttrs: false,
});

const inputValue = defineModel();
</script>

<style scoped>
input {
  appearance: none;
  -webkit-appearance: none;
  outline: none;
}
</style>
