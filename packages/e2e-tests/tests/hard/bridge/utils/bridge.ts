import {
  getByAriaLabel,
  hasText,
  waitAriaLabel,
} from '@fuels/playwright-utils';
import { expect } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';

import { shortAddress } from '../../../../../app-portal/src/systems/Core/utils';

export async function closeTransactionPopup(page: Page) {
  // click anywhere outside of popup
  await page.mouse.click(2, 2);
}

export const hasDropdownSymbol = async (page: Page, symbol: string) => {
  const assetDropdown = getByAriaLabel(page, 'Coin Selector').getByText(symbol);
  expect(await assetDropdown.innerText()).toBe(symbol);
};

export const goToBridgePage = async (page: Page) => {
  const bridgeButton = page
    .locator('a[data-active="true"]')
    .getByText('Bridge');
  await bridgeButton.click();
  await hasText(page, 'Asset amount');
};

export const goToTransactionsPage = async (page: Page) => {
  const transactionList = getByAriaLabel(page, 'Transaction History');
  await transactionList.click();

  await waitAriaLabel(page, 'Back to home');
};

export const clickDepositTab = async (page: Page) => {
  const tab = getByAriaLabel(page, 'Deposit Tab');
  await tab.click();
};

export const clickWithdrawTab = async (page: Page) => {
  const tab = getByAriaLabel(page, 'Withdraw Tab');
  await tab.click();
};

export const checkTxItemDone = async (page: Page, txHash: string) => {
  const listItem = getByAriaLabel(
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
  const assetDropdown = getByAriaLabel(page, 'Coin Selector');
  await assetDropdown.click();
  const tokenAsset = getByAriaLabel(page, `${token} symbol`);
  await tokenAsset.click();
};
