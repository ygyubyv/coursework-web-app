<template>
  <div>
    <h2 class="text-xl font-bold text-black text-center md:text-left mb-6">
      {{ $t("views.account.settings.title") }}
    </h2>

    <div
      class="flex flex-col md:flex-col-reverse lg:flex-row md:items-start gap-6"
    >
      <UserAvatar
        :avatar-url="avatarPreview || avatarUrl || DEFAULT_AVATAR"
        @on-avatar-change="emit('onAvatarChange', $event)"
      />

      <div class="flex-1 space-y-4 order-2 md:order-1">
        <div
          class="flex flex-col md:flex-row md:items-center justify-center gap-2"
        >
          <label class="w-32 text-gray-700 font-medium"
            >{{ $t("forms.fields.full_name.label") }}:</label
          >

          <BaseInput
            id="name"
            :placeholder="$t('forms.fields.full_name.placeholder')"
            class="w-full md:w-[300px] py-1.5 text-sm"
            type="text"
            v-bind="editedUser.nameAttrs.value"
            v-model="editedUser.name.value"
            :error="editedUser.errors.value.name"
          />
        </div>

        <div
          class="flex flex-col md:flex-row md:items-center justify-center gap-2"
        >
          <label class="w-32 text-gray-700 font-medium"
            >{{ $t("forms.fields.email.label") }}:</label
          >

          <BaseInput
            id="email"
            :placeholder="$t('forms.fields.email.placeholder')"
            class="w-full md:w-[300px] py-1.5 text-sm"
            type="email"
            v-bind="editedUser.emailAttrs.value"
            v-model="editedUser.email.value"
            :error="editedUser.errors.value.email"
          />
        </div>

        <div
          class="flex flex-col md:flex-row md:items-center justify-center gap-2"
        >
          <label class="w-32 text-gray-700 font-medium"
            >{{ $t("forms.fields.phone.label") }}:</label
          >

          <BaseInput
            id="phoneNumber"
            :placeholder="$t('forms.fields.phone.placeholder')"
            class="w-full md:w-[300px] py-1.5 text-sm"
            type="tel"
            v-bind="editedUser.phoneNumberAttrs.value"
            v-model="editedUser.phoneNumber.value"
            :error="editedUser.errors.value.phoneNumber"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserAvatar from "./UserAvatar.vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import { DEFAULT_AVATAR } from "@/constants";

interface Props {
  editedUser: any;
  avatarPreview: string | null;
  avatarUrl: string | null;
}

interface Emits {
  (e: "onAvatarChange", avatar: File): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
