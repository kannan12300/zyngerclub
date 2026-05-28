import { expect, test, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const viewports = [
  { name: "mobile-normal", width: 390, height: 844, mobile: true },
  { name: "tablet", width: 768, height: 1024, mobile: false },
  { name: "laptop", width: 1366, height: 768, mobile: false }
];

const screenshotDir = path.join(process.cwd(), "test-results", "responsive");

test.describe("responsive layout", () => {
  test.beforeAll(() => {
    fs.mkdirSync(screenshotDir, { recursive: true });
  });

  for (const viewport of viewports) {
    test(`${viewport.name} has no horizontal overflow`, async ({ page }) => {
      test.setTimeout(15_000);
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/", { waitUntil: "domcontentloaded", timeout: 10_000 });
      await page.waitForTimeout(500);
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("#home")).toBeVisible();
      await expect(page.locator("#menu")).toBeVisible();

      const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      expect(background).not.toBe("rgb(255, 255, 255)");
      expect(background).not.toBe("rgb(255, 247, 237)");
      const darkBody = await page.evaluate(() => {
        const color = getComputedStyle(document.body).backgroundColor.match(/\d+/g)?.map(Number) ?? [];
        return color.length >= 3 && color[0] < 40 && color[1] < 30 && color[2] < 25;
      });
      expect(darkBody).toBeTruthy();

      if (viewport.width === 1366) {
        const heroBox = await page.locator("#home").boundingBox();
        expect(heroBox?.height ?? 9999).toBeLessThanOrEqual(520);
      }

      const offenders = await getOverflowOffenders(page);
      if (offenders.length > 0) {
        console.log(`${viewport.name} overflow offenders`, JSON.stringify(offenders, null, 2));
      }

      await page.screenshot({
        path: path.join(
          screenshotDir,
          viewport.name === "mobile-normal" ? "mobile-dark.png" : viewport.name === "laptop" ? "laptop-dark.png" : `${viewport.name}.png`
        ),
        fullPage: true,
        timeout: 10_000
      });

      const metrics = await page.evaluate(() => ({
        innerWidth: window.innerWidth,
        bodyScrollWidth: document.body.scrollWidth,
        documentScrollWidth: document.documentElement.scrollWidth,
        mainRight: document.querySelector("main")?.getBoundingClientRect().right ?? 0
      }));

      expect(metrics.bodyScrollWidth).toBeLessThanOrEqual(metrics.innerWidth);
      expect(metrics.documentScrollWidth).toBeLessThanOrEqual(metrics.innerWidth);
      expect(metrics.mainRight).toBeLessThanOrEqual(metrics.innerWidth + 1);

      const primaryButtons = page.locator("a, button").filter({ hasText: /Menu|Order|Cart|Checkout|WhatsApp|Pay|Call|Maps|Zomato/i });
      const buttonCount = await primaryButtons.count();
      expect(buttonCount).toBeGreaterThan(0);
      for (let i = 0; i < Math.min(buttonCount, 18); i += 1) {
        const text = (await primaryButtons.nth(i).innerText()).trim();
        expect(text.length).toBeGreaterThan(0);
      }

      if (viewport.width < 768) {
        const hamburger = page.getByRole("button", { name: /toggle navigation menu/i });
        await expect(hamburger).toBeVisible();
        await hamburger.click();
        const panel = page.getByTestId("mobile-nav-panel");
        await expect(panel).toBeVisible();
        await expect(panel.getByRole("link", { name: "Home" })).toBeVisible();
        await expect(panel.getByRole("link", { name: "Menu" })).toBeVisible();
        await expect(panel.getByRole("link", { name: "Offers" })).toBeVisible();
        await expect(panel.getByRole("link", { name: "About" })).toBeVisible();
        await expect(panel.getByRole("link", { name: "Gallery" })).toBeVisible();
        await expect(panel.getByRole("link", { name: "Contact" })).toBeVisible();
        await expect(panel.getByRole("link", { name: "Order Now" })).toBeVisible();
        await expect(panel.getByRole("link", { name: "WhatsApp" })).toBeVisible();
        const panelBox = await panel.boundingBox();
        expect(panelBox?.width ?? 9999).toBeLessThanOrEqual(340);
        await page.screenshot({
          path: path.join(screenshotDir, "mobile-dark.png"),
          fullPage: true,
          timeout: 10_000
        });
        await page.mouse.click(12, viewport.height - 12);
        await expect(panel).toBeHidden();
        await hamburger.click();
        await expect(panel).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(panel).toBeHidden();
      } else {
        await expect(page.locator("nav").getByRole("link", { name: "Menu" }).first()).toBeVisible();
        await expect(page.getByRole("button", { name: /toggle navigation menu/i })).toBeHidden();
      }
    });
  }
});

async function getOverflowOffenders(page: Page) {
  return page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const isInsideHorizontalScroller = (el: Element) => {
      let current = el.parentElement;
      while (current && current !== document.body) {
        const style = window.getComputedStyle(current);
        const scrolls = /(auto|scroll)/.test(style.overflowX) && current.scrollWidth > current.clientWidth + 1;
        if (scrolls) return true;
        current = current.parentElement;
      }
      return false;
    };

    return [...document.querySelectorAll("*")]
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const isFixedOverlay = style.position === "fixed" && rect.left < 0 && rect.right > viewportWidth;
        if (isFixedOverlay) return false;
        if (el.classList.contains("sr-only") || el.classList.contains("truncate")) return false;
        if (/(auto|scroll)/.test(style.overflowX) && el.scrollWidth > el.clientWidth + 1) return false;
        if (isInsideHorizontalScroller(el)) return false;
        return el.scrollWidth > el.clientWidth + 1 || rect.right > viewportWidth + 1 || rect.left < -1;
      })
      .slice(0, 25)
      .map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          className: typeof el.className === "string" ? el.className : String(el.className),
          text: el.textContent?.replace(/\s+/g, " ").trim().slice(0, 80),
          width: el.scrollWidth,
          clientWidth: el.clientWidth,
          left: Math.round(rect.left),
          right: Math.round(rect.right)
        };
      });
  });
}
