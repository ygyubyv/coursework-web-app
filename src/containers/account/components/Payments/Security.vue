<template>
  <div class="rounded-lg space-y-5">
    <h3 class="font-semibold text-xl">
      {{ $t("views.account.payments.security.title") }}
    </h3>
    <ul class="list-disc list-inside text-gray-600 space-y-1">
      <li v-for="feature in $tm('views.account.payments.security.features')">
        {{ feature }}
      </li>
    </ul>
  </div>
</template>
