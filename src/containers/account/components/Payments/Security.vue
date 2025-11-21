<template>
  <div class="rounded-lg space-y-5" data-cy="payments-security">
    <h3 class="font-semibold text-xl">
      {{ $t("views.account.payments.security.title") }}
    </h3>
    <ul
      class="list-disc list-inside text-gray-600 space-y-1"
      data-cy="security-features"
    >
      <li v-for="feature in $tm('views.account.payments.security.features')">
        {{ feature }}
      </li>
    </ul>
  </div>
</template>
