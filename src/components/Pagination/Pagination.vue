<template>
  <div class="flex self-end justify-center mt-10 gap-2 flex-wrap">
    <!-- Left arrow button -->
    <PaginationArrowButton
      v-model="currentPage"
      :total-pages="totalPages"
      :has-next="hasNext"
      :has-prev="hasPrev"
      type="Previous"
      v-if="totalPages > 1"
    />
    <!-- Left arrow button -->

    <!-- First page button -->
    <PaginationPageButton :page="1" v-model="currentPage" />
    <!-- First page button -->

    <!-- Numerable buttons -->
    <PaginationPageButton
      v-for="page in reachablePages"
      v-model="currentPage"
      :page="page"
      :key="page"
    />
    <!-- Numerable buttons -->

    <!-- Last page button -->
    <PaginationPageButton
      :page="totalPages"
      v-model="currentPage"
      v-if="totalPages > 1"
    />
    <!-- Last page button -->

    <!-- Right arrow button -->
    <PaginationArrowButton
      v-model="currentPage"
      type="Next"
      :total-pages="totalPages"
      :has-next="hasNext"
      :has-prev="hasPrev"
      v-if="totalPages > 1"
    />
    <!-- Right arrow button -->
  </div>
</template>

<script setup lang="ts">
import PaginationArrowButton from "./ArrowButton.vue";
import PaginationPageButton from "./PageButton.vue";
import { computed } from "vue";

interface Props {
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const props = defineProps<Props>();

const currentPage = defineModel<number>({
  default: 1,
});

const reachablePages = computed(() => {
  const pages: number[] = [];

  const first = 1;
  const last = props.totalPages;

  if (props.totalPages <= 2) return [];

  if (currentPage.value <= 2) {
    pages.push(2, 3, 4);
  } else if (currentPage.value >= props.totalPages - 1) {
    pages.push(last - 3, last - 2, last - 1);
  } else {
    pages.push(currentPage.value - 1, currentPage.value, currentPage.value + 1);
  }

  return pages.filter((p) => p > first && p < last);
});
</script>
