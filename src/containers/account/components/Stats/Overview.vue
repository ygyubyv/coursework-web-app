<template>
  <div class="bg-white rounded-lg border shadow-sm p-6">
    <h3 class="text-lg font-semibold mb-4">
      {{ $t("views.account.statistics.transactions.description") }}
    </h3>

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
import { useI18n } from "vue-i18n";

interface Props {
  transactionsMetadata: {
    total: number;
    count: number;
    successfulTransactions: number;
    failedTransactions: number;
  };
}

const props = defineProps<Props>();

const { t } = useI18n();

const items = computed(() => {
  return [
    {
      text: t("views.account.statistics.transactions.total_spent"),
      icon: "wallet",
      value: `$ ${props.transactionsMetadata.total.toLocaleString()}`,
    },
    {
      text: t("views.account.statistics.transactions.title"),
      icon: "receipt",
      value: props.transactionsMetadata.count,
    },
    {
      text: t("status.successful"),
      icon: "check-circle",
      value: props.transactionsMetadata.successfulTransactions,
    },
    {
      text: t("status.failed"),
      icon: "times-circle",
      value: props.transactionsMetadata.failedTransactions,
    },
  ];
});
</script>
