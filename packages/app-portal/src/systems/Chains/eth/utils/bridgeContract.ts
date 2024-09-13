import bridgeProxyABI from '@fuel-bridge/fungible-token/bridge-fungible-token/proxy/out/release/proxy-abi.json';
import { BridgeSolidityContracts } from 'app-commons';
import { Contract } from 'fuels';
import { WalletUnlocked as FuelWallet, bn } from 'fuels';
import type { PublicClient } from 'viem';

import { EthConnectorService } from '../services';

export async function getTokenContractImplementation({
  ethPublicClient,
  bridgeSolidityContracts,
  fuelWallet,
}: {
  ethPublicClient?: PublicClient;
  fuelWallet: FuelWallet;
  bridgeSolidityContracts: BridgeSolidityContracts;
}) {
  try {
    if (!bridgeSolidityContracts) {
      throw new Error('No bridge solidity contracts found');
    }
    if (!ethPublicClient) {
      throw new Error('No eth client found');
    }

    const erc20Gateway = await EthConnectorService.connectToFuelErc20Gateway({
      publicClient: ethPublicClient,
      bridgeSolidityContracts,
    });
    const assetIssuerId = await erc20Gateway.read.assetIssuerId();

    if (typeof assetIssuerId === 'string') {
      const assetIssuer = new Contract(
        assetIssuerId,
        bridgeProxyABI,
        fuelWallet,
      );
      // @TODO: remove forced fee when sdk fixes
      const { value: implementationContract } = await assetIssuer.functions
        .proxy_target()
        .txParams({
          maxFee: bn(1_000_000),
        })
        .dryRun();
      return implementationContract.bits as unknown as string;
    }
  } catch (e) {
    console.log('asd ERROR getting proxy contract', e);
  }

  return '';
}
