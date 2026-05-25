import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 15_000,
  webServer: process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? undefined
    : {
        command: "npm run start",
        url: "http://localhost:3000",
        reuseExistingServer: true,
        timeout: 120_000
      },
  expect: {
    timeout: 5_000
  },
  use: {
    baseURL: "http://localhost:3000",
    navigationTimeout: 10_000,
    actionTimeout: 5_000,
    trace: "retain-on-failure"
  }
});
