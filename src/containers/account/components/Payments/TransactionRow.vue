<template>
  <tr class="border border-black/10">
    <td class="px-4 py-2 border border-black/10">
      {{ formatDate(transaction.date) }}
    </td>
    <td class="px-4 py-2 border border-black/10">
      {{ transaction.description }}
    </td>
    <td class="px-4 py-2 border border-black/10 font-medium text-black">
      ${{ transaction.amount }}
    </td>
    <td class="px-4 py-2 border border-black/10 font-medium">
      {{ transaction.status }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import { formatDate } from "@/utils/formatDate";
import type { Transaction } from "../../types";

interface Props {
  transaction: Transaction;
}

defineProps<Props>();
</script>
