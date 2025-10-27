import type { BrowserContext, Page } from '@playwright/test';
import { http, createPublicClient } from 'viem';
import { foundry } from 'viem/chains';
import { setupFuelWallet } from './wallets';

export async function init({
  context,
  extensionId,
  page,
}: { context: BrowserContext; extensionId: string; page: Page }) {
  const walletSettedUp = await setupFuelWallet({
    context,
    extensionId,
    page,
  });
  const fuelWallet = walletSettedUp.fuelWallet;
  const fuelWalletTestHelper = walletSettedUp.fuelWalletTestHelper;
  const account = walletSettedUp.account;

  const client = createPublicClient({
    chain: foundry,
    transport: http(),
  });

  await page.bringToFront();
  // wait before dev server is available
  await page.goto('/bridge');
  await page.reload();

  return { fuelWallet, fuelWalletTestHelper, account, client };
}
