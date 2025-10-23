import { expect } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';
import { shortAddress } from '../../../../../app-portal/src/systems/Core/utils';
import {
  getByAriaLabel,
  hasText,
  waitAriaLabel,
} from '../../../../src/helpers/fuel-utils.js';

export async function closeTransactionPopup(page: Page) {
  // click anywhere outside of popup
  await page.mouse.click(2, 2);
}

export const hasDropdownSymbol = async (page: Page, symbol: string) => {
  const assetDropdown = await getByAriaLabel(page, 'Coin Selector');
  const symbolElement = assetDropdown.getByText(symbol);
  expect(await symbolElement.innerText()).toBe(symbol);
};

export const goToBridgePage = async (page: Page) => {
  const isBridge = await isBridgePage(page);
  if (isBridge) return;
  await page.goto('/bridge', {
    timeout: 20000,
    waitUntil: 'domcontentloaded',
  });
  await waitAriaLabel(page, 'Balance');
};

export const goToTransactionsPage = async (page: Page) => {
  if (await isTransactionHistoryPage(page)) return;

  const transactionList = await getByAriaLabel(page, 'Transaction History');
  await transactionList.click();

  await waitAriaLabel(page, 'Back to home');
  await hasText(page, 'Back');
  await page.waitForTimeout(2500);
};

export const clickDepositTab = async (page: Page) => {
  const tab = await getByAriaLabel(page, 'Deposit Tab');
  await tab.click();
  await page.waitForTimeout(2500);
};

export const clickWithdrawTab = async (page: Page) => {
  const tab = await getByAriaLabel(page, 'Withdraw Tab');
  await tab.click();
  await page.waitForTimeout(2500);
};

export const checkTxItemDone = async (page: Page, txHash: string) => {
  const listItem = await getByAriaLabel(
    page,
    `Transaction ID: ${shortAddress(txHash)}`,
  );
  const listItemText = await listItem.innerText();
  expect(listItemText).toBeTruthy();
  const settled = listItem.getByText('Settled');
  const settledText = await settled.innerText();
  expect(settledText).toBeTruthy();
};

export const proceedAnyways = async (context: BrowserContext) => {
  let metamaskNotificationPage = context
    .pages()
    .find((p) => p.url().includes('notification'));
  if (!metamaskNotificationPage) {
    metamaskNotificationPage = await context.waitForEvent('page', {
      predicate: (page) => page.url().includes('notification'),
    });
  }
  const proceedAnyways = metamaskNotificationPage.getByText(
    'I want to proceed anyway',
  );
  const count = await proceedAnyways.count();
  if (count) {
    await proceedAnyways.click();
  }
};

export const selectToken = async (page: Page, token: string) => {
  const assetDropdown = await getByAriaLabel(page, 'Coin Selector');
  await assetDropdown.click();
  const tokenAsset = await getByAriaLabel(page, `${token} symbol`);
  await tokenAsset.click();
};

export const isTransactionHistoryPage = async (page: Page) => {
  const currentUrl = page.url();
  return currentUrl.includes('/bridge/history');
};

export const isBridgePage = async (page: Page) => {
  const currentUrl = page.url();
  return currentUrl.includes('/bridge') && !currentUrl.includes('/history');
};

export const acceptTermsOfService = async (page: Page) => {
  console.log('Accepting Terms of Service');
  const tosButton = page.locator('[aria-label="Terms of Service"]');
  try {
    // Wait for the button to appear, with a short timeout
    await tosButton.waitFor({ timeout: 5000 }); // Adjust timeout as needed
    console.log('Terms of Service button found');
    const isChecked = await tosButton.getAttribute('data-state');
    if (isChecked !== 'unchecked') {
      console.log('Terms of Service already accepted');
      return;
    }
    await tosButton.click();
  } catch (_error) {
    console.log('Terms of Service button not found, proceeding...');
  }
};
