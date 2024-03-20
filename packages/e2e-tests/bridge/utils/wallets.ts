import {
  FUEL_MNEMONIC,
  FuelWalletTestHelper,
  getButtonByText,
  getByAriaLabel,
} from '@fuels/playwright-utils';
import type { BrowserContext, Page } from '@playwright/test';
import * as metamask from '@synthetixio/synpress/commands/metamask';
import { Provider, Wallet } from 'fuels';
import { mnemonicToAccount } from 'viem/accounts';

import { ETH_MNEMONIC } from '../mocks';

const PROVIDER_URL = 'http://localhost:4000/graphql';

export const connectToMetamask = async (page: Page) => {
  console.log(11);
  await page.bringToFront();
  console.log(12);
  const connectKitButton = getByAriaLabel(page, 'Connect Ethereum Wallet');
  console.log(13);
  await connectKitButton.click();
  console.log(14);
  const metamaskConnect = getButtonByText(page, 'Metamask');
  console.log(15);
  await metamaskConnect.click();
  console.log(16);
  await metamask.acceptAccess();
  console.log(17);
};

export const setupFuelWallet = async ({
  page: _,
  context,
  extensionId,
}: { page: Page; context: BrowserContext; extensionId: string }) => {
  const fuelProvider = await Provider.create(PROVIDER_URL);
  const chainName = (await fuelProvider.fetchChain()).name;

  const fuelWalletTestHelper = await FuelWalletTestHelper.walletSetup(
    context,
    extensionId,
    PROVIDER_URL,
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

export const connectToFuel = async (
  page: Page,
  fuelWalletTestHelper: FuelWalletTestHelper,
  accountsToConnect: string[],
) => {
  const connectFuel = getByAriaLabel(page, 'Connect Fuel Wallet');
  await connectFuel.click();
  await getByAriaLabel(page, 'Connect to Fuel Wallet', true).click();
  await new Promise((resolve) => setTimeout(resolve, 20000));
  await fuelWalletTestHelper.walletConnect(accountsToConnect);
};
