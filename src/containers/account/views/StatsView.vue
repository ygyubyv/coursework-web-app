<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Statistics</h2>

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
      <h3 class="text-lg font-semibold mb-4">Spending Trend</h3>
      <Chart :transactions="filterChartData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Chart from "../components/Stats/Chart.vue";
import { DEFAULT_USER } from "@/constants";
import { getTimeBoundaries } from "@/utils/getTimeBoundaries";
import { timeUnitsInMs } from "@/utils/timeUnitsInMs";
import Overview from "../components/Stats/Overview.vue";

const { monthAgo, yearAgo } = getTimeBoundaries();
const { month } = timeUnitsInMs();

type Range = "month" | "quarter" | "year";
interface Tab {
  label: string;
  value: Range;
}

const tabs: Tab[] = [
  { label: "This Month", value: "month" },
  { label: "3 Months", value: "quarter" },
  { label: "This Year", value: "year" },
];

const selectedTab = ref<Range>("month");

const filterChartData = computed(() => {
  switch (selectedTab.value) {
    case "month":
      return DEFAULT_USER.transactions.filter(
        (t) => new Date(t.date).getTime() > monthAgo
      );
    case "quarter":
      return DEFAULT_USER.transactions.filter(
        (t) => new Date(t.date).getTime() > Date.now() - 3 * month
      );
    case "year":
      return DEFAULT_USER.transactions.filter(
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
