import { expect, test } from '@playwright/test';

// Smoke suite for the explorer pages served by api-lite (packages/api-lite)
// in RPC mode against the local fuel-core node. Unlike the bridge e2e suite,
// this never depends on a transaction being submitted: the local chain
// produces blocks continuously (docker/fuel-core's `--poa-interval-period
// 1sec`), so the home page always has real blocks and a mint transaction to
// assert against.

test.describe('Home page (api-lite)', () => {
  test('shows the latest block and the blocks/transactions lists', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page.getByText('Recent Blocks')).toBeVisible();
    const blockLink = page.locator('a[href^="/block/"]').first();
    await expect(blockLink).toBeVisible();
    const href = await blockLink.getAttribute('href');
    const height = Number(href?.match(/^\/block\/(\d+)\/simple$/)?.[1]);
    expect(height).toBeGreaterThan(0);

    await expect(
      page.getByRole('heading', { level: 1, name: 'Recent Transactions' }),
    ).toBeVisible();
    await expect(page.locator('a[href^="/tx/"]').first()).toBeVisible();
  });
});
