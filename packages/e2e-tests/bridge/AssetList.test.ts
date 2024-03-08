import {
  getButtonByText,
  getByAriaLabel,
  hasText,
} from '@fuel-wallet/playwright-utils';
import { expect } from '@playwright/test';
// import * as metamask from '@synthetixio/synpress/commands/metamask';

import { test } from './fixtures';
import { hasDropdownSymbol } from './utils/bridge';
import { connectToMetamask } from './utils/wallets';

test.describe('Asset List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/bridge');

    await connectToMetamask(page);
    // await setupFuelWallet({ context, extensionId, page });
    // console.log(3);

    // await test.step('Connect to Fuel', async () => {
    //   // Connect fuel
    //   const connectFuel = getByAriaLabel(page, 'Connect Fuel Wallet');
    //   await connectFuel.click();
    //   await getByAriaLabel(page, 'Connect to Fuel Wallet', true).click();
    //   await fuelWalletTestHelper.walletConnect(['Account 2', 'Account 4']);
    // });
  });

  test('e2e asset list', async ({ page }) => {
    await test.step('Check if ETH is in the dropdown', async () => {
      await hasDropdownSymbol(page, 'ETH');
    });

    await test.step('Check if we can switch assets on deposit page', async () => {
      const assetDropdown = getByAriaLabel(page, 'Coin Selector');
      await assetDropdown.click();

      await hasText(page, 'Select token');
      // Check that assets are displayed
      let ethAsset;
      let tknAsset;
      ethAsset = getByAriaLabel(page, 'ETH symbol');
      expect(await ethAsset.innerText()).toBe('ETH');
      tknAsset = getByAriaLabel(page, 'TKN symbol');
      console.log(6, tknAsset);
      expect(await tknAsset.innerText()).toBe('TKN');
      console.log(7);
      await tknAsset.click();
      console.log(8);

      await hasDropdownSymbol(page, 'TKN');
      console.log(9);

      await assetDropdown.click();
      console.log(10);

      await hasText(page, 'Select token');
      console.log(11);
      // Check that assets are displayed
      ethAsset = getByAriaLabel(page, 'ETH symbol');
      console.log(12);
      expect(await ethAsset.innerText()).toBe('ETH');
      tknAsset = getByAriaLabel(page, 'TKN symbol');
      expect(await tknAsset.innerText()).toBe('TKN');
      await ethAsset.click();

      await hasDropdownSymbol(page, 'ETH');
    });

    await test.step('Check if we can switch asset on withdraw page', async () => {
      await hasDropdownSymbol(page, 'ETH');

      // Go to withdraw page
      const withdrawPageButton = getButtonByText(page, 'Withdraw from Fuel');
      await withdrawPageButton.click();

      const assetDropdown = getByAriaLabel(page, 'Coin Selector');
      await assetDropdown.click();

      await hasText(page, 'Select token');
      // Check that assets are displayed
      let ethAsset;
      let tknAsset;
      ethAsset = getByAriaLabel(page, 'ETH symbol');
      expect(await ethAsset.innerText()).toBe('ETH');
      tknAsset = getByAriaLabel(page, 'TKN symbol');
      expect(await tknAsset.innerText()).toBe('TKN');
      await tknAsset.click();

      await hasDropdownSymbol(page, 'TKN');

      await assetDropdown.click();

      await hasText(page, 'Select token');
      // Check that assets are displayed
      ethAsset = getByAriaLabel(page, 'ETH symbol');
      expect(await ethAsset.innerText()).toBe('ETH');
      tknAsset = getByAriaLabel(page, 'TKN symbol');
      expect(await tknAsset.innerText()).toBe('TKN');
      await ethAsset.click();

      await hasDropdownSymbol(page, 'ETH');
    });

    await test.step('Check if selected asset persists between tabs', async () => {
      const assetDropdown = getByAriaLabel(page, 'Coin Selector');
      await assetDropdown.click();

      const tknAsset = getByAriaLabel(page, 'TKN symbol');
      expect(await tknAsset.innerText()).toBe('TKN');
      await tknAsset.click();

      await hasDropdownSymbol(page, 'TKN');

      // Go to Deposit tab
      const depositPageButton = getButtonByText(page, 'Deposit to Fuel');
      await depositPageButton.click();

      await hasDropdownSymbol(page, 'TKN');
    });

    console.log(5);
  });
});
