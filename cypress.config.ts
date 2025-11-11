import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    projectId: "bq916w",
    baseUrl: "http://localhost:5173",
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on, config) {},
  },
});
