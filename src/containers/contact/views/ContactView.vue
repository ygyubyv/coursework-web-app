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
        class="flex flex-col items-center space-y-4"
      >
        <BaseInput
          id="name"
          v-model="form.name"
          :placeholder="$t('forms.fields.full_name.placeholder')"
          type="text"
        />
        <BaseInput
          id="email"
          v-model="form.email"
          :placeholder="$t('forms.fields.email.placeholder')"
          type="email"
        />
        <BaseTextarea
          id="message"
          name="message"
          :placeholder="$t('forms.fields.message.placeholder')"
          :rows="3"
          v-model="form.message"
        />
        <div class="flex gap-2.5 self-end">
          <BaseButton
            :text="$t('buttons.clear')"
            :onClick="onClear"
            mode="Secondary"
            icon="eraser"
          />
          <BaseButton
            type="submit"
            :text="$t('buttons.send')"
            mode="Primary"
            icon="paper-plane"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseButton from "@/components/Base/BaseButton.vue";
import BaseInput from "@/components/Base/BaseInput.vue";
import BaseTextarea from "@/components/Base/BaseTextarea.vue";
import { reactive } from "vue";
import { useHead } from "@unhead/vue";
import { APP_URL } from "@/config";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const onSubmit = () => {
  console.log("Submit");
};

const onClear = () => {
  form.name = "";
  form.email = "";
  form.message = "";
};

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
