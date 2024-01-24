import * as metamask from '@synthetixio/synpress/commands/metamask';
import type { WalletUnlocked } from 'fuels';
import { BaseAssetId, Wallet, bn } from 'fuels';
import type { HDAccount } from 'viem';
import { createPublicClient, http } from 'viem';
import { mnemonicToAccount } from 'viem/accounts';
import { foundry } from 'viem/chains';
import type { PublicClient } from 'wagmi';

import {
  getByAriaLabel,
  getButtonByText,
  walletSetup,
  walletApprove,
  walletConnect,
} from '../commons';
import { ETH_MNEMONIC, FUEL_MNEMONIC } from '../mocks';

import { test, expect } from './fixtures';

test.describe('Bridge', () => {
  let client: PublicClient;
  let account: HDAccount;
  let fuelWallet: WalletUnlocked;

  test.beforeEach(async ({ context, extensionId, page }) => {
    await walletSetup(context, extensionId, page);
    client = createPublicClient({
      chain: foundry,
      transport: http(),
    });
    account = mnemonicToAccount(ETH_MNEMONIC);
    fuelWallet = Wallet.fromMnemonic(FUEL_MNEMONIC);
    await page.goto('/');
  });

  test('e2e', async ({ context, page }) => {
    const hasFuel = await page.evaluate(() => {
      return typeof window.fuel === 'object';
    });
    expect(hasFuel).toBeTruthy();

    await page.bringToFront();

    // Go to the bridge page
    let bridgePage = page.locator('a').getByText('Bridge');
    await bridgePage.click();

    // Connect metamask
    const connectKitButton = getByAriaLabel(page, 'Connect Ethereum Wallet');
    await connectKitButton.click();
    const metamaskConnect = getButtonByText(page, 'Metamask');
    await metamaskConnect.click();
    await metamask.acceptAccess();

    // Connect fuel
    const connectFuel = getByAriaLabel(page, 'Connect Fuel Wallet');
    await connectFuel.click();
    await walletConnect(context);

    const preDepositBalanceFuel = await fuelWallet.getBalance(BaseAssetId);
    const prevDepositBalanceEth = await client.getBalance({
      address: account.address,
    });

    // Deposit asset
    const depositAmount = '1.12345';
    const depositInput = page.locator('input');
    await depositInput.fill(depositAmount);
    const depositButton = getByAriaLabel(page, 'Deposit');
    await depositButton.click();

    // Timeout needed until https://github.com/Synthetixio/synpress/issues/795 is fixed
    await page.waitForTimeout(10000);
    await metamask.confirmTransaction();

    // Check steps
    await page.locator(':nth-match(:text("Done"), 3)').waitFor();

    const postDepositBalanceEth = await client.getBalance({
      address: account.address,
    });

    expect(
      parseFloat(
        bn(prevDepositBalanceEth.toString())
          .sub(postDepositBalanceEth.toString())
          .format({ precision: 6, units: 18 })
      )
    ).toBeCloseTo(parseFloat(depositAmount));

    // check the popup is correct
    const assetAmount = getByAriaLabel(page, 'Asset amount');
    expect((await assetAmount.innerHTML()).trim()).toBe(depositAmount);
    const closeEthPopup = getByAriaLabel(page, 'Close Transaction Dialog');
    await closeEthPopup.click();

    const postDepositBalanceFuel = await fuelWallet.getBalance(BaseAssetId);

    expect(
      postDepositBalanceFuel
        .sub(preDepositBalanceFuel)
        .format({ precision: 6, units: 9 })
    ).toBe(depositAmount);

    // Go to transaction page
    const transactionList = page.locator('a').getByText('Transactions');
    await transactionList.click();

    // check the transaction is there
    let transactionAssetAmount = getByAriaLabel(page, 'Asset amount');
    expect((await transactionAssetAmount.first().innerHTML()).trim()).toBe(
      `${depositAmount} ETH`
    );

    // Go to the bridge page
    bridgePage = page
      .locator('div')
      .filter({ hasText: 'BridgeTransactions' })
      .getByRole('link', { name: 'Bridge ' });
    await bridgePage.first().click();

    // Go to the withdraw page
    const withdrawPage = getButtonByText(page, 'Withdraw from Fuel');
    await withdrawPage.click();

    const preWithdrawBalanceFuel = await fuelWallet.getBalance(BaseAssetId);
    const prevWithdrawBalanceEth = await client.getBalance({
      address: account.address,
    });

    // Withdraw asset
    const withdrawAmount = '0.012345';
    const withdrawInput = page.locator('input');
    await withdrawInput.fill(withdrawAmount);
    const withdrawButton = getByAriaLabel(page, 'Withdraw');
    await withdrawButton.click();
    await walletApprove(context);

    await page.locator(':text("Action Required")').waitFor();

    // Check the popup is correct
    const assetAmountWithdraw = getByAriaLabel(page, 'Asset amount');
    expect((await assetAmountWithdraw.innerHTML()).trim()).toBe(withdrawAmount);
    const closeEthPopupWithdraw = getByAriaLabel(
      page,
      'Close Transaction Dialog'
    );
    await closeEthPopupWithdraw.click();

    // Go to the transaction page
    await transactionList.click();

    // Wait for transactions to get fetched and sorted
    await page.waitForTimeout(10000);

    transactionAssetAmount = getByAriaLabel(page, 'Asset amount');
    // Check the transaction is there
    expect((await transactionAssetAmount.first().innerHTML()).trim()).toBe(
      `${withdrawAmount} ETH`
    );

    await transactionAssetAmount.first().click();
    await page.waitForTimeout(5000);
    const confirmButton = getButtonByText(page, 'Confirm Transaction');
    await confirmButton.click();

    // For some reason we need this even if we wait for load state on the metamask notification page
    await page.waitForTimeout(3000);

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

    // Timeout needed until https://github.com/Synthetixio/synpress/issues/795 is fixed
    await page.waitForTimeout(10000);
    await metamask.confirmTransaction();

    const postWithdrawBalanceEth = await client.getBalance({
      address: account.address,
    });
    const postWithdrawBalanceFuel = await fuelWallet.getBalance(BaseAssetId);

    // We only divide by 15 bc bigint does not support decimals
    expect(
      parseFloat(
        bn(postWithdrawBalanceEth.toString())
          .sub(bn(prevWithdrawBalanceEth.toString()))
          .format({ precision: 6, units: 18 })
      )
    ).toBeCloseTo(0.0122);

    expect(
      preWithdrawBalanceFuel
        .sub(postWithdrawBalanceFuel)
        .format({ precision: 6, units: 9 })
    ).toBe('0.012345');
  });
});
