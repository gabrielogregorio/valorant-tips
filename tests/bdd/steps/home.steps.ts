import { expect } from '@playwright/test';
import { Given, Then } from './fixtures';

Given('I open the home page', async ({ page }) => {
  await page.goto('/');
});

Then('I should see the main heading {string}', async ({ page }, heading: string) => {
  await expect(page.getByRole('heading', { name: heading })).toBeVisible();
});
