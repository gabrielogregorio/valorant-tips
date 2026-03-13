import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Home Page Accessibility & SSR Integration', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }, testInfo) => {
    await page.goto('/');

    await page.waitForSelector('text=Fracture');
    await page.waitForSelector('text=Icebox');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await page.screenshot({ path: `e2e-screenshots/home-accessibility-${testInfo.project.name}.png`, fullPage: true });

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
