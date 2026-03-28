import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test("homepage loads and has navbar", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav[aria-label='Ana gezinme']");
    await expect(nav).toBeVisible();
  });

  test("navbar links are visible on desktop", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /projeler/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /blog/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /ben kimim/i })).toBeVisible();
  });

  test("navigate to projects page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /projeler/i }).first().click();
    await expect(page).toHaveURL(/\/projeler/);
  });

  test("navigate to blog page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /blog/i }).first().click();
    await expect(page).toHaveURL(/\/weblog/);
  });
});

test.describe("theme toggle", () => {
  test("theme toggle button exists", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /tema/i });
    await expect(toggle.first()).toBeVisible();
  });

  test("clicking theme toggle changes theme", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");

    // Default is dark
    await expect(html).toHaveClass(/dark/);

    // Click to switch to light
    const toggle = page.getByRole("button", { name: /tema/i }).first();
    await toggle.click();

    // Should no longer have dark class
    await expect(html).not.toHaveClass(/dark/);
  });
});

test.describe("accessibility", () => {
  test("skip to content link exists", async ({ page }) => {
    await page.goto("/");
    const skip = page.locator("a.skip-to-content");
    await expect(skip).toHaveCount(1);
  });

  test("page has main landmark", async ({ page }) => {
    await page.goto("/projeler");
    const main = page.locator("main#main-content");
    await expect(main).toBeVisible();
  });
});
