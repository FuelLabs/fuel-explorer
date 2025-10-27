import { getByAriaLabel, hasText } from '../../../src/helpers/fuel-utils.js';

import { type Page, expect } from '@playwright/test';
import { test } from './fixtures';
import {
  connectToFuel,
  connectToMetamask,
  setupFuelWalletNetwork,
} from './utils/wallets';

test.describe('Bridge', () => {
  test.setTimeout(1000 * 60 * 10);
  let fuelWalletTestHelper: any;

  test.beforeEach(async ({ context, extensionId, page }) => {
    const walletSettedUp = await setupFuelWalletNetwork({
      context,
      extensionId,
      page,
    });
    fuelWalletTestHelper = walletSettedUp.fuelWalletTestHelper;
    await page.bringToFront();
    await page.goto('/bridge', { waitUntil: 'domcontentloaded' });
  });

  test('should show network switch popup when connecting with wrong network', async ({
    page,
  }) => {
    await test.step('Try to connect wallet', async () => {
      await connectToMetamask(page);
      await addNetwork(fuelWalletTestHelper.getWalletPage(), {
        providerUrl: 'https://mainnet.fuel.network/v1/graphql',
        chainId: '9889',
      });
      await test.step('Connect to Fuel', async () => {
        await connectToFuel(page, fuelWalletTestHelper, ['Account 1']);
      });
      await expect(page.getByText('Network Switch Required')).toBeTruthy();
    });
  });
});

async function addNetwork(
  walletPage: Page,
  { providerUrl, chainId }: { providerUrl: string; chainId: string },
) {
  const networksButton = await getByAriaLabel(walletPage, 'Selected Network');
  await networksButton.click();
  const addNetworkButton = await getByAriaLabel(walletPage, 'Add network');
  await addNetworkButton.click();
  const urlInput = await getByAriaLabel(walletPage, 'Network url');
  await urlInput.fill(providerUrl);
  const chainIdInput = await getByAriaLabel(walletPage, 'Chain ID');
  await chainIdInput.fill(chainId);
  await walletPage.waitForTimeout(2000);
  const testConnectionButton = await getByAriaLabel(
    walletPage,
    'Test connection',
  );
  await testConnectionButton.click({
    delay: 1000,
  });
  await hasText(walletPage, `You're adding this network`);
  const addNewNetworkButton = await getByAriaLabel(
    walletPage,
    'Add new network',
  );
  await addNewNetworkButton.click();
}
