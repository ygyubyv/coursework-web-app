<template>
  <div class="h-72 sm:h-80 md:h-100">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { computed } from "vue";

import { Line } from "vue-chartjs";
import type { Transaction } from "@/types";
import { formatToYYYYMMDD } from "@/utils/formatToYYYYMMDD";

interface Props {
  label: string;
  transactions: Transaction[];
}

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const props = defineProps<Props>();

const chartData = computed(() => {
  return {
    labels: props.transactions.map((t) =>
      formatToYYYYMMDD(new Date(t.date).getTime())
    ),
    datasets: [
      {
        label: props.label,
        data: props.transactions.map((t) => t.amount),
        fill: false,
        borderColor: "#364153",
        tension: 0.2,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      ticks: {
        maxTicksLimit: window.innerWidth < 640 ? 6 : 12,
      },
    },
    y: {
      ticks: {
        precision: 0,
      },
    },
  },
};
</script>
