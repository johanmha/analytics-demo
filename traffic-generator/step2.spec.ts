
import { test } from '@playwright/test';
import { AnalyticsFunnel } from './analytics-funnel';

test('Funnel: Complete steps 1-2 - Hero click → Product → Add to cart', async ({ page }) => {
  const funnel = new AnalyticsFunnel(page);
  await funnel.step2_addToCart();
});
