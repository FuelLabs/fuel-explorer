import {
  FUEL_MNEMONIC,
  FuelWalletTestHelper,
  getButtonByText,
  getByAriaLabel,
} from '@fuel-wallet/playwright-utils';
import type { BrowserContext, Page } from '@playwright/test';
import * as metamask from '@synthetixio/synpress/commands/metamask';
import { Provider, Wallet } from 'fuels';
import { mnemonicToAccount } from 'viem/accounts';

import { ETH_MNEMONIC } from '../mocks';

const { FUEL_PROVIDER_URL = '' } = process.env;

export const connectToMetamask = async (page: Page) => {
  await page.bringToFront();
  // Go to the bridge page

  // Connect metamask
  const connectKitButton = getByAriaLabel(page, 'Connect Ethereum Wallet');
  await connectKitButton.click();
  const metamaskConnect = getButtonByText(page, 'Metamask');
  await metamaskConnect.click();
  await metamask.acceptAccess();
};

export const setupFuelWallet = async ({
  page: _,
  context,
  extensionId,
}: { page: Page; context: BrowserContext; extensionId: string }) => {
  const fuelProvider = await Provider.create(FUEL_PROVIDER_URL);
  const chainName = (await fuelProvider.fetchChain()).name;

  const fuelWalletTestHelper = await FuelWalletTestHelper.walletSetup(
    context,
    extensionId,
    FUEL_PROVIDER_URL,
    chainName,
  );
  await fuelWalletTestHelper.addAccount();
  await fuelWalletTestHelper.addAccount();
  await fuelWalletTestHelper.addAccount();
  await fuelWalletTestHelper.switchAccount('Account 1');
  const account = mnemonicToAccount(ETH_MNEMONIC);
  const fuelWallet = Wallet.fromMnemonic(
    FUEL_MNEMONIC,
    undefined,
    undefined,
    fuelProvider,
  );

  return { fuelWallet, fuelWalletTestHelper, account };
};
