<template>
  <div class="flex flex-col md:flex-row md:items-center gap-2">
    <label class="w-32 text-gray-700 font-medium">{{ label }}:</label>
    <BaseInput
      :id="input.id"
      v-model="inputValue"
      :type="input.type"
      :placeholder="input.placeholder"
      class="w-full md:w-[300px] py-1.5 text-sm"
    />
  </div>
</template>

<script setup lang="ts">
import BaseInput from "@/components/Base/BaseInput.vue";

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
  label: string;
  input: {
    id: string;
    placeholder: string;
    type: InputType;
  };
}

defineProps<Props>();

const inputValue = defineModel();
</script>
