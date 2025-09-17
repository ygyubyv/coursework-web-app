<template>
  <div class="flex items-center justify-center pt-10 md:py-20">
    <div class="w-full max-w-md bg-white rounded-xl md:shadow-lg p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-black">Have Questions?</h1>
        <p class="text-gray-500 mt-2 text-sm">
          Fill out the form and we'll get back to you within 2 hours.
        </p>
      </div>
      <form
        @submit.prevent="onSubmit"
        class="flex flex-col items-center space-y-4"
      >
        <BaseInput
          id="name"
          v-model="form.name"
          placeholder="Name"
          type="text"
        />
        <BaseInput
          id="email"
          v-model="form.email"
          placeholder="Email"
          type="email"
        />
        <BaseTextarea
          id="message"
          name="message"
          placeholder="How can we help?"
          :rows="3"
          v-model="form.message"
        />
        <div class="flex gap-2.5 self-end">
          <BaseButton
            text="Clear"
            :onClick="onClear"
            mode="Secondary"
            icon="eraser"
          />
          <BaseButton
            type="submit"
            text="Send"
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

useHead({
  title: "Virodip",
  titleTemplate: "%s | Contact",
  meta: [
    {
      name: "description",
      content:
        "Contact Virodip for support or inquiries. Fill out the form and our team will get back to you promptly regarding our smart parking service.",
    },
    {
      name: "keywords",
      content:
        "smart parking, contact, support, inquiries, parking app, parking service, real-time parking",
    },
    {
      property: "og:title",
      content: "Contact Virodip — Smart Parking Service",
    },
    {
      property: "og:description",
      content:
        "Contact Virodip for support or inquiries. Fill out the form and our team will get back to you promptly regarding our smart parking service.",
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
</script>
