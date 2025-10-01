<template>
  <div class="flex flex-col w-full">
    <label v-if="error" :for="id" class="mb-1 text-sm text-red-600">
      {{ error }}
    </label>

    <input
      v-model="inputValue"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-bind="$attrs"
      :class="[
        'w-full sm:max-w-full rounded-md border transition-colors duration-200 focus:outline-none',
        sizeClasses,
        error
          ? 'border-red-500 bg-red-50 text-black focus:ring-red-400'
          : 'border-gray-300 text-black focus:border-black focus:ring-black/30',
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

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

type Size = "Small" | "Medium" | "Big";

interface Props {
  placeholder: string;
  id: string;
  type?: InputType;
  error?: string;
  size?: Size;
}

const { size } = withDefaults(defineProps<Props>(), {
  size: "Medium",
});

defineOptions({
  inheritAttrs: false,
});

const inputValue = defineModel();

const sizeClasses = computed(() => {
  switch (size) {
    case "Small":
      return "px-3 py-1.5 text-xs";
    case "Big":
      return "px-6 py-3 text-base";
    case "Medium":
    default:
      return "px-4 py-2 text-sm";
  }
});
</script>

<style scoped>
input {
  appearance: none;
  -webkit-appearance: none;
  outline: none;
}
</style>
