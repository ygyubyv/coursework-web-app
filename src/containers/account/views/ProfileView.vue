<template>
  <section class="py-6">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-6">
      <h2 class="text-xl font-bold text-black">
        {{ $t("views.account.profile.title") }}
      </h2>

      <div class="flex flex-col md:flex-row md:items-start gap-6">
        <div class="flex-1 space-y-4 order-2 md:order-1">
          <Stat :label="$t('common.full_name')" :value="user!.name" />
          <Stat :label="$t('common.email')" :value="user!.email" />
          <Stat :label="$t('common.phone')" :value="user!.phoneNumber" />
          <Stat
            :label="$t('common.joined')"
            :value="formatDate(user!.createdAt)"
          />
        </div>

        <div class="flex justify-center md:justify-end order-1 md:order-2">
          <img
            :src="user!.avatarUrl || DEFAULT_AVATAR"
            alt="Avatar"
            class="w-24 h-24 rounded-full object-cover border border-gray-300"
          />
        </div>
      </div>

      <div class="flex flex-col space-y-6">
        <h3 class="text-xl font-bold text-black">
          {{ $t("pricing.current_plan") }}
        </h3>
        <div class="flex flex-col gap-4">
          <Stat
            :label="$t('pricing.plan')"
            :value="user!.subscription.tier.name"
          />
          <Stat
            :label="$t('pricing.price')"
            :value="`$${user!.subscription.tier.price}`"
          />
          <Stat
            :label="$t('pricing.start_date')"
            :value="formatDate(user!.subscription.startDate)"
          />
          <Stat
            :label="$t('pricing.end_date')"
            :value="formatDate(user!.subscription.endDate)"
          />
          <Stat
            :label="$t('pricing.status')"
            :value="user!.subscription.status"
          />
        </div>
      </div>

      <div class="flex flex-col space-y-6">
        <h3 class="text-xl font-bold text-black">{{ $t("cars.title") }}</h3>
        <div v-if="user!.cars.length === 0" class="text-gray-500">
          {{ $t("cars.no_cars") }}
        </div>
        <div v-else class="flex flex-col gap-4">
          <div
            v-for="car in user!.cars"
            :key="car.id"
            class="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm space-y-2"
          >
            <Stat :label="$t('cars.number')" :value="car.numbers" />
            <Stat :label="$t('cars.brand')" :value="car.brand" />
            <Stat :label="$t('cars.model')" :value="car.model" />
            <Stat :label="$t('cars.year')" :value="car.year" />
            <Stat :label="$t('cars.color')" :value="car.color" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DEFAULT_AVATAR } from "@/constants";
import { formatDate } from "@/utils/formatDate";
import Stat from "../components/Stat.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";

const { user } = storeToRefs(useAuthStore());
</script>
