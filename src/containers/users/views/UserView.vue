<template>
  <div class="max-w-5xl mx-auto p-6" v-if="user && !isLoading">
    <ProfileHeader :user="user" />

    <Divider />

    <ProfileData :user="user" />
  </div>

  <div
    v-if="isLoading"
    class="w-full h-[70vh] flex items-center justify-center"
  >
    <BaseSpinner mode="Black-spinner" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import BaseSpinner from "@/components/Base/BaseSpinner.vue";
import { useUserDetails } from "../composables/details/useUserDetails";
import ProfileHeader from "../components/details/ProfileHeader.vue";
import Divider from "../components/details/Divider.vue";
import ProfileData from "../components/details/ProfileData.vue";

const route = useRoute();
const userId = route.params.id as string;

const { user, isLoading } = useUserDetails(userId);
</script>
