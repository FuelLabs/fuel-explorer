import type { BrowserContext, Page } from '@playwright/test';
import { Provider, Wallet } from 'fuels';
import { mnemonicToAccount } from 'viem/accounts';
import {
  getButtonByText,
  getByAriaLabel,
  getFuelMnemonic,
  getFuelWalletTestHelper,
} from '../../../../src/helpers/fuel-utils.js';
import metamask from './metamask';

import { testExpect } from '../fixtures';
import { ETH_MNEMONIC } from '../mocks';

const PROVIDER_URL =
  process.env.FUEL_PROVIDER_URL || 'http://localhost:4000/v1/graphql';

export const acceptMetaMaskAccessWithNetworkSwitch = async () => {
  console.log('Connecting to dApp...');
  // Retry connectToDapp with longer waits
  let connectRetries = 3;
  while (connectRetries > 0) {
    try {
      await metamask.connectToDapp();
      console.log('Connected to dApp');
      break;
    } catch (e) {
      connectRetries--;
      if (connectRetries === 0) throw e;
      console.log(`connectToDapp failed, retrying... (${connectRetries} left)`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  // Approve network addition/switch if prompted
  // For localhost: pre-configured, may prompt for switch
  // For testnet: dApp will request Sepolia, need to approve
  try {
    console.log('Checking for network approval...');
    await metamask.approveNewNetwork();
    console.log('Network approved');
  } catch (_) {
    console.log('No new network prompt');
  }
  try {
    console.log('Checking for network switch...');
    await metamask.approveSwitchNetwork();
    console.log('Network switch approved');
  } catch (_) {
    console.log('No network switch prompt');
  }
};

export const connectToMetamask = async (page: Page) => {
  console.log('Starting MetaMask connection...');
  await page.bringToFront();

  // Wait longer in CI for page stability
  const waitTime = process.env.CI ? 3000 : 1000;
  await page.waitForTimeout(waitTime);

  console.log('Looking for Connect Ethereum Wallet button...');
  const connectKitButton = await getByAriaLabel(
    page,
    'Connect Ethereum Wallet',
  );
  await connectKitButton.click();
  console.log('Clicked Connect Ethereum Wallet');

  await page.waitForTimeout(process.env.CI ? 2000 : 500);

  console.log('Looking for Metamask button...');
  const metamaskConnect = await getButtonByText(page, 'Metamask');
  await metamaskConnect.click();
  console.log('Clicked Metamask button');

  // Wait longer for MetaMask popup to fully appear
  const popupWait = process.env.CI ? 5000 : 2000;
  console.log(`Waiting ${popupWait}ms for MetaMask popup...`);
  await page.waitForTimeout(popupWait);

  await acceptMetaMaskAccessWithNetworkSwitch();
  console.log('MetaMask connection complete');
};

export const setupFuelWallet = async ({
  page: _,
  context,
  extensionId,
}: { page: Page; context: BrowserContext; extensionId: string }) => {
  const FuelWalletTestHelper = await getFuelWalletTestHelper();
  const FUEL_MNEMONIC = await getFuelMnemonic();

  console.log('Creating Fuel Provider with URL:', PROVIDER_URL);
  const fuelProvider = new Provider(PROVIDER_URL);
  console.log('Fuel Provider created successfully');
  const chainName = (await fuelProvider.fetchChain()).name;
  const chainId = (await fuelProvider.fetchChain()).consensusParameters.chainId;
  console.log('Chain name:', chainName);
  console.log('Chain ID:', Number(chainId));
  // Use the correct object parameter structure for walletSetup
  const fuelWalletTestHelper = await FuelWalletTestHelper.walletSetup({
    context,
    fuelExtensionId: extensionId,
    fuelProvider: {
      url: PROVIDER_URL,
      chainId: Number(chainId),
    },
    chainName,
    mnemonic: FUEL_MNEMONIC,
  });
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

export const setupFuelWalletNetwork = async ({
  page: _,
  context,
  extensionId,
}: { page: Page; context: BrowserContext; extensionId: string }) => {
  const FuelWalletTestHelper = await getFuelWalletTestHelper();
  const FUEL_MNEMONIC = await getFuelMnemonic();

  console.log('net Creating Fuel Provider with URL:', PROVIDER_URL);
  const fuelProvider = new Provider(PROVIDER_URL);
  console.log('Fuel Provider created successfully');
  const chainName = (await fuelProvider.fetchChain()).name;

  // Use the correct object parameter structure for walletSetup
  const fuelWalletTestHelper = await FuelWalletTestHelper.walletSetup({
    context,
    fuelExtensionId: extensionId,
    fuelProvider: {
      url: PROVIDER_URL,
      chainId: await fuelProvider.getChainId(),
    },
    chainName,
    mnemonic: FUEL_MNEMONIC,
  });
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
  fuelWalletTestHelper: any,
  accountsToConnect: string[],
) => {
  const connectFuel = await getByAriaLabel(page, 'Connect Fuel Wallet');
  await connectFuel.click();
  const connectButton = await getByAriaLabel(
    page,
    'Connect to Fuel Wallet',
    true,
  );
  await connectButton.click();
  await testExpect
    .poll(
      async () => {
        return await fuelWalletTestHelper
          .walletConnect(accountsToConnect)
          .then(() => true)
          .catch(() => false);
      },
      { timeout: 20000 },
    )
    .toBeTruthy();
};
