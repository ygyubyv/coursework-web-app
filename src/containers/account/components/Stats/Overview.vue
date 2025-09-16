<template>
  <div class="bg-white rounded-lg border shadow-sm p-6">
    <h3 class="text-lg font-semibold mb-4">Transaction Overview</h3>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
      <OverviewItem
        v-for="item in items"
        :key="item.text"
        :text="item.text"
        :icon="item.icon"
        :value="item.value"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import OverviewItem from "./OverviewItem.vue";

interface Props {
  transactionsMetadata: {
    total: number;
    count: number;
    successfulTransactions: number;
    failedTransactions: number;
  };
}

const props = defineProps<Props>();

const items = computed(() => {
  return [
    {
      text: "Total Spent",
      icon: "wallet",
      value: `$ ${props.transactionsMetadata.total.toLocaleString()}`,
    },
    {
      text: "Transactions",
      icon: "receipt",
      value: props.transactionsMetadata.count,
    },
    {
      text: "Successful",
      icon: "check-circle",
      value: props.transactionsMetadata.successfulTransactions,
    },
    {
      text: "Failed",
      icon: "times-circle",
      value: props.transactionsMetadata.failedTransactions,
    },
  ];
});
</script>
