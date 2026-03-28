# Test Setup Specification

> Otomatik testler: build, lint, type check, a11y, e2e, lighthouse.

---

## Test Pyramid

```
        ┌──────────┐
        │  E2E     │  ← Playwright (critical flows)
        │  Tests   │
       ┌┴──────────┴┐
       │ Integration │  ← API route tests, form submissions
       │   Tests     │
      ┌┴─────────────┴┐
      │   Unit Tests   │  ← Utility functions, helpers
      │                │
     ┌┴────────────────┴┐
     │  Static Analysis  │  ← ESLint, TypeScript, Prettier
     └──────────────────┘
```

---

## Static Analysis (ALWAYS — Zero Config)

### package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest",
    "test:e2e": "playwright test",
    "test:a11y": "playwright test --project=a11y",
    "quality": "npm run lint && npm run type-check && npm run build"
  }
}
```

### ESLint Config (with a11y)
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:jsx-a11y/recommended"
  ],
  "plugins": ["jsx-a11y"],
  "rules": {
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/click-events-have-key-events": "error",
    "jsx-a11y/label-has-associated-control": "error",
    "jsx-a11y/no-static-element-interactions": "error"
  }
}
```

---

## E2E Tests (Playwright)

### Setup
```bash
npm install -D @playwright/test @axe-core/playwright
npx playwright install
```

### Config
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 14'] } },
    { name: 'a11y', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run build && npm start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

### Critical Flow Tests
```typescript
// tests/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Site Adi/);
  await expect(page.locator('h1')).toBeVisible();
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('nav >> text=Hakkimizda');
  await expect(page).toHaveURL(/hakkimizda/);
  await expect(page.locator('h1')).toBeVisible();
});

test('contact form submits', async ({ page }) => {
  await page.goto('/iletisim');
  await page.fill('[name="name"]', 'Test Kullanici');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="message"]', 'Test mesaji');
  await page.click('button[type="submit"]');
  await expect(page.locator('[role="status"]')).toContainText(/basari/i);
});

test('theme toggle works', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  await page.click('[aria-label="Tema degistir"]');
  await expect(html).toHaveClass(/dark/);
  await page.click('[aria-label="Tema degistir"]');
  await expect(html).not.toHaveClass(/dark/);
});

test('cookie banner appears and works', async ({ page, context }) => {
  await context.clearCookies();
  await page.goto('/');
  const banner = page.locator('[role="dialog"][aria-label*="erez"]');
  await expect(banner).toBeVisible();

  // Reject all
  await page.click('text=Tumunu Reddet');
  await expect(banner).not.toBeVisible();

  // Reload — banner should NOT appear
  await page.reload();
  await expect(banner).not.toBeVisible();
});

test('mobile menu works', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.click('[aria-label="Menu"]');
  await expect(page.locator('nav >> text=Hakkimizda')).toBeVisible();
});
```

### Accessibility Tests
```typescript
// tests/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/hakkimizda', name: 'About' },
  { path: '/iletisim', name: 'Contact' },
  { path: '/sss', name: 'FAQ' },
  { path: '/blog', name: 'Blog' },
  { path: '/gizlilik', name: 'Privacy' },
];

for (const { path, name } of pages) {
  test(`a11y: ${name} (${path})`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .exclude('.cookie-banner') // exclude dynamic banner
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test(`a11y: ${name} dark mode`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}

test('keyboard navigation', async ({ page }) => {
  await page.goto('/');

  // Skip nav link
  await page.keyboard.press('Tab');
  const skipLink = page.locator(':focus');
  await expect(skipLink).toHaveText(/skip|atla|icerige/i);

  // Tab through nav items
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
});
```

---

## Unit Tests (Vitest)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
});

// tests/setup.ts
import '@testing-library/jest-dom/vitest';
```

```typescript
// tests/unit/seo.test.ts
import { describe, it, expect } from 'vitest';
import { generatePageMetadata } from '@/lib/seo/metadata';

describe('generatePageMetadata', () => {
  it('creates correct title format', () => {
    const meta = generatePageMetadata({
      title: 'Hakkimizda',
      description: 'Test desc',
      path: '/hakkimizda',
    });
    expect(meta.title).toBe('Hakkimizda — Site Adi');
  });

  it('includes canonical URL', () => {
    const meta = generatePageMetadata({
      title: 'Test',
      description: 'Test',
      path: '/test',
    });
    expect(meta.alternates?.canonical).toBe('https://site.com/test');
  });
});
```

---

## File Structure

```
tests/
├── e2e/
│   ├── navigation.spec.ts     → Critical flow tests
│   ├── forms.spec.ts          → Form submission tests
│   ├── cookie-consent.spec.ts → Consent flow tests
│   └── blog.spec.ts           → Blog navigation tests
├── a11y/
│   └── a11y.spec.ts           → Accessibility audits per page
├── unit/
│   ├── seo.test.ts            → SEO utility tests
│   ├── consent.test.ts        → Consent logic tests
│   └── blog.test.ts           → Blog utility tests
├── setup.ts                   → Test setup
playwright.config.ts           → Playwright config
vitest.config.ts              → Vitest config
```
