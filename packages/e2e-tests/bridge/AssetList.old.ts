// @TODO: re-include important parts of this test inside of Bridge.test.ts

// import {
//   getButtonByText,
//   getByAriaLabel,
//   hasText,
// } from '@fuels/playwright-utils';
// import { expect } from '@playwright/test';

// import { test } from './fixtures';
// import { hasDropdownSymbol } from './utils/bridge';
// import { connectToMetamask } from './utils/wallets';

// test.describe('Asset List', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('/bridge');
//     await connectToMetamask(page);
//   });

//   test('e2e asset list', async ({ page, context }) => {
//     await test.step('Check if ETH is in the dropdown', async () => {
//       await hasDropdownSymbol(page, 'ETH');
//     });

//     await test.step('Check if we can switch assets on deposit page', async () => {
//       const assetDropdown = getByAriaLabel(page, 'Coin Selector');
//       await assetDropdown.click();

//       await hasText(page, 'Select token');
//       // Check that assets are displayed
//       let ethAsset;
//       let tknAsset;
//       ethAsset = getByAriaLabel(page, 'ETH symbol');
//       expect(await ethAsset.innerText()).toBe('ETH');
//       tknAsset = getByAriaLabel(page, 'TKN symbol');
//       expect(await tknAsset.innerText()).toBe('TKN');
//       await tknAsset.click();

//       await hasDropdownSymbol(page, 'TKN');

//       await assetDropdown.click();

//       await hasText(page, 'Select token');
//       // Check that assets are displayed
//       ethAsset = getByAriaLabel(page, 'ETH symbol');
//       expect(await ethAsset.innerText()).toBe('ETH');
//       tknAsset = getByAriaLabel(page, 'TKN symbol');
//       expect(await tknAsset.innerText()).toBe('TKN');
//       await ethAsset.click();

//       await hasDropdownSymbol(page, 'ETH');
//     });

//     await test.step('Check if we can switch asset on withdraw page', async () => {
//       await hasDropdownSymbol(page, 'ETH');

//       // Go to withdraw page
//       const withdrawPageButton = getButtonByText(page, 'Withdraw');
//       await withdrawPageButton.click();
//       const assetDropdown = getByAriaLabel(page, 'Coin Selector');
//       await assetDropdown.click();
//       await hasText(page, 'Select token');
//       // Check that assets are displayed
//       let ethAsset;
//       let tknAsset;
//       ethAsset = getByAriaLabel(page, 'ETH symbol');
//       expect(await ethAsset.innerText()).toBe('ETH');
//       tknAsset = getByAriaLabel(page, 'TKN symbol');
//       expect(await tknAsset.innerText()).toBe('TKN');
//       await tknAsset.click();

//       await hasDropdownSymbol(page, 'TKN');

//       await assetDropdown.click();

//       await hasText(page, 'Select token');
//       // Check that assets are displayed
//       ethAsset = getByAriaLabel(page, 'ETH symbol');
//       expect(await ethAsset.innerText()).toBe('ETH');
//       tknAsset = getByAriaLabel(page, 'TKN symbol');
//       expect(await tknAsset.innerText()).toBe('TKN');
//       await ethAsset.click();

//       await hasDropdownSymbol(page, 'ETH');
//     });

//     await test.step('Check if selected asset persists between tabs', async () => {
//       const assetDropdown = getByAriaLabel(page, 'Coin Selector');
//       await assetDropdown.click();

//       const tknAsset = getByAriaLabel(page, 'TKN symbol');
//       expect(await tknAsset.innerText()).toBe('TKN');
//       await tknAsset.click();

//       await hasDropdownSymbol(page, 'TKN');

//       // Go to Deposit tab
//       const depositPageButton = getButtonByText(page, 'Deposit');
//       await depositPageButton.click();

//       await hasDropdownSymbol(page, 'TKN');
//     });

//     await context.close();
//   });
// });
