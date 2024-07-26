import {
  type FuelWalletTestHelper,
  getButtonByText,
  getByAriaLabel,
  hasText,
} from '@fuels/playwright-utils';
import * as metamask from '@synthetixio/synpress/commands/metamask';
import type { BigNumberish, WalletUnlocked } from 'fuels';
import { bn, format } from 'fuels';
import type { HDAccount, PublicClient } from 'viem';
import { http, createPublicClient, getContract } from 'viem';
import { foundry } from 'viem/chains';

import { ERC_20 } from '../../../../app-portal/src/systems/Chains/eth/contracts/Erc20';

import { expect, test } from './fixtures';
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
} from './utils/bridge';
import { getBridgeTokenContracts } from './utils/contractIds';
import {
  connectToFuel,
  connectToMetamask,
  setupFuelWallet,
} from './utils/wallets';

test.describe('Bridge', () => {
  let client: PublicClient;
  let account: HDAccount;
  let fuelWallet: WalletUnlocked;
  let erc20Contract;
  let fuelWalletTestHelper: FuelWalletTestHelper;

  test.beforeEach(async ({ context, extensionId, page }) => {
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

    await page.goto('/bridge');
  });
  test('e2e', async ({ page, context }) => {
    await test.step('Connect to Fuel', async () => {
      await connectToFuel(page, fuelWalletTestHelper, [
        'Account 2',
        'Account 4',
      ]);
    });

    await test.step('Connect to metamask', async () => {
      await connectToMetamask(page);
    });

    const DEPOSIT_AMOUNT = '1.12345';
    const WITHDRAW_AMOUNT = '0.012345';

    let depositEthTxId: string;
    let withdrawEthTxId: string;
    let depositERC20TxId: string;
    let withdrawERC20TxId: string;

    const bridgeTokenContracts = await getBridgeTokenContracts();
    const { ETH_ERC20, FUEL_TokenAsset } = bridgeTokenContracts;

    erc20Contract = getContract({
      abi: ERC_20.abi,
      address: ETH_ERC20 as `0x${string}`,
      client: {
        public: client,
      },
    });
    const baseAssetId = fuelWallet.provider.getBaseAssetId();

    await test.step('Deposit ETH to Fuel', async () => {
      const preDepositBalanceFuel = await fuelWallet.getBalance(baseAssetId);
      const prevDepositBalanceEth = await client.getBalance({
        address: account.address,
      });

      await test.step('Fill data and click on deposit', async () => {
        await hasDropdownSymbol(page, 'ETH');
        const depositInput = page.locator('.fuel-InputAmount input');
        await depositInput.fill(DEPOSIT_AMOUNT);
        const depositButton = getByAriaLabel(page, 'Deposit', true);
        await depositButton.click();
      });

      await test.step('Approve transaction on Metamask', async () => {
        // Timeout needed until https://github.com/Synthetixio/synpress/issues/795 is fixed
        await page.waitForTimeout(2000);
        await metamask.confirmTransaction();
      });

      await test.step('Check if deposit is completed', async () => {
        await page.locator(':nth-match(:text("Done"), 1)').waitFor();
        await page.locator(':nth-match(:text("Done"), 3)').waitFor();

        const postDepositBalanceEth = await client.getBalance({
          address: account.address,
        });

        expect(
          Number.parseFloat(
            bn(prevDepositBalanceEth.toString())
              .sub(postDepositBalanceEth.toString())
              .format({ precision: 6, units: 18 }),
          ),
        ).toBeCloseTo(Number.parseFloat(DEPOSIT_AMOUNT));

        // check the popup is correct
        depositEthTxId = (
          await getByAriaLabel(page, 'Transaction ID').innerText()
        ).trim();
        const assetAmount = getByAriaLabel(page, 'Asset amount');
        expect((await assetAmount.innerHTML()).trim()).toBe(DEPOSIT_AMOUNT);
      });

      await test.step('Check deposit tx in the Tx list', async () => {
        await closeTransactionPopup(page);

        const postDepositBalanceFuel = await fuelWallet.getBalance(baseAssetId);

        expect(
          postDepositBalanceFuel
            .sub(preDepositBalanceFuel)
            .format({ precision: 6, units: 9 }),
        ).toBe(DEPOSIT_AMOUNT);

        await goToTransactionsPage(page);

        // check the transaction is there
        const depositLocator = getByAriaLabel(
          page,
          `Transaction ID: ${depositEthTxId}`,
        );

        // check if has correct asset amount
        const assetAmountLocator = depositLocator.getByText(
          `${DEPOSIT_AMOUNT} ETH`,
        );
        await assetAmountLocator.innerText();

        // check if it's settled on the list
        const statusLocator = depositLocator.getByText('Settled');
        await statusLocator.innerText();
      });
    });

    await test.step('Withdraw ETH from Fuel', async () => {
      const preWithdrawBalanceFuel = await fuelWallet.getBalance(baseAssetId);
      const prevWithdrawBalanceEth = await client.getBalance({
        address: account.address,
      });

      await test.step('Fill data and click on withdraw', async () => {
        await goToBridgePage(page);
        await clickWithdrawTab(page);
        await hasDropdownSymbol(page, 'ETH');

        const withdrawInput = page.locator('.fuel-InputAmount input');
        await withdrawInput.fill(WITHDRAW_AMOUNT);
        const withdrawButton = getByAriaLabel(page, 'Withdraw', true);
        await withdrawButton.click();
      });

      await test.step('Approve transaction on Fuel Wallet', async () => {
        await fuelWalletTestHelper.walletApprove();
      });

      await test.step('Check transaction submitted to FUEL network', async () => {
        // On withdraw we skip checking loading because it's blazingly fast on fuel
        await page.locator(':nth-match(:text("Done"), 1)').waitFor();

        // check time left feedback
        const stepSettlementLocator = getByAriaLabel(page, ' left');
        await stepSettlementLocator.innerText();
      });

      await test.step('Check if get to relay action', async () => {
        await page.locator(':text("Action Required")').waitFor();

        // Check the popup is correct
        withdrawEthTxId = (
          await getByAriaLabel(page, 'Transaction ID').innerText()
        ).trim();
        const assetAmountWithdraw = getByAriaLabel(page, 'Asset amount');
        expect((await assetAmountWithdraw.innerHTML()).trim()).toBe(
          WITHDRAW_AMOUNT,
        );
      });

      let withdrawTxLocator;
      await test.step('Check withdraw tx in the Tx list and open popup', async () => {
        await closeTransactionPopup(page);
        await goToTransactionsPage(page);

        // Wait for transactions to get fetched and sorted
        await page.waitForTimeout(2000);

        // Check the transaction is there
        withdrawTxLocator = getByAriaLabel(
          page,
          `Transaction ID: ${withdrawEthTxId}`,
        );

        const assetAmountLocator = withdrawTxLocator.getByText(
          `${WITHDRAW_AMOUNT} ETH`,
        );
        await assetAmountLocator.innerText();

        await assetAmountLocator.click();
      });

      await test.step('Relay transaction', async () => {
        await page.waitForTimeout(10000);
        const confirmButton = getButtonByText(page, 'Confirm Transaction');
        await confirmButton.click();
      });

      await test.step('Confirm on Metamask', async () => {
        // For some reason we need this even if we wait for load state on the metamask notification page
        await page.waitForTimeout(3000);

        await proceedAnyways(context);

        // Timeout needed until https://github.com/Synthetixio/synpress/issues/795 is fixed
        await page.waitForTimeout(10000);
        await metamask.confirmTransaction();
      });

      await test.step('Check withdraw is completed', async () => {
        const postWithdrawBalanceEth = await client.getBalance({
          address: account.address,
        });
        const postWithdrawBalanceFuel =
          await fuelWallet.getBalance(baseAssetId);

        expect(
          Number.parseFloat(
            bn(postWithdrawBalanceEth.toString())
              .sub(bn(prevWithdrawBalanceEth.toString()))
              .format({ precision: 6, units: 18 }),
          ),
        ).toBeCloseTo(0.0122);

        expect(
          preWithdrawBalanceFuel
            .sub(postWithdrawBalanceFuel)
            .format({ precision: 6, units: 9 }),
        ).toBe('0.012345');

        await closeTransactionPopup(page);

        // check if it's settled on the list
        const statusLocator = withdrawTxLocator.getByText('Settled');
        await statusLocator.innerText();
      });
    });

    await test.step('Faucet TKN', async () => {
      const preFaucetBalance = (await erc20Contract.read.balanceOf([
        account.address,
      ])) as BigNumberish;

      await test.step('Faucet ERC-20', async () => {
        await goToBridgePage(page);
        await clickDepositTab(page);

        const coinSelector = getByAriaLabel(page, 'Coin Selector');
        await coinSelector.click();

        const faucetButton = getByAriaLabel(page, 'Faucet Eth Asset');
        await faucetButton.click();
      });

      await test.step('Confirm on Metamask', async () => {
        // Timeout needed until https://github.com/Synthetixio/synpress/issues/795 is fixed
        await page.waitForTimeout(2000);
        await metamask.confirmTransaction();
      });

      let postFaucetBalance;
      await test.step('Check faucet worked', async () => {
        postFaucetBalance = await erc20Contract.read.balanceOf([
          account.address,
        ]);
        expect(String(postFaucetBalance)).toBe(
          bn(preFaucetBalance).add(bn.parseUnits('1000000', 18)).toString(),
        );
      });

      await test.step('Select TKN', async () => {
        const tknItem = getByAriaLabel(page, 'TKN symbol');
        await tknItem.click();
        await hasDropdownSymbol(page, 'TKN');
      });

      await hasText(
        page,
        `Balance: ${format(postFaucetBalance as BigNumberish, {
          units: 18,
          precision: 3,
        })}`,
      );
    });

    await test.step('Deposit TKN to Fuel', async () => {
      await clickDepositTab(page);
      const preDepositBalanceFuel =
        await fuelWallet.getBalance(FUEL_TokenAsset);
      const preDepositBalanceEth = await erc20Contract.read.balanceOf([
        account.address,
      ]);
      const DEPOSIT_AMOUNT = '1.12345';

      await test.step('Fill data and click on deposit', async () => {
        await hasDropdownSymbol(page, 'TKN');

        // Deposit asset
        const depositInput = page.locator('.fuel-InputAmount input');
        await depositInput.fill(DEPOSIT_AMOUNT);
        const depositButton = getByAriaLabel(page, 'Deposit', true);
        await depositButton.click();
      });

      await test.step('Approve transaction on Metamask', async () => {
        // Timeout needed until https://github.com/Synthetixio/synpress/issues/795 is fixed
        await page.waitForTimeout(7500);
        await metamask.confirmPermissionToSpend();
        await metamask.confirmTransaction();
      });

      await test.step('Check transaction submitted to ETH network', async () => {
        await page.locator(':nth-match(:text("Done"), 1)').waitFor();
        await page.locator(':nth-match(:text("Done"), 2)').waitFor();
      });

      await test.step('Check ETH TKN balance reduced', async () => {
        const postDepositBalanceEth = await erc20Contract.read.balanceOf([
          account.address,
        ]);

        expect(
          Number.parseFloat(
            bn(preDepositBalanceEth.toString())
              .sub(postDepositBalanceEth.toString())
              .format({ precision: 6, units: 18 }),
          ),
        ).toBeCloseTo(Number.parseFloat(DEPOSIT_AMOUNT));
      });

      await test.step('Check if deposit reach relay step', async () => {
        depositERC20TxId = (
          await getByAriaLabel(page, 'Transaction ID').innerText()
        ).trim();
        const assetAmount = getByAriaLabel(page, 'Asset amount');
        expect((await assetAmount.innerHTML()).trim()).toBe(DEPOSIT_AMOUNT);
      });

      let depositTxLocator;
      await test.step('Check deposit tx in the Tx list and open popup', async () => {
        await closeTransactionPopup(page);
        await goToTransactionsPage(page);

        // check the transaction is there
        depositTxLocator = getByAriaLabel(
          page,
          `Transaction ID: ${depositERC20TxId}`,
        );
        // Check that action required is shown
        const actionRequiredLocator =
          depositTxLocator.getByText('Action Required');
        await actionRequiredLocator.innerText();
        // check if has correct asset amount
        const assetAmountLocator = depositTxLocator.getByText(
          `${DEPOSIT_AMOUNT} TKN`,
        );
        await assetAmountLocator.innerText();

        // Confirm the transaction on the fuel side
        await depositTxLocator.click();
      });

      await test.step('Relay transaction', async () => {
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
        await fuelWalletTestHelper.walletApprove();
      });

      await test.step('Check deposit is completed', async () => {
        await page.locator(':nth-match(:text("Done"), 4)').waitFor();
        await closeTransactionPopup(page);

        const postDepositBalanceFuel =
          await fuelWallet.getBalance(FUEL_TokenAsset);

        expect(
          postDepositBalanceFuel
            .sub(preDepositBalanceFuel)
            .format({ precision: 6, units: 9 }),
        ).toBe(DEPOSIT_AMOUNT);

        // check if it's settled on the list
        const statusLocator = depositTxLocator.getByText('Settled');
        await statusLocator.innerText();
      });
    });

    await test.step('Withdraw TKN from Fuel to ETH', async () => {
      const preWithdrawBalanceFuel =
        await fuelWallet.getBalance(FUEL_TokenAsset);
      const preWithdrawBalanceEth = await erc20Contract.read.balanceOf([
        account.address,
      ]);
      const WITHDRAW_AMOUNT = '0.012345';

      await test.step('Fill data and click on withdraw', async () => {
        await goToBridgePage(page);
        await clickWithdrawTab(page);
        await selectToken(page, 'TKN');
        await hasDropdownSymbol(page, 'TKN');

        const withdrawInput = page.locator('.fuel-InputAmount input');
        await withdrawInput.fill(WITHDRAW_AMOUNT);
        const withdrawButton = getByAriaLabel(page, 'Withdraw', true);
        await withdrawButton.click();
      });

      await test.step('Approve transaction on Fuel Wallet', async () => {
        await page.waitForTimeout(2500);
        await fuelWalletTestHelper.walletApprove();
      });

      await test.step('Check transaction submitted to FUEL network', async () => {
        // On withdraw we skip checking loading because it's blazingly fast on fuel
        await page.locator(':nth-match(:text("Done"), 1)').waitFor();

        // check time left feedback
        const stepSettlementLocator = getByAriaLabel(page, ' left');
        await stepSettlementLocator.innerText();
      });

      await test.step('Check if get to relay action', async () => {
        await page.locator(':text("Action Required")').waitFor();

        // Check the popup is correct
        withdrawERC20TxId = (
          await getByAriaLabel(page, 'Transaction ID').innerText()
        ).trim();
        const assetAmountWithdraw = getByAriaLabel(page, 'Asset amount');
        expect((await assetAmountWithdraw.innerHTML()).trim()).toBe(
          WITHDRAW_AMOUNT,
        );
      });

      let withdrawTxLocator;
      await test.step('Check withdraw tx in the Tx list and open popup', async () => {
        await closeTransactionPopup(page);
        await goToTransactionsPage(page);

        // Wait for transactions to get fetched and sorted
        await page.waitForTimeout(2000);

        // Check the transaction is there
        withdrawTxLocator = getByAriaLabel(
          page,
          `Transaction ID: ${withdrawERC20TxId}`,
        );

        const actionRequiredLocator =
          withdrawTxLocator.getByText('Action Required');
        await actionRequiredLocator.innerText();
        const assetAmountLocator = withdrawTxLocator.getByText(
          `${WITHDRAW_AMOUNT} TKN`,
        );
        await assetAmountLocator.innerText();

        await assetAmountLocator.click();
      });

      await test.step('Relay transaction', async () => {
        const confirmButton = getButtonByText(page, 'Confirm Transaction');
        await confirmButton.click();
      });

      await test.step('Confirm on Metamask', async () => {
        // For some reason we need this even if we wait for load state on the metamask notification page
        await page.waitForTimeout(3000);

        await proceedAnyways(context);

        // Timeout needed until https://github.com/Synthetixio/synpress/issues/795 is fixed
        await page.waitForTimeout(5000);
        await metamask.confirmTransaction();
      });

      await test.step('Check withdraw is completed', async () => {
        const postWithdrawBalanceEth = await erc20Contract.read.balanceOf([
          account.address,
        ]);
        const postWithdrawBalanceFuel =
          await fuelWallet.getBalance(FUEL_TokenAsset);

        expect(
          Number.parseFloat(
            bn(postWithdrawBalanceEth.toString())
              .sub(bn(preWithdrawBalanceEth.toString()))
              .format({ precision: 6, units: 18 }),
          ),
        ).toBeCloseTo(Number.parseFloat(WITHDRAW_AMOUNT));

        expect(
          preWithdrawBalanceFuel
            .sub(postWithdrawBalanceFuel)
            .format({ precision: 6, units: 9 }),
        ).toBe(WITHDRAW_AMOUNT);
        await closeTransactionPopup(page);

        // check if it's settled on the list
        const statusLocator = withdrawTxLocator.getByText('Settled');
        await statusLocator.innerText();
      });
    });

    await test.step('Transaction list should show correct after refresh the page', async () => {
      await page.goto('/bridge');
      await goToTransactionsPage(page);

      const loading = getByAriaLabel(page, 'Loading Bridge Transactions');
      await loading.innerText();

      await checkTxItemDone(page, depositEthTxId);
      await checkTxItemDone(page, depositERC20TxId);
      await checkTxItemDone(page, withdrawEthTxId);
      await checkTxItemDone(page, withdrawERC20TxId);
    });

    await test.step('Fuel wallet should be connected after refresh', async () => {
      await goToBridgePage(page);

      const connectedWallet = getByAriaLabel(
        page,
        'Fuel Local: Connected Wallet',
      );
      const address = await connectedWallet.innerText();
      const balance = getByAriaLabel(page, 'Balance: ');
      const balanceText = await balance.innerText();

      // refresh the page
      await page.goto('/bridge');

      const connectedWalletAferRefresh = getByAriaLabel(
        page,
        'Fuel Local: Connected Wallet',
      );
      const addressAfterRefresh = await connectedWalletAferRefresh.innerText();
      const balanceAfterRefresh = getByAriaLabel(page, 'Balance: ');
      const balanceTextAfterRefresh = await balanceAfterRefresh.innerText();

      expect(addressAfterRefresh).toEqual(address);
      expect(balanceTextAfterRefresh).toEqual(balanceText);
    });

    await test.step('Check if transaction list reacts correctly to fuel wallet changes', async () => {
      await goToTransactionsPage(page);

      await test.step('Change to account 2 should show empty feedback', async () => {
        await fuelWalletTestHelper.switchAccount('Account 2');
        const noActivity = page.getByText('No activity yet');
        await noActivity.innerText();
        const subText = page.getByText(
          "When you make a transaction you'll see it here",
        );
        await subText.innerText();
      });

      await test.step('Change to account 3 should show connect', async () => {
        await fuelWalletTestHelper.switchAccount('Account 3');
        const notDetected = page.getByText('Wallet not detected');
        await notDetected.innerText();
        const subText = page.getByText(
          'Connect a wallet to see your transactions',
        );
        await subText.innerText();
        const connectButton = getButtonByText(page, 'Connect Fuel Wallet');
        expect(await connectButton.count()).toBe(1);
      });

      await test.step('Change to account 1 should show transactions', async () => {
        await page.waitForTimeout(2000);
        await fuelWalletTestHelper.switchAccount('Account 1');
        await checkTxItemDone(page, depositEthTxId);
        await checkTxItemDone(page, depositERC20TxId);
        await checkTxItemDone(page, withdrawEthTxId);
        await checkTxItemDone(page, withdrawERC20TxId);
      });
    });

    await test.step('Deposit TKN before Fuel wallet has ETH', async () => {
      await fuelWalletTestHelper.switchAccount('Account 4');
      await goToBridgePage(page);
      await clickDepositTab(page);
      await selectToken(page, 'TKN');
      const preDepositBalanceTkn = await erc20Contract.read.balanceOf([
        account.address,
      ]);

      // Deposit asset
      const depositAmount = '1.12345';
      const depositInput = page.locator('.fuel-InputAmount input');
      await depositInput.fill(depositAmount);

      await test.step('Test deposit alert', async () => {
        // Test alert
        await hasText(
          page,
          "You don't have any ETH on Fuel to pay for gas. We recommend you bridge some ETH before you bridge any other assets.",
        );
        const bridgeButton = getByAriaLabel(page, 'Bridge asset anyway', true);
        await expect(bridgeButton).toHaveText('Bridge asset anyway', {
          useInnerText: true,
        });
      });

      await test.step('Test deposit toast error message', async () => {
        const depositButton = getByAriaLabel(page, 'Bridge asset anyway', true);
        await depositButton.click();

        // Timeout needed until https://github.com/Synthetixio/synpress/issues/795 is fixed
        await page.waitForTimeout(7500);
        await metamask.confirmPermissionToSpend();
        await metamask.confirmTransaction();

        await page.locator(':nth-match(:text("Done"), 1)').waitFor();
        await page.locator(':nth-match(:text("Done"), 2)').waitFor();

        const postDepositBalanceTkn = await erc20Contract.read.balanceOf([
          account.address,
        ]);

        expect(
          Number.parseFloat(
            bn(preDepositBalanceTkn.toString())
              .sub(postDepositBalanceTkn.toString())
              .format({ precision: 6, units: 18 }),
          ),
        ).toBeCloseTo(Number.parseFloat(depositAmount));

        const confirmTransactionButton = page.getByRole('button', {
          name: 'Confirm Transaction',
        });
        await confirmTransactionButton.click();

        await hasText(
          page,
          'This transaction requires ETH on Fuel to pay for gas. Please faucet your wallet or bridge ETH.',
        );
      });
      await closeTransactionPopup(page);
    });
  });
});
