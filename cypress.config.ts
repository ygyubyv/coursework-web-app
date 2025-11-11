import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    projectId: "bq916w",
    baseUrl: "http://localhost:4173",
    setupNodeEvents(on, config) {},
  },
});
