import { getButtonByText, getByAriaLabel } from '@fuel-wallet/playwright-utils';
import { expect } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';

import { shortAddress } from '../../../src/systems/Core/utils';

export async function closeTransactionPopup(page: Page) {
  const popupTransactino = getByAriaLabel(page, 'Close Transaction Dialog');
  await popupTransactino.click();
}

export const hasDropdownSymbol = async (page: Page, symbol: string) => {
  const assetDropdown = getByAriaLabel(page, 'Coin Selector').getByText(symbol);
  expect(await assetDropdown.innerText()).toBe(symbol);
};

export const goToBridgePage = async (page: Page) => {
  const bridgeButton = page.locator('button').getByText('Bridge');
  await bridgeButton.click();
};
export const goToTransactionsPage = async (page: Page) => {
  const transactionList = page.locator('button').getByText('History');
  await transactionList.click();
};

export const clickDepositTab = async (page: Page) => {
  const tab = getButtonByText(page, 'Deposit to Fuel');
  await tab.click();
};

export const clickWithdrawTab = async (page: Page) => {
  const tab = getButtonByText(page, 'Withdraw from Fuel');
  await tab.click();
};

export const checkTxItemDone = async (page: Page, txHash: string) => {
  const listItem = getByAriaLabel(
    page,
    `Transaction ID: ${shortAddress(txHash)}`
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
    'I want to proceed anyway'
  );
  const count = await proceedAnyways.count();
  if (count) {
    await proceedAnyways.click();
  }
};
