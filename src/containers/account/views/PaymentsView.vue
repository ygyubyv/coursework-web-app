<template>
  <BaseModal
    v-if="deleteCardModalIsVisible"
    @close="deleteCardModalIsVisible = false"
    @submit="confirmCardDelete"
    :title="$t('modals.delete_card.title')"
    :message="$t('modals.delete_card.message')"
    :submit-text="$t('modals.delete_card.submit_text')"
  />

  <BaseModal
    v-if="addCardModalIsVisible"
    @close="addCardModalIsVisible = false"
    @submit="handleCardAdd"
    :title="$t('modals.add_card.title')"
    :message="$t('modals.add_card.message')"
    :submit-text="$t('modals.add_card.submit_text')"
  >
    <template #default>
      <BaseInput
        v-model="pan"
        :placeholder="$t('forms.fields.card_number.placeholder')"
        v-bind="panAttrs"
        :error="errors.pan"
        id="card-number"
        type="number"
      />

      <BaseInput
        v-model="expMonth"
        :placeholder="$t('forms.fields.exp_month.placeholder')"
        v-bind="expMonthAttrs"
        :error="errors.expMonth"
        id="exp-month"
        type="number"
      />

      <BaseInput
        v-model="expYear"
        :placeholder="$t('forms.fields.exp_year.placeholder')"
        v-bind="expYearAttrs"
        :error="errors.expYear"
        id="exp-year"
        type="number"
      />
    </template>
  </BaseModal>

  <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-8">
    <h2 class="text-2xl font-bold text-black">
      {{ $t("views.account.payments.title") }}
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TierCard v-for="tier in tiers" :tier="tier" :key="tier.title" />
    </div>

    <div class="space-y-5">
      <h3 class="font-semibold text-xl">
        {{ $t("views.account.payments.payment_methods") }}
      </h3>

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
        <h2>{{ $t("views.account.payments.no_payment_methods") }}</h2>
      </div>

      <BaseButton
        :text="$t('buttons.add_payment_method')"
        icon="plus"
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
import { ref } from "vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import { useValidatePaymentMethod } from "../composables/useValidatePaymentMethod";

const { user } = storeToRefs(useAuthStore());
const {
  errors,
  pan,
  panAttrs,
  expMonth,
  expMonthAttrs,
  expYear,
  expYearAttrs,
  handleSubmit,
  resetForm,
} = useValidatePaymentMethod();

const deleteCardId = ref<string | null>(null);
const deleteCardModalIsVisible = ref(false);
const addCardModalIsVisible = ref(false);

const handleCardAdd = handleSubmit((values) => {
  paymentMethods.push({
    id: Date.now().toString(),
    pan: String(values.pan),
    expires: `${values.expMonth}/${values.expYear}`,
  });

  resetForm();

  addCardModalIsVisible.value = false;
});

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
