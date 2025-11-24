<template>
  <button
    @click="changePage"
    :disabled="isDisabled"
    type="button"
    class="px-3 py-2 rounded-md text-sm font-medium border border-black text-black bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
  >
    {{ type === "Previous" ? "←" : "→" }}
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  type: "Previous" | "Next";
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const props = defineProps<Props>();

const currentPage = defineModel<number>();

const isDisabled = computed(() => {
  if (props.type === "Previous" && !props.hasPrev) {
    return true;
  }

  if (props.type === "Next" && !props.hasNext) {
    return true;
  }

  return false;
});

const changePage = () => {
  props.type === "Previous" ? currentPage.value!-- : currentPage.value!++;
};
</script>
