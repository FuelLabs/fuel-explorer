import { expect, test } from '@playwright/test';

// api-lite boots without ETH_RPC_URL in this suite (see
// playwright-api-lite.config.ts), which disables its L1 poller: the
// staking/bridge routes it backs (/staking/events, /bridge/deposit/logs,
// etc.) answer 503. The Ethereum staking tab is the one built on those
// routes, so it's the interesting case: it must still render instead of
// surfacing an error toast.
const ERROR_TEXT = /something went wrong|failed to load|unexpected error/i;

test.describe('Staking page (api-lite)', () => {
  test('renders the Fuel staking tab', async ({ page }) => {
    await page.goto('/staking');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Stake' }),
    ).toBeVisible();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(ERROR_TEXT)).toHaveCount(0);
  });

  test('renders the Ethereum staking tab despite L1 being disabled', async ({
    page,
  }) => {
    await page.goto('/staking/on-ethereum');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Stake' }),
    ).toBeVisible();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(ERROR_TEXT)).toHaveCount(0);
  });
});
