import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    timeout: 60000,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:4321/devendevenir',
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,

    },
    projects: [
        { name: 'chrome-desktop', use: { browserName: 'chromium' } },
        { name: 'firefox-desktop', use: { browserName: 'firefox' } },
        { name: 'webkit-desktop', use: { browserName: 'webkit' } },
        { name: 'iPhone12', use: { ...devices['iPhone 12'] } },
        { name: 'Pixel5', use: { ...devices['Pixel 5'] } },
        { name: 'iPad', use: { ...devices['iPad (gen 7)'] } },
    ],
});