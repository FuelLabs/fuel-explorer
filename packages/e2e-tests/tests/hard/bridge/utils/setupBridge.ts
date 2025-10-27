import { type WalletUnlocked, bn } from 'fuels';
import type { HDAccount, PublicClient } from 'viem';
import { getByAriaLabel } from '../../../../src/helpers/fuel-utils.js';
import * as metamask from './metamask';

import type { Page } from '@playwright/test';
import type { test as Test } from '../fixtures';
import {
  acceptTermsOfService,
  closeTransactionPopup,
  goToBridgePage,
  goToTransactionsPage,
  hasDropdownSymbol,
} from './bridge';
import { connectToFuel, connectToMetamask } from './wallets';

type FuelWalletTestHelper = any;

// biome-ignore lint/suspicious/noExportsInTest: <explanation>
export async function setupBridge({
  page,
  fuelWalletTestHelper,
  fuelWallet,
  account,
  client,
  test,
}: {
  test: typeof Test;
  page: Page;
  fuelWalletTestHelper: FuelWalletTestHelper;
  fuelWallet: WalletUnlocked;
  account: HDAccount;
  client: PublicClient;
}) {
  let depositEthTxId: string;
  await test.step('Connect to metamask', async () => {
    console.log('asd step Connect to metamask');
    await connectToMetamask(page);
  });

  await test.step('Connect to Fuel', async () => {
    console.log('asd step Connect to Fuel');
    await connectToFuel(page, fuelWalletTestHelper, ['Account 2', 'Account 4']);
  });

  const ETH_FUND_AMOUNT = '1.12345';
  const baseAssetId = await fuelWallet.provider.getBaseAssetId();

  await test.step('Fuel wallet should be connected after refresh', async () => {
    console.log('asd step Fuel wallet should be connected after refresh');
    await goToBridgePage(page);

    const connectedWallet = await getByAriaLabel(
      page,
      'Fuel Local: Connected Wallet',
    );
    const address = await connectedWallet.innerText();
    const balance = await getByAriaLabel(page, 'Balance');
    const balanceText = await balance.innerText();

    // refresh the page
    await page.goto('/bridge');

    const connectedWalletAferRefresh = await getByAriaLabel(
      page,
      'Fuel Local: Connected Wallet',
    );
    const addressAfterRefresh = await connectedWalletAferRefresh.innerText();
    const balanceAfterRefresh = await getByAriaLabel(page, 'Balance');
    const balanceTextAfterRefresh = await balanceAfterRefresh.innerText();

    test.expect(addressAfterRefresh).toEqual(address);
    test.expect(balanceTextAfterRefresh).toEqual(balanceText);
  });

  await test.step('Deposit ETH to Fuel', async () => {
    console.log('asd step Deposit ETH to Fuel');
    const preDepositBalanceFuel = await fuelWallet.getBalance(baseAssetId);
    const prevDepositBalanceEth = await client.getBalance({
      address: account.address,
    });

    await test.step('Fill data and click on deposit', async () => {
      console.log('asd step Deposit ETH to Fuel 1');
      await hasDropdownSymbol(page, 'ETH');
      const depositInput = page.locator('.fuel-InputAmountField input');
      await depositInput.fill(ETH_FUND_AMOUNT);
      await acceptTermsOfService(page);
      const depositButton = await getByAriaLabel(page, 'Deposit', true);
      await depositButton.click();
    });

    await test.step('Approve transaction on Metamask', async () => {
      console.log('asd step Deposit ETH to Fuel 2');
      // Timeout needed until https://github.com/Synthetixio/synpress/issues/795 is fixed
      await page.waitForTimeout(20000);
      console.log('asd step Confirming Deposit');
      await test.expect
        .poll(
          async () =>
            await metamask
              .confirmTransaction()
              .then(() => true)
              .catch(() => false),
          { timeout: 15000 },
        )
        .toBeTruthy();
    });

    await test.step('Check if deposit is completed', async () => {
      console.log('asd step Deposit ETH to Fuel 3');
      const assetAmountLocator = page
        .getByText('You may now close the popup')
        .first();
      await assetAmountLocator.innerText();

      console.log('asd step Deposit ETH to Fuel 3.1');
      await page.locator(':nth-match(:text("Done"), 1)').waitFor();
      console.log('asd step Deposit ETH to Fuel 3.2');
      await page.locator(':nth-match(:text("Done"), 3)').waitFor();
      console.log('asd step Deposit ETH to Fuel 3.3');
      const postDepositBalanceEth = await client.getBalance({
        address: account.address,
      });

      console.log('asd step Deposit ETH to Fuel 3.4');
      test
        .expect(
          Number.parseFloat(
            bn(prevDepositBalanceEth.toString())
              .sub(postDepositBalanceEth.toString())
              .format({ precision: 6, units: 18 }),
          ),
        )
        .toBeCloseTo(Number.parseFloat(ETH_FUND_AMOUNT));
      console.log('asd step Deposit ETH to Fuel 3.5');
      // check the popup is correct
      const transactionIdElement = await getByAriaLabel(page, 'Transaction ID');
      depositEthTxId = (await transactionIdElement.innerText()).trim();
      console.log('asd step Deposit ETH to Fuel 3.6');
      const assetAmount = await getByAriaLabel(page, 'Asset amount');
      test.expect((await assetAmount.innerHTML()).trim()).toBe(ETH_FUND_AMOUNT);
    });

    await test.step('Check deposit tx in the Tx list', async () => {
      console.log('asd step Deposit ETH to Fuel 3.7');
      await closeTransactionPopup(page);

      await page.waitForTimeout(10000);
      await test.expect
        .poll(
          async () => {
            const postDepositBalanceFuel =
              await fuelWallet.getBalance(baseAssetId);
            return (
              postDepositBalanceFuel.gte(preDepositBalanceFuel)
                ? postDepositBalanceFuel.sub(preDepositBalanceFuel)
                : preDepositBalanceFuel.sub(postDepositBalanceFuel)
            ).format({ precision: 6, units: 9 });
          },
          { timeout: 10000 },
        )
        .toBe(ETH_FUND_AMOUNT);

      await goToTransactionsPage(page);

      // check the transaction is there
      const depositLocator = await getByAriaLabel(
        page,
        `Transaction ID: ${depositEthTxId}`,
      );

      // check if has correct asset amount
      const assetAmountLocator = depositLocator.getByText(
        `${ETH_FUND_AMOUNT} ETH`,
      );
      await assetAmountLocator.innerText();

      // check if it's settled on the list
      const statusLocator = depositLocator.getByText('Settled');
      await statusLocator.innerText();
    });
  });
  return { depositEthTxId: depositEthTxId! };
}
