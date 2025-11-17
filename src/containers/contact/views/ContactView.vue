<template>
  <div class="flex items-center justify-center pt-10 md:py-20">
    <div class="w-full max-w-md bg-white rounded-xl md:shadow-lg p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-black">
          {{ $t("views.contact.title") }}
        </h1>
        <p class="text-gray-500 mt-2 text-sm">
          {{ $t("views.contact.description") }}
        </p>
      </div>
      <form
        @submit.prevent="onSubmit"
        data-cy="contact-form"
        class="flex flex-col items-center space-y-4"
      >
        <BaseInput
          id="name"
          v-model="fullName"
          v-bind="fullNameAttrs"
          :placeholder="$t('forms.fields.full_name.placeholder')"
          :error="errors.fullName"
          data-cy="contact-name"
          type="text"
        />

        <BaseInput
          id="email"
          v-model="email"
          v-bind="emailAttrs"
          :placeholder="$t('forms.fields.email.placeholder')"
          :error="errors.email"
          data-cy="contact-email"
          type="email"
        />

        <BaseTextarea
          id="message"
          name="message"
          :placeholder="$t('forms.fields.message.placeholder')"
          :rows="3"
          :error="errors.message"
          v-model="message"
          v-bind="messageAttrs"
          data-cy="contact-message"
        />

        <div class="flex gap-2.5 self-end">
          <BaseButton
            :text="$t('buttons.clear')"
            :onClick="resetForm"
            mode="Secondary"
            icon="eraser"
          />
          <BaseButton
            type="submit"
            :text="$t('buttons.send')"
            :disabled="!meta.valid"
            mode="Primary"
            icon="paper-plane"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";
import { useI18n } from "vue-i18n";
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import BaseTextarea from "@/components/Base/BaseTextarea.vue";
import { useValidateContactForm } from "../composables/useValidateContactForm";

const { t } = useI18n();
const {
  meta,
  errors,
  fullName,
  fullNameAttrs,
  email,
  emailAttrs,
  message,
  messageAttrs,
  handleSubmit,
  resetForm,
} = useValidateContactForm();

const onSubmit = handleSubmit((values) => {
  console.log(values);
});

useHead({
  title: t("seo.contact.head.title"),
  titleTemplate: `%s | ${t("seo.contact.head.titleTemplate")}`,
  meta: [
    {
      name: "description",
      content: t("seo.contact.head.description", {
        appName: t("common.project_name"),
      }),
    },
    {
      name: "keywords",
      content: t("seo.contact.head.keywords"),
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: t("seo.contact.head.ogTitle", {
        appName: t("common.project_name"),
      }),
    },
    {
      property: "og:description",
      content: t("seo.contact.head.ogDescription", {
        appName: t("common.project_name"),
      }),
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${APP_URL}/contact`,
    },
  ],
});
</script>
