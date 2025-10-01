<template>
  <div
    class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow"
  >
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <span class="text-base font-medium text-gray-900">
          {{ booking.parking.name }}
        </span>
        <span class="text-sm text-gray-500">
          {{ booking.parking.address }}
        </span>
      </div>

      <span class="text-sm font-semibold">
        {{
          booking.status === "active"
            ? $t("status.active")
            : $t("status.completed")
        }}
      </span>
    </div>

    <div class="text-sm text-gray-700">
      {{ formatDate(booking.date) }} | {{ booking.start }} –
      {{ booking.end }}
    </div>

    <div class="text-sm text-gray-700">
      {{ $t("common.car") }}:
      <span class="font-medium">
        {{ booking.car.brand }} {{ booking.car.model }}
      </span>
    </div>

    <div v-if="booking.status === 'active'" class="flex justify-end">
      <BaseButton
        mode="Primary"
        :text="$t('buttons.show_on_map')"
        size="Small"
        icon="location-dot"
        :onClick="() => emit('showParkingOnMap', booking.parking)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Parking } from "@/types";
import type { Booking } from "../types";
import { formatDate } from "@/utils/date/formatDate";
import BaseButton from "@/components/Base/BaseButton.vue";

interface Props {
  booking: Booking;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "showParkingOnMap", parking: Parking): void;
}>();
</script>
