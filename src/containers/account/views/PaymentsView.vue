<template>
  <section class="py-6">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-8">
      <h2 class="text-2xl font-bold text-black">Payments & Billing</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TierCard v-for="tier in tiers" :tier="tier" :key="tier.title" />
      </div>

      <div class="space-y-5">
        <h3 class="font-semibold text-xl">Payment Methods</h3>

        <div class="flex flex-col gap-2">
          <PaymentMethodCard
            v-for="paymentMethod in paymentMethods"
            :payment-method="paymentMethod"
            :key="paymentMethod.pan"
          />
        </div>

        <BaseButton
          text="Add Payment Method"
          mode="Secondary"
          class="justify-self-end"
        />
      </div>

      <LatestTransactions :transactions="transactions" />

      <Security />
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from "@/components/Base/BaseButton.vue";
import TierCard from "../components/Payments/TierCard.vue";
import PaymentMethodCard from "../components/Payments/PaymentMethodCard.vue";
import Security from "../components/Payments/Security.vue";
import LatestTransactions from "../components/Payments/LatestTransactions.vue";
import { paymentMethods, tiers, transactions } from "../data";
</script>
