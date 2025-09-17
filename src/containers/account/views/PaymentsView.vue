<template>
  <BaseModal
    v-if="deleteCardModalIsVisible"
    @close="deleteCardModalIsVisible = false"
    @submit="confirmCardDelete"
    title="Confirm Card Deletion"
    message="Are you sure you want to permanently delete this payment method? This action cannot be undone."
    submit-text="Delete Card"
  />

  <BaseModal
    v-if="addCardModalIsVisible"
    @close="addCardModalIsVisible = false"
    @submit="handleCardAdd"
    title="Add New Payment Method"
    message="Enter your card details below to add a new payment method."
    submit-text="Add Card"
  >
    <template #default>
      <BaseInput
        v-model="newCard.pan"
        placeholder="Card Number"
        id="card-number"
        type="number"
      />
      <div class="flex gap-2">
        <BaseInput
          v-model="newCard.expMonth"
          placeholder="MM"
          id="exp-month"
          type="number"
        />
        <BaseInput
          v-model="newCard.expYear"
          placeholder="YY"
          id="exp-year"
          type="number"
        />
      </div>
    </template>
  </BaseModal>

  <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-8">
    <h2 class="text-2xl font-bold text-black">Payments & Billing</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TierCard v-for="tier in tiers" :tier="tier" :key="tier.title" />
    </div>

    <div class="space-y-5">
      <h3 class="font-semibold text-xl">Payment Methods</h3>

      <div
        class="flex flex-col gap-2"
        v-if="paymentMethods && paymentMethods.length"
      >
        <PaymentMethodCard
          v-for="paymentMethod in paymentMethods"
          :payment-method="paymentMethod"
          :key="paymentMethod.pan"
          @on-delete="handleCardDelete"
        />
      </div>

      <div v-else>
        <h2>No payment methods added</h2>
      </div>

      <BaseButton
        text="Add Payment Method"
        mode="Secondary"
        class="justify-self-end"
        :onClick="() => (addCardModalIsVisible = true)"
      />
    </div>

    <LatestTransactions
      :transactions="user!.transactions.slice(-5).reverse()"
    />

    <Security />
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/Base/BaseButton.vue";
import TierCard from "../components/Payments/TierCard.vue";
import PaymentMethodCard from "../components/Payments/PaymentMethodCard.vue";
import Security from "../components/Payments/Security.vue";
import LatestTransactions from "../components/Payments/LatestTransactions.vue";
import { paymentMethods, tiers } from "../data";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import BaseModal from "@/components/Base/BaseModal.vue";
import { reactive, ref } from "vue";
import BaseInput from "@/components/Base/BaseInput.vue";

interface NewCard {
  pan: number | null;
  expMonth: number | null;
  expYear: number | null;
}

const { user } = storeToRefs(useAuthStore());

const newCard = reactive<NewCard>({
  pan: null,
  expMonth: null,
  expYear: null,
});
const addCardModalIsVisible = ref(false);

const deleteCardId = ref<string | null>(null);
const deleteCardModalIsVisible = ref(false);

const handleCardAdd = () => {
  paymentMethods.push({
    id: Date.now().toString(),
    pan: String(newCard.pan),
    expires: `${newCard.expMonth}/${newCard.expYear}`,
  });

  newCard.pan = null;
  newCard.expYear = null;
  newCard.expMonth = null;

  addCardModalIsVisible.value = false;
};

const handleCardDelete = (id: string) => {
  deleteCardModalIsVisible.value = true;
  deleteCardId.value = id;
};

const confirmCardDelete = () => {
  const targetIndex = paymentMethods.findIndex(
    (p) => p.id === deleteCardId.value
  );

  if (targetIndex === -1) {
    return;
  }

  paymentMethods.splice(targetIndex, 1);
  deleteCardModalIsVisible.value = false;
};
</script>
