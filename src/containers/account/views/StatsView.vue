<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">
      {{ $t("views.account.statistics.title") }}
    </h2>

    <div class="flex gap-3">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="pb-2 px-4 -mb-px border-b-2 font-medium"
        :class="
          selectedTab === tab.value
            ? 'border-black text-black'
            : 'border-transparent text-gray-500 hover:text-black'
        "
        @click="selectedTab = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>

    <Overview :transactions-metadata="transactionsMetadata" />

    <div class="bg-white rounded-lg border p-4 shadow-sm">
      <h3 class="text-lg font-semibold mb-4">
        {{ $t("views.account.statistics.transactions.spending_trend") }}
      </h3>
      <Chart
        :transactions="filterChartData"
        :label="$t('views.account.statistics.transactions.spent')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Chart from "../components/Stats/Chart.vue";
import { getTimeBoundaries, timeUnitsInMs } from "@/utils";
import Overview from "../components/Stats/Overview.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";

const { user } = storeToRefs(useAuthStore());
const { t } = useI18n();
const { monthAgo, yearAgo } = getTimeBoundaries();
const { month } = timeUnitsInMs();

type Range = "month" | "quarter" | "year";
interface Tab {
  label: string;
  value: Range;
}

const tabs: Tab[] = [
  { label: t("tabs.labels.this_month"), value: "month" },
  { label: t("tabs.labels.this_quarter"), value: "quarter" },
  { label: t("tabs.labels.this_year"), value: "year" },
];

const selectedTab = ref<Range>("month");

const filterChartData = computed(() => {
  switch (selectedTab.value) {
    case "month":
      return user.value!.transactions.filter(
        (t) => new Date(t.date).getTime() > monthAgo
      );
    case "quarter":
      return user.value!.transactions.filter(
        (t) => new Date(t.date).getTime() > Date.now() - 3 * month
      );
    case "year":
      return user.value!.transactions.filter(
        (t) => new Date(t.date).getTime() > yearAgo
      );
  }
});

const transactionsMetadata = computed(() => {
  return {
    total: filterChartData.value.reduce((sum, t) => sum + t.amount, 0),
    count: filterChartData.value.length,
    successfulTransactions: filterChartData.value.filter(
      (t) => t.status === "Success"
    ).length,
    failedTransactions: filterChartData.value.filter(
      (t) => t.status === "Failed"
    ).length,
  };
});
</script>
