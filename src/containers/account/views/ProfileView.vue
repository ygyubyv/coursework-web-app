<template>
  <section class="py-6" data-cy="account-profile">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 space-y-6">
      <h2 class="text-xl font-bold text-black">
        {{ $t("views.account.profile.title") }}
      </h2>

      <div class="flex flex-col md:flex-row md:items-start gap-6">
        <div class="flex-1 space-y-4 order-2 md:order-1">
          <Stat
            data-cy="stat-full-name"
            :label="$t('common.full_name')"
            :value="user!.name"
          />
          <Stat
            data-cy="stat-email"
            :label="$t('common.email')"
            :value="user!.email"
          />
          <Stat
            v-if="user!.phoneNumber"
            :label="$t('common.phone')"
            :value="user!.phoneNumber"
            data-cy="stat-phone"
          />
          <Stat
            data-cy="stat-joined"
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

      <div class="flex flex-col space-y-4">
        <h3 class="text-xl font-bold text-black" data-cy="subscription-title">
          {{ $t("pricing.current_plan") }}
        </h3>
        <div class="flex flex-col gap-4" v-if="user!.subscription">
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

        <div v-else>
          <p>{{ $t("pricing.no_plan") }}</p>
        </div>
      </div>

      <div class="flex flex-col space-y-6">
        <h3 class="text-xl font-bold text-black">{{ $t("cars.title") }}</h3>
        <div v-if="user!.cars && user!.cars.length === 0" class="text-gray-500">
          {{ $t("cars.no_cars") }}
        </div>
        <div v-else class="flex flex-col gap-4">
          <div
            v-for="car in user!.cars"
            :key="car.id"
            class="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm space-y-2"
            data-cy="car-item"
          >
            <Stat :label="$t('common.number')" :value="car.number" />
            <Stat :label="$t('common.brand')" :value="car.brand" />
            <Stat :label="$t('common.model')" :value="car.model" />
            <Stat :label="$t('common.color')" :value="car.color" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DEFAULT_AVATAR } from "@/constants";
import { formatDate } from "@/utils";
import Stat from "../components/Stat.vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

const userStore = useUserStore();

const { setUserCars, setUserSubscriptions } = userStore;
const { user } = storeToRefs(userStore);

onMounted(() => {
  setUserCars();
  // setUserSubscriptions();
});
</script>
