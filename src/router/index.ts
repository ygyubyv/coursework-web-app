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
    const { initAuth, getUser } = authStore;
    const { isAuthenticated, isInitialized, user } = storeToRefs(authStore);

    isLoading.value = true;

    if (!isInitialized.value) {
      await initAuth();
    }

    if (to.meta.requiresAuth && (!isAuthenticated.value || !user.value)) {
      await getUser();

      if (!user.value) {
        return next({ name: "main" });
      }
    }

    next();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});

export default router;
