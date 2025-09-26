import "./assets/styles/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue/client";

import App from "./App.vue";
import router from "./router";

import { myMSALObj } from "@/azure/msalConfig.ts";
import { i18n } from "./i18n.ts";

import { FontAwesomeIcon } from "./plugins/fontAwesome";

(async () => {
  await myMSALObj.initialize();

  const app = createApp(App);
  const pinia = createPinia();
  const head = createHead();

  app.component("font-awesome-icon", FontAwesomeIcon);

  app.use(pinia);
  app.use(router);
  app.use(head);
  app.use(i18n);

  app.mount("#app");
})();
