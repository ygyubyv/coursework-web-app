<template>
  <div class="relative">
    <div
      class="cursor-pointer border border-gray-300 rounded-lg px-4 py-2 bg-white flex justify-between items-center"
      @click="toggleSelectDropdown"
    >
      <span>{{ modelValue?.label || placeholder }}</span>
      <font-awesome-icon
        :icon="['fas', 'chevron-down']"
        :class="{ 'rotate-180': selectIsOpen }"
        class="transition-transform"
      />
    </div>
    <div
      v-if="selectIsOpen"
      class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-auto"
    >
      <div
        v-for="option in options"
        :key="option.label"
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        @click="selectValue(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Option {
  label: string;
  value: string | number | boolean;
}

interface Props {
  placeholder: string;
  options: Option[];
}

defineProps<Props>();

const modelValue = defineModel<Option | null>();

const selectIsOpen = ref(false);

const selectValue = (option: Option) => {
  modelValue.value = option;
  toggleSelectDropdown();
};

const toggleSelectDropdown = () => {
  selectIsOpen.value = !selectIsOpen.value;
};
</script>
