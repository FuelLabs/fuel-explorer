import type { WalletUnlocked } from 'fuels';
import { bn } from 'fuels';
import type { HDAccount, PublicClient } from 'viem';
import { http, createPublicClient } from 'viem';
import { foundry } from 'viem/chains';
import {
  type FuelWalletTestHelper,
  getButtonByText,
  getByAriaLabel,
} from '../../../src/helpers/fuel-utils.js';
import * as metamask from './utils/metamask';

import type { Locator } from '@playwright/test';
import { testExpect as expect, test } from './fixtures';
import {
  acceptTermsOfService,
  checkTxItemDone,
  clickWithdrawTab,
  closeTransactionPopup,
  goToBridgePage,
  goToTransactionsPage,
  hasDropdownSymbol,
  proceedAnyways,
} from './utils/bridge';
import {
  connectToFuel,
  connectToMetamask,
  setupFuelWallet,
} from './utils/wallets';

test.describe('Bridge ETH Operations', () => {
  let client: PublicClient;
  let account: HDAccount;
  let fuelWallet: WalletUnlocked;
  let fuelWalletTestHelper: FuelWalletTestHelper;

  test.beforeEach(async ({ context, extensionId, page }) => {
    console.log('Initializing test environment...');
    const walletSettedUp = await setupFuelWallet({
      context,
      extensionId,
      page,
    });
    fuelWallet = walletSettedUp.fuelWallet;
    fuelWalletTestHelper = walletSettedUp.fuelWalletTestHelper;
    account = walletSettedUp.account;

    client = createPublicClient({
      chain: foundry,
      transport: http(),
    });

    await page.bringToFront();
    await goToBridgePage(page);
    await page.waitForTimeout(3000);
    console.log('Test environment ready');
  });

  test('should complete full ETH bridge cycle: deposit and withdrawal', async ({
    page,
    context,
  }) => {
    await test.step('Connect MetaMask wallet', async () => {
      console.log('Connecting MetaMask...');
      await connectToMetamask(page);
      console.log('MetaMask connected');
    });

    await test.step('Connect Fuel wallet with multiple accounts', async () => {
      console.log('Connecting Fuel wallet...');
      await connectToFuel(page, fuelWalletTestHelper, [
        'Account 2',
        'Account 4',
      ]);
      console.log('Fuel wallet connected');
    });

    const DEPOSIT_AMOUNT_WITH_DOT = '1.12345';
    const DEPOSIT_AMOUNT_WITH_COMMA = '1,12345';
    const WITHDRAW_AMOUNT_WITH_DOT = '0.012345';
    const WITHDRAW_AMOUNT_WITH_COMMA = '0,012345';

    let depositEthTxId: string;
    let withdrawEthTxId: string;

    const baseAssetId = await fuelWallet.provider.getBaseAssetId();

    await test.step('Verify wallet connection persistence after page refresh', async () => {
      console.log('Testing wallet persistence...');
      await goToBridgePage(page);
      let connectedWallet;
      await expect
        .poll(
          async () => {
            connectedWallet = await getByAriaLabel(
              page,
              'Fuel Local: Connected Wallet',
            );
            return !!connectedWallet;
          },
          { timeout: 10000 },
        )
        .toBeTruthy();
      const address = await connectedWallet?.innerText();
      const balance = await getByAriaLabel(page, 'Balance');
      const balanceText = await balance.innerText();

      await goToBridgePage(page);

      const connectedWalletAferRefresh = await getByAriaLabel(
        page,
        'Fuel Local: Connected Wallet',
      );
      const addressAfterRefresh = await connectedWalletAferRefresh.innerText();
      const balanceAfterRefresh = await getByAriaLabel(page, 'Balance');
      const balanceTextAfterRefresh = await balanceAfterRefresh.innerText();

      expect(addressAfterRefresh).toEqual(address);
      expect(balanceTextAfterRefresh).toEqual(balanceText);
      console.log('Wallet persistence verified');
    });

    await test.step('Execute ETH deposit to Fuel network', async () => {
      console.log('Starting ETH deposit...');
      const preDepositBalanceFuel = await fuelWallet.getBalance(baseAssetId);
      const prevDepositBalanceEth = await client.getBalance({
        address: account.address,
      });

      await test.step('Submit deposit transaction', async () => {
        await hasDropdownSymbol(page, 'ETH');
        const depositInput = page.locator('.fuel-InputAmountField input');
        await depositInput.fill(DEPOSIT_AMOUNT_WITH_COMMA);
        await acceptTermsOfService(page);
        const depositButton = await getByAriaLabel(page, 'Deposit', true);
        await depositButton.click();
        console.log(`Depositing ${DEPOSIT_AMOUNT_WITH_COMMA} ETH...`);
      });

      await test.step('Confirm deposit in MetaMask', async () => {
        await page.waitForTimeout(20000);
        await metamask.confirmTransaction();
        await page.waitForTimeout(2000);
        console.log('MetaMask confirmation received');
      });

      await test.step('Verify deposit completion', async () => {
        const assetAmountLocator = page.getByText(
          'You may now close the popup',
        );
        await assetAmountLocator.innerText();

        await page.locator(':nth-match(:text("Done"), 1)').waitFor();
        await page.locator(':nth-match(:text("Done"), 3)').waitFor();

        await page.waitForTimeout(10000);
        const postDepositBalanceEth = await client.getBalance({
          address: account.address,
        });

        expect(
          Number.parseFloat(
            bn(prevDepositBalanceEth.toString())
              .sub(postDepositBalanceEth.toString())
              .format({ precision: 6, units: 18 }),
          ),
        ).toBeCloseTo(Number.parseFloat(DEPOSIT_AMOUNT_WITH_DOT));

        const transactionIdElement = await getByAriaLabel(
          page,
          'Transaction ID',
        );
        depositEthTxId = (await transactionIdElement.innerText()).trim();
        console.log(`Deposit transaction: ${depositEthTxId}`);

        const assetAmount = await page.waitForSelector(
          '[aria-label="Asset amount"]',
          { timeout: 20000 },
        );
        const assetAmountText = await assetAmount.innerText();
        expect(assetAmountText.trim()).toBe(DEPOSIT_AMOUNT_WITH_DOT);
        console.log('Deposit completed successfully');
      });

      await test.step('Verify deposit in transaction history', async () => {
        console.log('Closing transaction popup...');
        await closeTransactionPopup(page);
        console.log('Transaction popup closed');
        const postDepositBalanceFuel = await fuelWallet.getBalance(baseAssetId);
        console.log(
          'Got Fuel wallet balance',
          postDepositBalanceFuel.toString(),
        );
        await expect
          .poll(
            async () => {
              const postDepositBalanceFuel =
                await fuelWallet.getBalance(baseAssetId);
              console.log('Got Fuel wallet balance', postDepositBalanceFuel);
              return postDepositBalanceFuel
                .sub(preDepositBalanceFuel)
                .format({ precision: 6, units: 9 });
            },
            { timeout: 30000 },
          )
          .toBe(DEPOSIT_AMOUNT_WITH_DOT);
        console.log('Fuel balance verified');
        await goToTransactionsPage(page);
        console.log('Navigated to transactions page');
        const depositLocator = await getByAriaLabel(
          page,
          `Transaction ID: ${depositEthTxId}`,
        );
        console.log('Found deposit transaction');
        const assetAmountLocator = depositLocator.getByText(
          `${DEPOSIT_AMOUNT_WITH_DOT} ETH`,
        );
        await assetAmountLocator.innerText();
        console.log('Found asset amount');
        const statusLocator = depositLocator.getByText('Settled');
        await statusLocator.innerText();
        console.log('Deposit verified in history');
      });
    });

    await test.step('Execute ETH withdrawal from Fuel network', async () => {
      console.log('Starting ETH withdrawal...');
      const preWithdrawBalanceFuel = await fuelWallet.getBalance(baseAssetId);
      console.log('Got Fuel wallet balance');
      const prevWithdrawBalanceEth = await client.getBalance({
        address: account.address,
      });
      console.log('Got ETH wallet balance');

      await test.step('Submit withdrawal transaction', async () => {
        await goToBridgePage(page);
        console.log('Navigated to bridge page');
        await clickWithdrawTab(page);
        console.log('Clicked withdraw tab');
        await hasDropdownSymbol(page, 'ETH');
        console.log('Found ETH in dropdown');

        let withdrawInput;
        console.log('Waiting for balance checker...');
        // wait for balance checker to react, otherwise can get "Insufficient funds"
        await expect
          .poll(
            async () => {
              withdrawInput = page.locator('.fuel-InputAmountField input');
              return withdrawInput;
            },
            { timeout: 10000 },
          )
          .toBeDefined();
        console.log('Balance checker ready');

        await withdrawInput.fill(WITHDRAW_AMOUNT_WITH_COMMA);
        console.log('Filled withdrawal amount');
        await acceptTermsOfService(page);
        console.log('Accepted terms of service');
        const withdrawButton = await getByAriaLabel(page, 'Withdraw', true);
        await withdrawButton.click();
        console.log(`Withdrawing ${WITHDRAW_AMOUNT_WITH_COMMA} ETH...`);
      });

      await test.step('Approve withdrawal in Fuel Wallet', async () => {
        console.log('Waiting for Fuel Wallet approval...');
        await fuelWalletTestHelper.walletApprove();
        console.log('Fuel Wallet approval received');
      });

      await test.step('Verify transaction submission to Fuel network', async () => {
        console.log('Waiting for Done text...');
        await page.locator(':nth-match(:text("Done"), 1)').waitFor();
        console.log('Found Done text');
        const stepSettlementLocator = await getByAriaLabel(page, ' left');
        await stepSettlementLocator.innerText();
        console.log('Transaction submitted to Fuel');
      });

      await test.step('Verify relay action requirement', async () => {
        console.log('Starting relay action verification...');
        await test.expect
          .poll(
            async () => {
              const found = await page
                .locator(':text("Action Required")')
                .waitFor()
                .then(() => true)
                .catch(() => false);
              console.log('Polling for Action Required:', found);
              return found;
            },
            { timeout: 360000 }, // 6 minutes to wait for relay action
          )
          .toBeTruthy();

        const withdrawTxElement = await getByAriaLabel(page, 'Transaction ID');
        withdrawEthTxId = (await withdrawTxElement.innerText()).trim();
        console.log(`Withdrawal transaction ID found: ${withdrawEthTxId}`);

        const assetAmountWithdraw = await getByAriaLabel(page, 'Asset amount');
        const amount = await assetAmountWithdraw.innerHTML();
        console.log(`Asset amount found: ${amount}`);
        expect(amount.trim()).toBe(WITHDRAW_AMOUNT_WITH_DOT);
        console.log('Relay action required - verification complete');
      });

      let withdrawTxLocator: Locator;
      await test.step('Verify withdrawal in transaction history', async () => {
        console.log('Starting withdrawal verification in history...');
        await closeTransactionPopup(page);
        await goToTransactionsPage(page);
        console.log('Navigated to transactions page');

        // Wait for transactions to get fetched and sorted
        await expect
          .poll(
            async () => {
              console.log('Polling for withdrawal transaction...');
              withdrawTxLocator = await getByAriaLabel(
                page,
                `Transaction ID: ${withdrawEthTxId}`,
              );
              return withdrawTxLocator;
            },
            { timeout: 10000 },
          )
          .toBeDefined();
        console.log('Found withdrawal transaction');

        const assetAmountLocator = withdrawTxLocator.getByText(
          `${WITHDRAW_AMOUNT_WITH_DOT} ETH`,
        );
        await assetAmountLocator.innerText();
        await assetAmountLocator.click();
        console.log('Withdrawal found and clicked in history');
      });

      await test.step('Execute relay transaction', async () => {
        console.log('Starting relay transaction...');
        let confirmButton;
        await expect
          .poll(
            async () => {
              console.log('Polling for confirm button...');
              confirmButton = await getButtonByText(
                page,
                'Confirm Transaction',
              );
              return confirmButton;
            },
            { timeout: 10000 },
          )
          .toBeDefined();
        await confirmButton.click();
        console.log('Relay initiated - confirm button clicked');
      });

      await test.step('Confirm relay in MetaMask', async () => {
        console.log('Starting MetaMask relay confirmation...');
        await expect
          .poll(
            async () => {
              console.log('Polling for proceed anyway...');
              const result = await proceedAnyways(context)
                .then(() => true)
                .catch(() => false);
              console.log('Proceed anyway result:', result);
              return result;
            },
            { timeout: 60000 },
          )
          .toBeTruthy();

        await test.expect
          .poll(
            async () => {
              console.log('Polling for MetaMask confirmation...');
              const result = await metamask
                .confirmTransaction()
                .then(() => true)
                .catch(() => false);
              console.log('MetaMask confirmation result:', result);
              return result;
            },
            { timeout: 10000 },
          )
          .toBeTruthy();
        console.log('MetaMask relay confirmed');
      });

      await test.step('Verify withdrawal completion', async () => {
        console.log('Starting withdrawal completion verification...');
        await page.waitForTimeout(10000);

        let postWithdrawBalanceEth = await client.getBalance({
          address: account.address,
        });
        console.log('Got initial post-withdrawal ETH balance');
        const _postWithdrawBalanceFuel =
          await fuelWallet.getBalance(baseAssetId);
        console.log('Got post-withdrawal Fuel balance');

        await expect
          .poll(
            async () => {
              console.log('Polling for ETH balance change...');
              postWithdrawBalanceEth = await client.getBalance({
                address: account.address,
              });
              const diff = Number.parseFloat(
                bn(postWithdrawBalanceEth.toString())
                  .sub(bn(prevWithdrawBalanceEth.toString()))
                  .format({ precision: 6, units: 18 }),
              );
              console.log('Current balance difference:', diff);
              return diff;
            },
            { timeout: 10000 },
          )
          .toBeCloseTo(Number.parseFloat(WITHDRAW_AMOUNT_WITH_DOT));
        console.log('ETH balance verified');

        await test.expect
          .poll(
            async () => {
              const postWithdrawBalanceFuel =
                await fuelWallet.getBalance(baseAssetId);
              return preWithdrawBalanceFuel
                .sub(postWithdrawBalanceFuel)
                .format({ precision: 6, units: 9 });
            },
            { timeout: 30000 },
          )
          .toBe(WITHDRAW_AMOUNT_WITH_DOT);
        console.log('Fuel balance verified');

        await closeTransactionPopup(page);
        console.log('Transaction popup closed');

        await test.expect
          .poll(
            async () => {
              console.log('Polling for settled status...');
              const result = await withdrawTxLocator
                .getByText('Settled')
                .innerText()
                .then(() => true)
                .catch(() => false);
              console.log('Settled status result:', result);
              return result;
            },
            { timeout: 10000 },
          )
          .toBeTruthy();
        console.log('Withdrawal completed successfully');
      });
    });

    await test.step('Transaction list should show correct after refresh the page', async () => {
      console.log('Verifying transaction list persistence...');
      await goToTransactionsPage(page);
      await checkTxItemDone(page, depositEthTxId);
      await checkTxItemDone(page, withdrawEthTxId);
      console.log('Transaction list verified');
    });

    await test.step('Check if transaction list reacts correctly to fuel wallet changes', async () => {
      console.log('Testing account switching behavior...');
      await goToTransactionsPage(page);

      await test.step('Change to account 3 should keep previous account', async () => {
        console.log('Testing invalid account switch (Account 3)');
        await goToBridgePage(page);
        const connectedWalletBeforeSwitch = await page.getByLabel(
          'Fuel Local: Connected Wallet',
        );
        const addressBefore = await connectedWalletBeforeSwitch.innerText();
        await fuelWalletTestHelper.switchAccount('Account 3');
        const connectedWalletAfterSwitch = await getByAriaLabel(
          page,
          'Fuel Local: Connected Wallet',
        );
        const addressAfter = await connectedWalletAfterSwitch.innerText();

        expect(addressAfter).toEqual(addressBefore);
        await goToTransactionsPage(page);
      });

      await test.step('Change to account 1 should show transactions', async () => {
        console.log('Switching back to main account (Account 1)');
        await page.waitForTimeout(2000);
        await fuelWalletTestHelper.switchAccount('Account 1');
        await checkTxItemDone(page, depositEthTxId);
        await checkTxItemDone(page, withdrawEthTxId);
        console.log('Transaction list restored');
      });
    });
  });
});
