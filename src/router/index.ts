import { createRouter, createWebHistory } from "vue-router";

import main from "@/containers/main/routes/index";
import about from "@/containers/about/routes/index";
import account from "@/containers/account/routes/index";
import book from "@/containers/book/routes/index";
import parkings from "@/containers/parkings/routes/index";
import contact from "@/containers/contact/routes/index";
import help from "@/containers/help/routes/index";
import faq from "@/containers/faq/routes/index";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

export const isLoading = ref(false);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...main,
    ...about,
    ...account,
    ...book,
    ...parkings,
    ...contact,
    ...help,
    ...faq,
  ],
});

router.beforeEach(async (to, _, next) => {
  try {
    const authStore = useAuthStore();
    const { initAuth } = authStore;
    const { isAuthenticated, isInitialized, authModalIsVisible } =
      storeToRefs(authStore);
    const { user } = storeToRefs(useUserStore());

    isLoading.value = true;

    if (to.meta.requiresAuth) {
      if (!isAuthenticated.value) {
        await initAuth();
      }

      if (isInitialized.value && !user.value) {
        authModalIsVisible.value = true;
        return next({ name: "main" });
      }
    }

    if (!isInitialized.value) {
      initAuth();
    }

    next();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});

export default router;
