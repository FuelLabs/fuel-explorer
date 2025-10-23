import type { BrowserContext, Page } from '@playwright/test';
import { DEFAULT_DECIMAL_UNITS, type WalletUnlocked, bn } from 'fuels';
import type { HDAccount } from 'viem';
import {
  getButtonByText,
  getByAriaLabel,
  hasText,
} from '../../../../src/helpers/fuel-utils.js';
import { testExpect as expect, test } from '../fixtures';
import {
  checkTxItemDone,
  clickDepositTab,
  clickWithdrawTab,
  closeTransactionPopup,
  goToBridgePage,
  goToTransactionsPage,
  hasDropdownSymbol,
  proceedAnyways,
  selectToken,
} from '../utils/bridge';
import * as metamask from './metamask';

interface TestERC20TokenProps {
  browser: {
    page: Page;
    context: BrowserContext;
  };
  token: {
    symbol: string;
    decimals: number;
    erc20Contract: any;
    fuelTokenAddress: string;
  };
  account: HDAccount;
  fuelWallet: WalletUnlocked;
  fuelWalletTestHelper: any;
}

function generateNumberWithDecimals(decimals: number) {
  const digits = '123456789';
  const repeatedDigits = digits.repeat(Math.ceil(decimals / digits.length));
  return `0.${repeatedDigits.slice(0, decimals)}`;
}

