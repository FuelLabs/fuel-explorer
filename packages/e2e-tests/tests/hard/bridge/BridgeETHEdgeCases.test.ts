import type { HexAddress } from 'app-commons';
import { bn } from 'fuels';
import type { GetContractReturnType, HDAccount, PublicClient } from 'viem';
import { http, createPublicClient, getContract } from 'viem';
import { foundry } from 'viem/chains';
import { getByAriaLabel, hasText } from '../../../src/helpers/fuel-utils.js';
import * as metamask from './utils/metamask';

import { ERC_20 } from '../../../../app-portal/src/systems/Chains/eth/contracts/Erc20';

import { testExpect as expect, test } from './fixtures';
import {
  acceptTermsOfService,
  clickDepositTab,
  closeTransactionPopup,
  goToBridgePage,
  hasDropdownSymbol,
  selectToken,
} from './utils/bridge';
import { getBridgeTokenContracts } from './utils/contractIds';
import {
  connectToFuel,
  connectToMetamask,
  setupFuelWallet,
} from './utils/wallets';

test.describe('Bridge Edge Cases', () => {
  let client: PublicClient;
  let account: HDAccount;
  let erc20Contract: GetContractReturnType<typeof ERC_20.abi, PublicClient>;
  let fuelWalletTestHelper: any;

  test.beforeEach(async ({ context, extensionId, page }) => {
    console.log('Setting up test environment...');
    const walletSettedUp = await setupFuelWallet({
      context,
      extensionId,
      page,
    });
    fuelWalletTestHelper = walletSettedUp.fuelWalletTestHelper;
    account = walletSettedUp.account;

    client = createPublicClient({
      chain: foundry,
      transport: http(),
    });

    console.log('Navigating to bridge page...');
    await page.bringToFront();
    await goToBridgePage(page);
    await page.waitForTimeout(3000);
    console.log('Test environment setup complete');
  });

  test('should handle TKN deposit without ETH in Fuel wallet', async ({
    page,
  }) => {
    await test.step('Connect MetaMask wallet', async () => {
      console.log('Connecting MetaMask wallet...');
      await connectToMetamask(page);
      console.log('MetaMask wallet connected successfully');
    });

    await test.step('Connect Fuel wallet with multiple accounts', async () => {
      console.log('Connecting Fuel wallet with Account 2 and Account 4...');
      await connectToFuel(page, fuelWalletTestHelper, [
        'Account 2',
        'Account 4',
      ]);
      console.log('Fuel wallet connected successfully');
    });

    const bridgeTokenContracts = await getBridgeTokenContracts();
    const { ETH_ERC20 } = bridgeTokenContracts;

    erc20Contract = getContract({
      abi: ERC_20.abi,
      address: ETH_ERC20 as HexAddress,
      client: {
        public: client,
      },
    }) as GetContractReturnType<typeof ERC_20.abi, PublicClient>;

    await test.step('Obtain TKN from faucet', async () => {
      console.log('Starting TKN faucet process...');
      await test.step('Request TKN from faucet', async () => {
        await goToBridgePage(page);
        await clickDepositTab(page);

        const coinSelector = await getByAriaLabel(page, 'Coin Selector');
        await coinSelector.click();
        const faucetButton = await getByAriaLabel(page, 'Faucet TKN');
        await faucetButton.click();
        console.log('TKN faucet requested');
      });

      await test.step('Confirm faucet transaction in MetaMask', async () => {
        await page.waitForTimeout(20000);
        await metamask.confirmTransaction();
        console.log('MetaMask confirmation received');
      });

      await test.step('Verify faucet transaction success', async () => {
        await erc20Contract.read.balanceOf([account.address]);
      });

      await test.step('Select TKN for transaction', async () => {
        const tknItem = await getByAriaLabel(page, 'TKN symbol');
        await tknItem.click();
        await hasDropdownSymbol(page, 'TKN');
        console.log('TKN token selected');
      });
    });

    await test.step('Attempt TKN deposit without ETH balance', async () => {
      console.log('Testing TKN deposit without ETH in Fuel wallet...');
      await fuelWalletTestHelper.switchAccount('Account 4');
      await goToBridgePage(page);
      await clickDepositTab(page);
      await selectToken(page, 'TKN');
      const preDepositBalanceTkn = await erc20Contract.read.balanceOf([
        account.address,
      ]);

      console.log('Initiating deposit with test amount...');
      const depositAmount = '1.12345';
      const depositInput = page.locator('.fuel-InputAmountField input');
      await depositInput.fill(depositAmount);

      await test.step('Verify low ETH warning alert', async () => {
        console.log('Checking for low ETH balance warning...');
        await hasText(
          page,
          "You don't have any ETH on Fuel to pay for gas. We recommend you bridge some ETH before you bridge any other assets.",
        );

        await acceptTermsOfService(page);
        const bridgeButton = await getByAriaLabel(
          page,
          'Bridge asset anyway',
          true,
        );
        await expect(bridgeButton).toHaveText('Bridge asset anyway', {
          useInnerText: true,
        });
        console.log('Low ETH warning displayed correctly');
      });

      await test.step('Verify transaction failure due to insufficient ETH', async () => {
        const depositButton = await getByAriaLabel(
          page,
          'Bridge asset anyway',
          true,
        );
        await depositButton.click();

        await page.waitForTimeout(20000);
        await metamask.confirmPermissionToSpend();
        await page.waitForTimeout(1000);
        await metamask.confirmTransaction();

        console.log('Waiting for transaction completion...');
        await page.locator(':nth-match(:text("Done"), 1)').waitFor();
        await page.locator(':nth-match(:text("Done"), 2)').waitFor();

        await test.expect
          .poll(
            async () => {
              const postDepositBalanceTkn = await erc20Contract.read.balanceOf([
                account.address,
              ]);
              return Number.parseFloat(
                bn((preDepositBalanceTkn as bigint).toString())
                  .sub((postDepositBalanceTkn as bigint).toString())
                  .format({ precision: 6, units: 18 }),
              );
            },
            { timeout: 30000 },
          )
          .toBeCloseTo(Number.parseFloat(depositAmount));

        console.log('Verifying transaction failure message...');
        const confirmTransactionButton = page.getByRole('button', {
          name: 'Confirm Transaction',
        });
        await confirmTransactionButton.click();

        await hasText(
          page,
          'This transaction requires ETH on Fuel side to pay for gas. Please faucet your wallet or bridge ETH.',
        );
        console.log('Transaction failed as expected due to insufficient ETH');
      });
      await closeTransactionPopup(page);
    });
  });
});
