
import { test } from '@playwright/test';
import { AnalyticsFunnel } from './analytics-funnel';

test('Funnel: Complete steps 1-4 - Full journey ending with purchase confirmation', async ({ page }) => {
  const funnel = new AnalyticsFunnel(page);
  await funnel.step4_completePurchase();
});
