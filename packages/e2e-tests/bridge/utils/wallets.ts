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
  await page.bringToFront();
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
  console.log(11);
  const fuelProvider = await Provider.create(PROVIDER_URL);
  console.log(12);
  const chainName = (await fuelProvider.fetchChain()).name;
  console.log(13);

  const fuelWalletTestHelper = await FuelWalletTestHelper.walletSetup(
    context,
    extensionId,
    PROVIDER_URL,
    chainName,
  );
  console.log(14);
  await fuelWalletTestHelper.addAccount();
  await fuelWalletTestHelper.addAccount();
  await fuelWalletTestHelper.addAccount();
  console.log(15);
  await fuelWalletTestHelper.switchAccount('Account 1');
  console.log(16);
  const account = mnemonicToAccount(ETH_MNEMONIC);
  console.log(17);
  const fuelWallet = Wallet.fromMnemonic(
    FUEL_MNEMONIC,
    undefined,
    undefined,
    fuelProvider,
  );
  console.log(18);

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
