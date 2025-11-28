<template>
  <BaseSlideModal v-if="modalIsVisible" @onClose="onClose">
    <template #header>
      <h2 class="text-xl font-bold">
        {{ $t("modals.update_user.title") }}
      </h2>
    </template>

    <template #default>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <!-- Name -->
          <label for="name" class="text-gray-700 font-medium">
            {{ $t("forms.fields.full_name.label") }}
          </label>

          <BaseInput
            id="name"
            :placeholder="$t('forms.fields.full_name.placeholder')"
            type="text"
            size="Medium"
            v-bind="nameAttrs"
            v-model="name"
            :error="errors.name"
            class="w-full"
          />
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-1">
          <label for="email" class="text-gray-700 font-medium">
            {{ $t("forms.fields.email.label") }}
          </label>

          <BaseInput
            id="email"
            :placeholder="$t('forms.fields.email.placeholder')"
            type="email"
            size="Medium"
            v-bind="emailAttrs"
            v-model="email"
            :error="errors.email"
            class="w-full"
          />
        </div>

        <!-- Phone -->
        <div class="flex flex-col gap-1">
          <label for="phone" class="text-gray-700 font-medium">
            {{ $t("forms.fields.phone.label") }}
          </label>

          <BaseInput
            id="phone"
            :placeholder="$t('forms.fields.phone.placeholder')"
            type="tel"
            size="Medium"
            v-bind="phoneNumberAttrs"
            v-model="phoneNumber"
            :error="errors.phoneNumber"
            class="w-full"
          />
        </div>

        <!-- Roles -->
        <div class="flex flex-col gap-1">
          <label class="text-gray-700 font-medium">
            {{ $t("forms.fields.roles.label") }}
          </label>

          <div class="flex flex-col gap-2 mt-1">
            <BaseCheckbox
              v-for="role in roleOptions"
              :key="role.value"
              :name="role.label"
              :input-value="role.value"
              v-model="roles"
              :checked="initialValues.roles.includes(role.value)"
              :disabled="role.value === 'user' || role.value === 'owner'"
            />
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-3 justify-end">
        <!-- Close -->
        <BaseButton
          icon="xmark"
          :text="$t('buttons.cancel')"
          mode="Secondary"
          size="Medium"
          @click="onClose"
        />

        <!-- Submit -->
        <BaseButton
          size="Medium"
          icon="save"
          :disabled="!meta.valid"
          :text="$t('buttons.submit')"
          :onClick="onSubmit"
        />
      </div>
    </template>
  </BaseSlideModal>
</template>

<script setup lang="ts">
import BaseSlideModal from "@/components/Base/BaseSlideModal.vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import BaseButton from "@/components/Base/BaseButton.vue";
import { useValidateUser } from "@/containers/users/composables/details/validation/useValidateUser";
import type { User, UserSummary } from "@/types";
import { watch } from "vue";
import BaseCheckbox from "@/components/Base/BaseCheckbox.vue";

interface Props {
  modalIsVisible: boolean;
  initialValues: User;
}

interface Emits {
  (e: "update:modalIsVisible", val: boolean): void;
  (e: "submit", payload: Partial<UserSummary>): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const {
  roleOptions,
  meta,
  name,
  nameAttrs,
  email,
  emailAttrs,
  phoneNumber,
  phoneNumberAttrs,
  roles,
  errors,
  setUser,
  onClose,
  onSubmit,
} = useValidateUser({ emit });

watch(
  () => props.modalIsVisible,
  () => setUser(props.initialValues)
);
</script>
