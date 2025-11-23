import { createRouter, createWebHistory } from "vue-router";

import main from "@/containers/main/routes/index";
import about from "@/containers/about/routes/index";
import account from "@/containers/account/routes/index";
import book from "@/containers/book/routes/index";
import parkings from "@/containers/parkings/routes/index";
import contact from "@/containers/contact/routes/index";
import help from "@/containers/help/routes/index";
import faq from "@/containers/faq/routes/index";
import users from "@/containers/users/routes/index";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

export const isLoading = ref(false);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public
    ...main,
    ...about,
    ...contact,
    ...help,
    ...faq,

    // Public + Authenticated
    ...book,

    // Authenticated
    ...account,
    ...parkings,

    // Admin
    ...users,
  ],
});

router.beforeEach(async (to, _, next) => {
  try {
    const authStore = useAuthStore();
    const { initAuth, hasRole } = authStore;
    const { isAuthenticated, isInitialized, authModalIsVisible } =
      storeToRefs(authStore);
    const { user } = storeToRefs(useUserStore());

    isLoading.value = true;

    // Force init for protected routes
    if (to.meta.requiresAuth) {
      if (!isAuthenticated.value) {
        await initAuth();
      }

      if (isInitialized.value && !user.value) {
        authModalIsVisible.value = true;
        return next({ name: "main" });
      }
    }

    // Has role check for admin routes
    if (to.meta.requiresAdmin) {
      if (!isAuthenticated.value) {
        await initAuth();
      }

      if (isInitialized.value && (!user.value || !hasRole("admin"))) {
        return next({ name: "main" });
      }
    }

    // Optional init for public routes
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
