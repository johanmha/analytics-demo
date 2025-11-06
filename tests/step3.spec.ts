
import { test } from '@playwright/test';
import { AnalyticsFunnel } from './analytics-funnel';

test('Funnel: Complete steps 1-3 - Hero click → Product → Cart → Checkout page', async ({ page }) => {
  const funnel = new AnalyticsFunnel(page);
  await funnel.step3_proceedToCheckout();
});
