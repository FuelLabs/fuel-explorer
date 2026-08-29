import { expect, test } from '@playwright/test';
import { goToLatestBlock } from './helpers';

const KNOWN_STATUSES = /Success|Failed|Pending|Squeezed Out/;

test.describe('Transaction page (api-lite)', () => {
  test('shows the tx id and status when reached from a block', async ({
    page,
  }) => {
    await goToLatestBlock(page);

    // Every Fuel block includes at least one transaction (the block's mint
    // transaction), so the block's tx list is never empty.
    const txLink = page.locator('a[href^="/tx/0x"]').first();
    await expect(txLink).toBeVisible();
    const href = await txLink.getAttribute('href');
    const txId = href?.match(/^\/tx\/(0x[0-9a-f]{64})/)?.[1];
    expect(txId).toBeTruthy();

    await txLink.click();
    await expect(page).toHaveURL(new RegExp(`/tx/${txId}/`));
    await expect(
      page.getByRole('heading', { level: 1, name: 'Transaction Details' }),
    ).toBeVisible();
    await expect(page.getByText(KNOWN_STATUSES).first()).toBeVisible();
  });
});
