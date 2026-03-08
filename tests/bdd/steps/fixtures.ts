import { test as base, createBdd } from 'playwright-bdd';

export const test = base.extend({
  // Add custom fixtures here
});

export const { Given, When, Then } = createBdd(test);
