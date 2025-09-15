<template>
  <div class="space-y-5">
    <h3 class="font-semibold text-xl">Recent Transactions</h3>

    <div class="overflow-x-auto">
      <table class="min-w-full border border-black/10 text-sm">
        <thead class="bg-gray-50 text-gray-600 text-left">
          <tr>
            <th class="px-4 py-2 border border-black/10 font-medium">Date</th>
            <th class="px-4 py-2 border border-black/10 font-medium">
              Description
            </th>
            <th class="px-4 py-2 border border-black/10 font-medium">Amount</th>
            <th class="px-4 py-2 border border-black/10 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <TransactionRow
            v-for="transaction in transactions"
            :key="transaction.id"
            :transaction="transaction"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import TransactionRow from "./TransactionRow.vue";
import type { Transaction } from "../../types";

interface Props {
  transactions: Transaction[];
}

defineProps<Props>();
</script>
