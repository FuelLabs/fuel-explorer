import type { HexAddress } from 'app-commons';
import type { WalletUnlocked } from 'fuels';
import { type PublicClient, getContract } from 'viem';
import type { mnemonicToAccount } from 'viem/accounts';
import { ERC_20 } from '../../../../app-portal/src/systems/Chains/eth/contracts/Erc20';
import type { FuelWalletTestHelper } from '../../../src/helpers/fuel-utils.js';
import { test } from './fixtures';
import { getBridgeTokenContracts } from './utils/contractIds';
import { init } from './utils/init';
import { setupBridge } from './utils/setupBridge';
import { testERC20Token } from './utils/testERC20Token';

test.describe('Bridge TKN Token', () => {
  test.slow();
  let fuelWallet: WalletUnlocked;
  let fuelWalletTestHelper: FuelWalletTestHelper;
  let account: ReturnType<typeof mnemonicToAccount>;
  let client: PublicClient;
  test('TKN test Token', async ({ page, context, extensionId }) => {
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
      console.log('Bridge ETH');
    });
    const bridgeTokenContracts = await getBridgeTokenContracts();
    console.log('bridgeTokenContracts', bridgeTokenContracts);
    const { ETH_ERC20, FUEL_TokenAsset } = bridgeTokenContracts;
    const erc20Contract = getContract({
      abi: ERC_20.abi,
      address: ETH_ERC20 as HexAddress,
      client: {
        public: client,
      },
    });
    await testERC20Token({
      browser: { page, context },
      token: {
        symbol: 'TKN',
        decimals: 18,
        erc20Contract,
        fuelTokenAddress: FUEL_TokenAsset,
      },
      account,
      fuelWallet,
      fuelWalletTestHelper,
    });
    console.log('TKN test Token');
  });
});
