import type { BrowserContext, Page } from '@playwright/test';
import { Provider, Wallet } from 'fuels';
import { http, createPublicClient } from 'viem';
import { mnemonicToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';
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
  // Retry connectToDapp with longer waits for stability
  let connectRetries = 3;
  while (connectRetries > 0) {
    try {
      await metamask.connectToDapp();
      break;
    } catch (e) {
      connectRetries--;
      if (connectRetries === 0) throw e;
      console.log(`connectToDapp failed, retrying... (${connectRetries} left)`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  // Approve network addition/switch if prompted
  try {
    await metamask.approveNewNetwork();
  } catch (_) {
    // No new network prompt - this is expected for localhost
  }
  try {
    await metamask.approveSwitchNetwork();
  } catch (_) {
    // No network switch prompt - already on correct network
  }
};

export const connectToMetamask = async (page: Page) => {
  await page.bringToFront();
  await page.waitForTimeout(process.env.CI ? 3000 : 1000);

  const connectKitButton = await getByAriaLabel(
    page,
    'Connect Ethereum Wallet',
  );
  await connectKitButton.click();
  await page.waitForTimeout(process.env.CI ? 2000 : 500);

  const metamaskConnect = await getButtonByText(page, 'Metamask');
  await metamaskConnect.click();

  // Wait for MetaMask popup to fully appear
  await page.waitForTimeout(process.env.CI ? 5000 : 2000);

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

  // Fetch chain data once and reuse
  const chainData = await fuelProvider.fetchChain();
  const chainName = chainData.name;
  const chainId = chainData.consensusParameters.chainId;
  console.log(`Chain: ${chainName} (ID: ${Number(chainId)})`);

  // Wait in CI to ensure browser context is stable
  if (process.env.CI) {
    console.log('Stabilization wait (30s)...');
    await new Promise((resolve) => setTimeout(resolve, 30000));
  }

  console.log('Starting Fuel Wallet setup...');

  // Setup Fuel Wallet with extension
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

  // Add additional accounts for testing
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

  // Log wallet balances for debugging funding issues
  console.log('=== Wallet Balances ===');

  // Fuel wallet balance
  try {
    const fuelBalance = await fuelWallet.getBalance();
    console.log('Fuel Wallet Address:', fuelWallet.address.toString());
    console.log('Fuel Wallet Balance:', fuelBalance.toString(), 'base units');
  } catch (error) {
    console.error('Failed to fetch Fuel wallet balance:', error);
  }

  // ETH wallet balance
  console.log('ETH Account Address:', account.address);
  try {
    const ethNetwork = process.env.ETH_NETWORK || 'localhost';
    if (ethNetwork === 'sepolia') {
      const client = createPublicClient({
        chain: sepolia,
        transport: http(),
      });
      const ethBalance = await client.getBalance({ address: account.address });
      console.log('ETH Balance (Sepolia):', ethBalance.toString(), 'wei');
    } else {
      console.log('ETH Balance: Not checked (localhost network)');
    }
  } catch (error) {
    console.error('Failed to fetch ETH balance:', error);
  }

  console.log('=======================');

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
