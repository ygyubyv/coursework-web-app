import "./assets/styles/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue/client";

import App from "./App.vue";
import router from "./router";

import { myMSALObj } from "@/azure/msalConfig.ts";

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

  app.mount("#app");
})();
