import { type Page, expect } from '@playwright/test';

export class AnalyticsFunnel {
  constructor(private readonly page: Page) {}

  async step1_clickHeroButton() {
    // Clear storage to ensure fresh GrowthBook session ID for each test run
    await this.page.context().clearCookies();
    await this.page.goto('/');
    await this.page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    // Reload to initialize new GrowthBook session with cleared storage
    await this.page.reload();

    await this.page
      .getByRole('button', { name: /View Product|Explore Features/ })
      .first()
      .click();
    await expect(this.page).toHaveURL('/product');
  }

  async step2_addToCart() {
    await this.step1_clickHeroButton();
    await this.page.getByRole('button', { name: 'Add to Cart' }).click();
    await expect(this.page).toHaveURL('/cart');
  }

  async step3_proceedToCheckout() {
    await this.step2_addToCart();
    await this.page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    await expect(this.page).toHaveURL('/checkout');
  }

  async step4_completePurchase() {
    await this.step3_proceedToCheckout();

    await this.page.locator('#email').fill('test@example.com');
    await this.page.locator('#card').fill('4242 4242 4242 4242');
    await this.page.locator('#expiry').fill('12/25');
    await this.page.locator('#cvc').fill('123');

    this.page.once('dialog', (dialog) => dialog.accept());

    await this.page.getByRole('button', { name: 'Complete Purchase' }).click();
    await this.page.waitForURL('/');
  }
}
