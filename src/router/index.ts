import { createRouter, createWebHistory } from "vue-router";

import main from "@/containers/main/routes/index";
import about from "@/containers/about/routes/index";
import account from "@/containers/account/routes/index";
import book from "@/containers/book/routes/index";
import parkings from "@/containers/parkings/routes/index";
import contact from "@/containers/contact/routes/index";
import help from "@/containers/help/routes/index";
import faq from "@/containers/faq/routes/index";

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

export default router;
