import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321/devendevenir',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Chrome',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'Safari',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'iPhone 14',
      use: { ...devices['iPhone 14'] },
    },

    {
      name: 'Pixel 7',
      use: { ...devices['Pixel 7'] },
    },

    {
      name: 'Galaxy S23',
      use: { ...devices['Galaxy S23 Ultra'] },
    },
  ],
});