// biome-ignore lint/suspicious/noExportsInTest: <explanation>
export const testERC20Token = async ({
  browser: { page, context },
  token: { symbol, decimals, erc20Contract, fuelTokenAddress },
  account,
  fuelWallet,
  fuelWalletTestHelper,
}: TestERC20TokenProps) => {
  const fuelDecimals =
    decimals < DEFAULT_DECIMAL_UNITS ? decimals : DEFAULT_DECIMAL_UNITS;
  let depositERC20TxId: string;
  let _withdrawEthTxId: string;
  let withdrawERC20TxId: string;

  await test.step(`Faucet ${symbol}`, async () => {
    const preFaucetBalance = (await erc20Contract.read.balanceOf([
      account.address,
    ])) as bigint;
    console.log('preFaucetBalance', preFaucetBalance);

    await goToBridgePage(page);
    await clickDepositTab(page);

    if (!preFaucetBalance || preFaucetBalance === 0n) {
      await test.step('Faucet ERC-20', async () => {
        console.log('Step Faucet ERC-20 1');
        const coinSelector = await getByAriaLabel(page, 'Coin Selector');
        await coinSelector.click();
        console.log('Step Faucet ERC-20 2');
        const faucetButton = await getByAriaLabel(page, `Faucet ${symbol}`);
        console.log('Step Faucet ERC-20 3');
        await faucetButton.click();
        console.log('Step Faucet ERC-20 4');
      });

      await test.step('Confirm on Metamask', async () => {
        console.log(`testERC20Token.ts Step: Faucet ${symbol} 1`);
        console.log(
          `[${new Date().toISOString()}] Waiting for metamask confirmation`,
        );
        // Timeout needed until https://github.com/Synthetixio/synpress/issues/795 is fixed
        console.log(`testERC20Token.ts Step: Faucet ${symbol} 2`);
        await page.waitForTimeout(20000);
        await metamask.confirmTransaction();
        console.log(
          `[${new Date().toISOString()}] Metamask transaction confirmed`,
        );
        console.log(`testERC20Token.ts Step: Faucet ${symbol} 3`);
      });

      await test.step('Close transaction popup', async () => {
        await page.waitForTimeout(1000);
        await closeTransactionPopup(page);
        await page.waitForTimeout(1000);
      });
    }
    const postFaucetBalance: bigint = await erc20Contract.read.balanceOf([
      account.address,
    ]);
    await test.step('Check faucet worked', async () => {
      console.log(`testERC20Token.ts Step: Faucet ${symbol} 4`);

      const coinSelector = await getByAriaLabel(page, 'Coin Selector');
      await coinSelector.click();
      await test.expect
        .poll(
          async () => {
            const formattedBalance = bn(postFaucetBalance?.toString()).format({
              units: decimals,
              precision: 3,
            });
            try {
              const balanceLocator = await getByAriaLabel(
                page,
                `${symbol} balance`,
              );
              const balanceText = await balanceLocator.innerText();
              return balanceText === formattedBalance;
            } catch (error) {
              console.log(
                `[${new Date().toISOString()}] Error checking ${symbol} balance:`,
                error,
              );
              return false;
            }
          },
          { timeout: 30000 },
        )
        .toBeTruthy();
    });

    await test.step(`Select ${symbol}`, async () => {
      console.log(`testERC20Token.ts Step: Faucet ${symbol} 5`);
      const tknItem = await getByAriaLabel(page, `${symbol} symbol`);
      await tknItem.click();
      console.log(`testERC20Token.ts Step: Faucet ${symbol} 6`);
      await hasDropdownSymbol(page, symbol);
      console.log(`testERC20Token.ts Step: Faucet ${symbol} 7`);
    });

    await test.step('Check balance display', async () => {
      await test.expect
        .poll(
          async () => {
            const formattedBalance = bn(postFaucetBalance?.toString()).format({
              units: decimals,
              precision: 3,
            });
            console.log('Checking balance text:', {
              expected: formattedBalance,
              symbol,
            });
            console.log(
              'Balance text:',
              await page.locator(':text("Balance: ")').innerText(),
            );

            const found = await hasText(page, `Balance: ${formattedBalance}`)
              .then(async (b) => {
                console.log('Balance text found:', await b.innerText());
                return await b.innerText();
              })
              .catch(async (b) => {
                console.log('Balance text not found:', await b.innerText());
                return await b.innerText();
              });
            return found;
          },
          { timeout: 60000 },
        )
        .toBeTruthy();
      console.log(`testERC20Token.ts Step: Faucet ${symbol} 8`);
    });
  });

  await test.step(`Deposit ${symbol} to Fuel`, async () => {
    console.log(`testERC20Token.ts Step: Deposit ${symbol} to Fuel`);
    await page.waitForTimeout(5000);
    await clickDepositTab(page);
    const preDepositBalanceFuel = await fuelWallet.getBalance(fuelTokenAddress);
    const preDepositBalanceEthTkn = await erc20Contract.read.balanceOf([
      account.address,
    ]);
    const DEPOSIT_AMOUNT = generateNumberWithDecimals(decimals);
    const FUEL_FORMATTED_DEPOSIT_AMOUNT = bn
      .parseUnits(DEPOSIT_AMOUNT, decimals)
      .format({
        units: decimals,
        precision: fuelDecimals,
      });
    console.log(
      `testERC20Token.ts Formatted deposit amount ${symbol}`,
      FUEL_FORMATTED_DEPOSIT_AMOUNT,
    );
    const FORMATTED_DEPOSIT_AMOUNT = bn
      .parseUnits(DEPOSIT_AMOUNT, decimals)
      .format({
        units: decimals,
        precision: 3,
      });
    console.log(
      `testERC20Token.ts Formatted deposit amount ${symbol}`,
      FORMATTED_DEPOSIT_AMOUNT,
    );
    let isPreAllowed = false;
    console.log(`testERC20Token.ts Is pre allowed ${symbol}`, isPreAllowed);
    await test.step(`Fill ${symbol} amount to deposit`, async () => {
      console.log(`testERC20Token.ts Step: Deposit ${symbol} to Fuel 1`);
      await hasDropdownSymbol(page, symbol);
      console.log(`testERC20Token.ts Has dropdown symbol ${symbol}`);
      // Deposit asset
      const depositInput = page.locator('.fuel-InputAmountField input');
      await depositInput.fill(FUEL_FORMATTED_DEPOSIT_AMOUNT);
      console.log(`testERC20Token.ts Filled deposit input ${symbol}`);
      await page.waitForTimeout(2000);
      const depositButton = await getByAriaLabel(page, 'Deposit', true);
      isPreAllowed = await depositButton.isVisible();
      console.log(`testERC20Token.ts Is pre allowed ${symbol}`, isPreAllowed);
    });

    await test.step('Approve allowance if needed transaction on Metamask', async () => {
      if (!isPreAllowed) {
        const approveButton = await getByAriaLabel(page, 'Approve', true);
        await approveButton.click();
        console.log(`testERC20Token.ts Step: Deposit ${symbol} to Fuel 2`);
        // Timeout needed until https://github.com/Synthetixio/synpress/issues/795 is fixed
        await page.waitForTimeout(7500);
        await metamask.confirmPermissionToSpend();

        await page
          .locator(`span:has-text("Allowance: ${FORMATTED_DEPOSIT_AMOUNT}")`)
          .waitFor();
      }
    });

    await test.step(`Deposit ${symbol}`, async () => {
      console.log(`testERC20Token.ts Step: Deposit ${symbol} to Fuel 3`);
      await hasDropdownSymbol(page, symbol);

      // Deposit asset
      if (isPreAllowed) {
        const depositButton = await getByAriaLabel(page, 'Deposit', true);
        await depositButton.click();
      }
      await page.waitForTimeout(20000);
      await metamask.confirmTransaction();
    });

    await test.step(`Check ${symbol} deposit transaction submitted to ETH network`, async () => {
      console.log(`testERC20Token.ts Step: Deposit ${symbol} to Fuel 4`);
      await page.locator(':nth-match(:text("Done"), 1)').waitFor();
      await page.locator(':nth-match(:text("Done"), 2)').waitFor();
    });

    await test.step(`Check ETH ${symbol} balance reduced`, async () => {
      console.log('testERC20Token.ts Step: 25');
      await test.expect
        .poll(
          async () => {
            const postDepositBalanceEthTkn = await erc20Contract.read.balanceOf(
              [account.address],
            );
            const diff = Number.parseFloat(
              bn(preDepositBalanceEthTkn.toString())
                .sub(postDepositBalanceEthTkn.toString())
                .format({ precision: fuelDecimals, units: decimals }),
            );
            console.log('Deposit balance check:', {
              pre: preDepositBalanceEthTkn.toString(),
              post: postDepositBalanceEthTkn.toString(),
              diff,
              expected: FUEL_FORMATTED_DEPOSIT_AMOUNT,
            });
            return diff;
          },
          { timeout: 30000 },
        )
        .toBeCloseTo(Number.parseFloat(FUEL_FORMATTED_DEPOSIT_AMOUNT));
    });

    await test.step('Check if deposit reach relay step', async () => {
      console.log(`testERC20Token.ts Step: Deposit ${symbol} to Fuel 5`);
      console.log('Getting Transaction ID element...');
      const txIdElement = await getByAriaLabel(page, 'Transaction ID');
      console.log('Getting Transaction ID text...');
      const txIdText = await txIdElement.innerText();
      console.log('Transaction ID text:', txIdText);
      depositERC20TxId = txIdText.trim();
      console.log('Trimmed Transaction ID:', depositERC20TxId);

      console.log('Getting Asset amount element...');
      await test.expect
        .poll(
          async () => {
            try {
              const assetAmount = await getByAriaLabel(page, 'Asset amount');
              if (!assetAmount) {
                console.log('Asset amount element not found');
                return null;
              }
              console.log('Getting Asset amount innerHTML...');
              const assetAmountText = await assetAmount.innerHTML();
              console.log('Asset amount text:', assetAmountText);
              const trimmedAmount = assetAmountText.trim();
              console.log('Asset amount check:', {
                received: trimmedAmount,
                expected: FUEL_FORMATTED_DEPOSIT_AMOUNT,
                match: trimmedAmount === FUEL_FORMATTED_DEPOSIT_AMOUNT,
              });

              // Also check if we can find it by text
              const amountByText = await page
                .getByText(FUEL_FORMATTED_DEPOSIT_AMOUNT, { exact: true })
                .count();
              console.log('Amount found by exact text:', amountByText);

              // Try to get all text content to see what's available
              const allText = await page.evaluate(
                () => document.body.textContent,
              );
              console.log(
                'All text content includes our amount:',
                allText.includes(FUEL_FORMATTED_DEPOSIT_AMOUNT),
              );

              return trimmedAmount;
            } catch (error) {
              console.log('Error getting asset amount:', error);
              return null;
            }
          },
          { timeout: 60000 },
        )
        .toBe(FUEL_FORMATTED_DEPOSIT_AMOUNT);
    });

    let depositTxLocator;
    await test.step('Check deposit tx in the Tx list and open popup', async () => {
      console.log(
        `[${new Date().toISOString()}] testERC20Token.ts Step: Deposit ${symbol} to Fuel 6`,
      );
      await closeTransactionPopup(page);
      console.log('testERC20Token.ts Step: Deposit 6.0');

      await goToTransactionsPage(page);
      console.log('testERC20Token.ts Step: Deposit 6.1');
      // check the transaction is there
      depositTxLocator = await getByAriaLabel(
        page,
        `Transaction ID: ${depositERC20TxId}`,
      );
      console.log(
        `[${new Date().toISOString()}] Transaction ID: ${depositERC20TxId} located`,
      );

      // Check that action required is shown
      const actionRequiredLocator =
        depositTxLocator.getByText('Action Required');
      await actionRequiredLocator.innerText();
      console.log(`[${new Date().toISOString()}] Action Required located`);

      // check if has correct asset amount
      const assetAmountLocator = depositTxLocator.getByText(
        `${FUEL_FORMATTED_DEPOSIT_AMOUNT} ${symbol}`,
      );
      await assetAmountLocator.innerText();
      console.log(
        `[${new Date().toISOString()}] Asset amount ${FUEL_FORMATTED_DEPOSIT_AMOUNT} ${symbol} located`,
      );

      // Confirm the transaction on the fuel side
      await depositTxLocator.click();
      console.log(
        `[${new Date().toISOString()}] Transaction confirmed on the fuel side`,
      );
    });

    await test.step('Relay transaction', async () => {
      console.log(`testERC20Token.ts Step: Deposit ${symbol} to Fuel 7`);
      const confirmTransactionButton = page.getByRole('button', {
        name: 'Confirm Transaction',
      });
      await expect(confirmTransactionButton).toBeEnabled({
        enabled: true,
        timeout: 5000,
      });
      await confirmTransactionButton.click();
    });

    await test.step('Confirm on Fuel Wallet', async () => {
      console.log(`testERC20Token.ts Step: Deposit ${symbol} to Fuel 8`);
      await fuelWalletTestHelper.walletApprove();
    });

    await test.step('Check deposit is completed', async () => {
      console.log(`testERC20Token.ts Step: Deposit ${symbol} to Fuel 9`);
      console.log('Waiting for Done text...');
      await page.locator(':nth-match(:text("Done"), 4)').waitFor();
      console.log('Done text found, closing transaction popup...');
      await closeTransactionPopup(page);

      await test.expect
        .poll(
          async () => {
            const postDepositBalanceFuel =
              await fuelWallet.getBalance(fuelTokenAddress);
            const diff = postDepositBalanceFuel
              .sub(preDepositBalanceFuel)
              .format({
                precision: fuelDecimals,
                units: fuelDecimals,
              });
            console.log('Fuel deposit balance check:', {
              pre: preDepositBalanceFuel.toString(),
              post: postDepositBalanceFuel.toString(),
              diff,
              expected: FUEL_FORMATTED_DEPOSIT_AMOUNT,
            });
            return diff;
          },
          { timeout: 30000 },
        )
        .toBe(FUEL_FORMATTED_DEPOSIT_AMOUNT);

      console.log('Checking if transaction is settled...');
      const statusLocator = depositTxLocator.getByText('Settled');
      await statusLocator.innerText();
      console.log('Transaction settled successfully');
    });
  });

  await test.step(`Withdraw ${symbol} from Fuel to ETH`, async () => {
    console.log(`testERC20Token.ts Step: Withdraw ${symbol} from Fuel to ETH`);
    const preWithdrawBalanceFuel =
      await fuelWallet.getBalance(fuelTokenAddress);
    const preWithdrawBalanceEth = await erc20Contract.read.balanceOf([
      account.address,
    ]);
    const WITHDRAW_AMOUNT = generateNumberWithDecimals(decimals);
    const FUEL_FORMATTED_WITHDRAW_AMOUNT = bn
      .parseUnits(WITHDRAW_AMOUNT, decimals)
      .format({
        units: decimals,
        precision: fuelDecimals,
      });

    await test.step('Fill data and click on withdraw', async () => {
      console.log(
        `testERC20Token.ts Step: Withdraw ${symbol} from Fuel to ETH 1`,
      );
      await goToBridgePage(page);
      await clickWithdrawTab(page);
      await selectToken(page, symbol);
      await hasDropdownSymbol(page, symbol);

      const withdrawInput = page.locator('.fuel-InputAmountField input');
      await withdrawInput.fill(FUEL_FORMATTED_WITHDRAW_AMOUNT);
      await page.waitForTimeout(2000);
      const withdrawButton = await getByAriaLabel(page, 'Withdraw', true);
      await withdrawButton.click();
    });

    await test.step('Approve transaction on Fuel Wallet', async () => {
      console.log(
        `testERC20Token.ts Step: Withdraw ${symbol} from Fuel to ETH 2`,
      );
      await page.waitForTimeout(2500);
      await fuelWalletTestHelper.walletApprove();
    });

    await test.step('TestERC20 Token: Check transaction submitted to FUEL network', async () => {
      console.log(
        `testERC20Token.ts Step: Withdraw ${symbol} from Fuel to ETH 3`,
      );
      // On withdraw we skip checking loading because it's blazingly fast on fuel
      await page.locator(':nth-match(:text("Done"), 1)').waitFor();

      // check time left feedback
      const stepSettlementLocator = await getByAriaLabel(page, ' left');
      await stepSettlementLocator.innerText();
    });

    await test.step('Check if get to relay action', async () => {
      console.log(
        `testERC20Token.ts Step: Withdraw symbol ${symbol} from Fuel to ETH 4`,
      );
      await page.waitForTimeout(20_000); // Wait transaction to be relayed
      await test.expect
        .poll(
          async () => {
            const actionRequired = await page
              .locator(':text("Action Required")')
              .count();
            return actionRequired > 0;
          },
          { timeout: 60000 },
        )
        .toBeTruthy();
      console.log(`Withdraw ${symbol} from Fuel to ETH 4.1`);
      // Check the popup is correct
      const withdrawTxElement = await getByAriaLabel(page, 'Transaction ID');
      withdrawERC20TxId = (await withdrawTxElement.innerText()).trim();
      console.log(`Withdraw ${symbol} from Fuel to ETH 4.2`, withdrawERC20TxId);
      const assetAmountWithdraw = await getByAriaLabel(page, 'Asset amount');
      console.log(
        `Withdraw ${symbol} from Fuel to ETH 4.3`,
        assetAmountWithdraw,
      );
      expect((await assetAmountWithdraw.innerHTML()).trim()).toBe(
        FUEL_FORMATTED_WITHDRAW_AMOUNT,
      );
      console.log(`Withdraw ${symbol} from Fuel to ETH 4.4`);
    });

    let withdrawTxLocator;
    await test.step('Check withdraw tx in the Tx list and open popup', async () => {
      console.log(
        `testERC20Token.ts Step: Withdraw ${symbol} from Fuel to ETH 5`,
      );
      await closeTransactionPopup(page);
      await goToTransactionsPage(page);
      // here

      // Wait for transactions to get fetched and sorted
      await page.waitForTimeout(2000);

      // Check the transaction is there
      withdrawTxLocator = await getByAriaLabel(
        page,
        `Transaction ID: ${withdrawERC20TxId}`,
      );

      const actionRequiredLocator =
        withdrawTxLocator.getByText('Action Required');
      await actionRequiredLocator.innerText();
      const assetAmountLocator = withdrawTxLocator.getByText(
        `${FUEL_FORMATTED_WITHDRAW_AMOUNT} ${symbol}`,
      );
      await assetAmountLocator.innerText();

      await assetAmountLocator.click();
    });

    await test.step('Relay transaction', async () => {
      console.log(
        `testERC20Token.ts Step: Withdraw ${symbol} from Fuel to ETH 6`,
      );
      const confirmButton = await getButtonByText(page, 'Confirm Transaction');
      await confirmButton.click();
    });

    await test.step('Confirm on Metamask', async () => {
      // For some reason we need this even if we wait for load state on the metamask notification page
      await page.waitForTimeout(3000);

      await proceedAnyways(context);

      // Timeout needed until https://github.com/Synthetixio/synpress/issues/795 is fixed
      await page.waitForTimeout(20000);
      await metamask.confirmTransaction();
    });

    await test.step('Check withdraw is completed', async () => {
      console.log(
        `testERC20Token.ts Step: Withdraw ${symbol} from Fuel to ETH 7`,
      );

      await test.expect
        .poll(
          async () => {
            const postWithdrawBalanceEth = await erc20Contract.read.balanceOf([
              account.address,
            ]);
            const diff = Number.parseFloat(
              bn(postWithdrawBalanceEth.toString())
                .sub(bn(preWithdrawBalanceEth.toString()))
                .format({
                  precision: fuelDecimals,
                  units: decimals,
                }),
            );
            console.log('Withdraw ETH balance check:', {
              pre: preWithdrawBalanceEth.toString(),
              post: postWithdrawBalanceEth.toString(),
              diff,
              expected: FUEL_FORMATTED_WITHDRAW_AMOUNT,
            });
            return diff;
          },
          { timeout: 30000 },
        )
        .toBeCloseTo(Number.parseFloat(FUEL_FORMATTED_WITHDRAW_AMOUNT));

      await test.expect
        .poll(
          async () => {
            const postWithdrawBalanceFuel =
              await fuelWallet.getBalance(fuelTokenAddress);
            const diff = preWithdrawBalanceFuel
              .sub(postWithdrawBalanceFuel)
              .format({ precision: fuelDecimals, units: fuelDecimals });
            console.log('Withdraw Fuel balance check:', {
              pre: preWithdrawBalanceFuel.toString(),
              post: postWithdrawBalanceFuel.toString(),
              diff,
              expected: FUEL_FORMATTED_WITHDRAW_AMOUNT,
            });
            return diff;
          },
          { timeout: 30000 },
        )
        .toBe(FUEL_FORMATTED_WITHDRAW_AMOUNT);

      await closeTransactionPopup(page);

      // check if it's settled on the list
      const statusLocator = withdrawTxLocator.getByText('Settled');
      await statusLocator.innerText();
    });
  });

  await test.step('Transaction list should show correct after refresh the page', async () => {
    console.log(
      'testERC20Token.ts Step: Transaction list should show correct after refresh the page',
    );
    await goToTransactionsPage(page);
    console.log(
      'testERC20Token.ts Step: Transaction list should show correct after refresh the page 1',
    );
    await test.expect
      .poll(
        async () => {
          return await checkTxItemDone(page, depositERC20TxId)
            .then(() => true)
            .catch(() => false);
        },
        { timeout: 600000 },
      )
      .toBeTruthy();
    console.log(
      'testERC20Token.ts Step: Transaction list should show correct after refresh the page 2',
    );
    await test.expect
      .poll(
        async () => {
          return await checkTxItemDone(page, withdrawERC20TxId)
            .then(() => true)
            .catch(() => false);
        },
        { timeout: 600000 },
      )
      .toBeTruthy();
  });
};
