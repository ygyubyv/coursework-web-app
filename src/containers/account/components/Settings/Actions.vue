<template>
  <div class="flex flex-col sm:flex-row gap-3 sm:justify-end">
    <BaseButton
      :text="$t('buttons.cancel')"
      icon="xmark"
      mode="Secondary"
      class="w-full sm:w-auto"
      v-if="hasChanges"
      :onClick="() => emit('cancel')"
    />

    <BaseButton
      :text="$t('buttons.add_car')"
      icon="plus"
      mode="Primary"
      :onClick="() => emit('addCar')"
    />

    <BaseButton
      :text="$t('buttons.save_changes')"
      icon="save"
      class="w-full sm:w-auto"
      :disabled="!hasChanges"
      :onClick="() => emit('saveProfile')"
    />

    <BaseButton
      :text="$t('buttons.delete_account')"
      mode="Danger"
      icon="trash"
      :onClick="() => emit('deleteAccount')"
    />
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/components/Base/BaseButton.vue";

interface Props {
  hasChanges: boolean;
}

defineProps<Props>();
const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "addCar"): void;
  (e: "saveProfile"): void;
  (e: "deleteAccount"): void;
}>();
</script>
