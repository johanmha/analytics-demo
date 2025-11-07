
import { test } from '@playwright/test';
import { AnalyticsFunnel } from './analytics-funnel';

test('Funnel: Complete step 1 - Click hero button and reach product page', async ({ page }) => {
  const funnel = new AnalyticsFunnel(page);
  await funnel.step1_clickHeroButton();
});
