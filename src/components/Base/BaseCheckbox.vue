<template>
  <label class="flex items-center gap-2 text-base cursor-pointer select-none">
    <input
      type="checkbox"
      v-model="checkboxValue"
      :disabled="disabled"
      :checked="checked"
      :value="inputValue"
      class="w-5 h-5"
    />
    {{ name }}
  </label>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  disabled?: boolean;
  checked?: boolean;
  inputValue: string;
}

defineProps<Props>();

const checkboxValue = defineModel();
</script>
