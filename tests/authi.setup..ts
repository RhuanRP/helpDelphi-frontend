import { test as setup, expect} from "@playwright/test";

const authFile = "@playwight/test/.auth/user.json";

setup("authenticate", async ({ page }) => {
   await page.goto("/login");
    await page.locator("input[name=username]").fill("samuelfr"); 
    await page.locator("input[name=password]").fill("123");
    await page.getByText("Acessar").click();

    await page.waitForURL("/");

    await expect(page.getByText("Assunto")).toBeVisible();

    await page.context().storageState({ path: authFile });
  });