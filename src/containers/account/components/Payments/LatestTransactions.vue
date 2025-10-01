<template>
  <div class="space-y-5">
    <h3 class="font-semibold text-xl">
      {{ $t("views.account.payments.recent_transactions") }}
    </h3>

    <div class="overflow-x-auto">
      <table class="min-w-full border border-black/10 text-sm">
        <thead class="bg-gray-50 text-gray-600 text-left">
          <tr>
            <th class="px-4 py-2 border border-black/10 font-medium">
              {{ $t("pricing.date") }}
            </th>
            <th class="px-4 py-2 border border-black/10 font-medium">
              {{ $t("pricing.description") }}
            </th>
            <th class="px-4 py-2 border border-black/10 font-medium">
              {{ $t("pricing.amount") }}
            </th>
            <th class="px-4 py-2 border border-black/10 font-medium">
              {{ $t("pricing.status") }}
            </th>
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
import type { Transaction } from "@/types";

interface Props {
  transactions: Transaction[];
}

defineProps<Props>();
</script>
