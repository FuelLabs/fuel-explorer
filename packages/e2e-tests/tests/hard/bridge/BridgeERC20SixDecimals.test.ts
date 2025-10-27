import type { HexAddress } from 'app-commons';
import type { WalletUnlocked } from 'fuels';
import { type PublicClient, getContract } from 'viem';
import type { mnemonicToAccount } from 'viem/accounts';
import { CUSTOM_CONTRACT } from '../../../../app-portal/src/systems/Chains/eth/contracts/Erc20';
import type { FuelWalletTestHelper } from '../../../src/helpers/fuel-utils.js';
import { test } from './fixtures';
import { getBridgeTokenContracts } from './utils/contractIds';
import { init } from './utils/init';
import { setupBridge } from './utils/setupBridge';
import { testERC20Token } from './utils/testERC20Token';

// const fixturesBase = generateFixtures();
test.describe('Bridge USDC Token', () => {
  let fuelWallet: WalletUnlocked;
  let fuelWalletTestHelper: FuelWalletTestHelper;
  let account: ReturnType<typeof mnemonicToAccount>;
  let client: PublicClient;
  test('USDC test Token', async ({ page, context, extensionId }) => {
    await test.step('Setup wallet', async () => {
      const initData = await init({
        context,
        extensionId,
        page,
      });
      fuelWallet = initData.fuelWallet;
      fuelWalletTestHelper = initData.fuelWalletTestHelper;
      account = initData.account;
      client = initData.client;
    });

    await test.step('Deposit ETH', async () => {
      await setupBridge({
        test,
        page,
        fuelWallet,
        account,
        client,
        fuelWalletTestHelper,
      });
    });
    const bridgeTokenContracts = await getBridgeTokenContracts();
    const { USDC_ERC20, USDC_FUEL_Asset } = bridgeTokenContracts;
    const erc20USDCContract = getContract({
      abi: CUSTOM_CONTRACT.abi,
      address: USDC_ERC20 as HexAddress,
      client: {
        public: client,
      },
    });

    await testERC20Token({
      browser: { page, context },
      token: {
        symbol: 'USDC',
        decimals: 6,
        erc20Contract: erc20USDCContract,
        fuelTokenAddress: USDC_FUEL_Asset,
      },
      account,
      fuelWallet,
      fuelWalletTestHelper,
    });
  });
});
