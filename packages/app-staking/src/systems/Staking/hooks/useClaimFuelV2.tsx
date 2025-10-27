import { toast } from '@fuels/ui';
import {
  CURRENT_NETWORK_CONTRACTS,
  CURRENT_NETWORK_FUEL_ASSET_ID,
  FuelToken,
  TOKENS,
} from 'app-commons';
import { useSafeWriteContract } from 'app-commons/useSafeWriteContract';
import { tokenFaucetAbi } from '~staking/contracts/tokenFaucet/tokenFaucetAbi';
import { ViewInExplorer } from '~staking/systems/Core/components/ViewInExplorer/ViewInExplorer';
import { PendingTransactionTypeL1 } from '~staking/systems/Core/hooks/usePendingTransactions';
import { usePendingTransactionsCache } from '~staking/systems/Core/hooks/usePendingTransactionsCache';

export const useClaimFuelV2 = () => {
  const {
    isPending: isClaiming,
    writeContractAsync,
    error,
  } = useSafeWriteContract();
  const { addPendingTransaction } = usePendingTransactionsCache();

  const claimReward = async () => {
    const res = await writeContractAsync({
      address: CURRENT_NETWORK_CONTRACTS.FUEL_VESTING,
      abi: tokenFaucetAbi,
      functionName: 'claimV2',
      args: [],
    });

    addPendingTransaction({
      hash: res,
      token: CURRENT_NETWORK_FUEL_ASSET_ID,
      formatted: '',
      symbol: TOKENS[FuelToken.V2].symbol,
      validator: undefined,
      type: PendingTransactionTypeL1.ClaimVesting,
      layer: 'l1',
    });
    toast({
      title:
        'Fuel tokens have been claimed and will be reflected in your wallet shortly.',
      action: <ViewInExplorer hash={res} layer="l1" />,
      variant: 'success',
    });
  };

  return {
    claimReward,
    isClaiming,
    error,
  };
};
