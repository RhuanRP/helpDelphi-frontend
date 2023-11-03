import { test, expect } from "@playwright/test";

test.describe("tickets tests", () => {
  test("should list tickets", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("table")).toBeVisible();
    await expect(page.locator("td").first()).toBeVisible();
    const pageTd = await page.locator("td").count();

    expect(pageTd).toBeGreaterThan(5);
  });

  test("should open modal", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("open-modal").first().click();

    await expect(page.locator("input[name=client]")).toBeVisible();
    await expect(page.locator("select[name=status]")).toBeVisible();
    await expect(page.locator("input[name=subject]")).toBeVisible();
    await expect(page.locator("select[name=criticality]")).toBeVisible();
    await expect(page.locator("textarea[name=description]")).toBeVisible();
    await expect(page.getByText("Histórico de Ações")).toBeVisible();
  });
});
