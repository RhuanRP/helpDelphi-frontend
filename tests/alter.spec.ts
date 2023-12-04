import { test, expect } from "@playwright/test";

test.describe("alter status tests", () => {
  test("should change status", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("open-modal").first().click();

    await page
      .locator("select[name=status]")
      .selectOption({ label: "Em andamento" });

    await page.locator("button:has-text('Salvar')").click();

    await page.waitForLoadState("domcontentloaded");

    const secondRowStatus = await page
      .locator("table tr:nth-child(1) td")
      .nth(5)
      .textContent();

    expect(secondRowStatus).toBe("Em Andamento");
  });
});
