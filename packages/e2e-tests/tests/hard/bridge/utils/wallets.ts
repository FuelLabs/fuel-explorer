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

const PROVIDER_URL = 'http://localhost:4000/v1/graphql';

export const acceptMetaMaskAccessWithNetworkSwitch = async () => {
  await metamask.connectToDapp();
  try {
    await metamask.approveNewNetwork();
  } catch (_) {
    // No new network prompt - continue
  }
  try {
    await metamask.approveSwitchNetwork();
  } catch (_) {
    // No switch prompt - continue
  }
};

export const connectToMetamask = async (page: Page) => {
  await page.bringToFront();
  await page.waitForTimeout(1000);
  const connectKitButton = await getByAriaLabel(
    page,
    'Connect Ethereum Wallet',
  );
  await connectKitButton.click();
  await page.waitForTimeout(500);
  const metamaskConnect = await getButtonByText(page, 'Metamask');
  await metamaskConnect.click();
  await page.waitForTimeout(2000);
  await acceptMetaMaskAccessWithNetworkSwitch();
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

/**
 * The wallet extension connects Account 1 (current) plus the accounts passed to
 * `connectToFuel`, and the dapp picks one of them as the active account. Which
 * one it picks is not stable between runs, so balance checks must target the
 * account the UI reports, not a fixed derivation index.
 *
 * The UI shows either the account alias ("Account 2") or the address shortened
 * to its first 6 and last 6 characters ("0xF13c...Ab4749").
 */
const WALLET_ACCOUNTS = 4;

export const getConnectedFuelWallet = async (
  page: Page,
  provider: Provider,
) => {
  const FUEL_MNEMONIC = await getFuelMnemonic();
  const connectedWallet = await getByAriaLabel(
    page,
    'Fuel Local: Connected Wallet',
  );
  const label = (await connectedWallet.innerText()).trim().toLowerCase();

  for (let index = 0; index < WALLET_ACCOUNTS; index++) {
    const wallet = Wallet.fromMnemonic(
      FUEL_MNEMONIC,
      `m/44'/1179993420'/${index}'/0/0`,
      undefined,
      provider,
    );
    const address = wallet.address.toB256().toLowerCase();
    const shortAddress = `${address.slice(0, 6)}...${address.slice(-6)}`;
    if (label === `account ${index + 1}` || label === shortAddress) {
      return wallet;
    }
  }
  throw new Error(`Unexpected connected wallet label: "${label}"`);
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
