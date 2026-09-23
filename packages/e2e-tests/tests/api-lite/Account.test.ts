import { expect, test } from '@playwright/test';
import { goToLatestBlock } from './helpers';

test.describe('Account page (api-lite)', () => {
  test('shows the address for a block producer', async ({ page }) => {
    await goToLatestBlock(page);

    const producerLink = page.locator('a[href^="/account/"]').first();
    await expect(producerLink).toBeVisible();
    const href = await producerLink.getAttribute('href');
    const address = href?.match(/^\/account\/([^/]+)/)?.[1];
    expect(address).toBeTruthy();

    await producerLink.click();
    await expect(page).toHaveURL(new RegExp(`/account/${address}/assets$`));
    await expect(
      page.getByRole('heading', { level: 1, name: /Account/ }),
    ).toBeVisible();
    // The full address is rendered (hidden on mobile widths, present in the
    // DOM regardless), so check the page source rather than visibility.
    expect((await page.content()).toLowerCase()).toContain(
      address?.toLowerCase(),
    );
  });
});
