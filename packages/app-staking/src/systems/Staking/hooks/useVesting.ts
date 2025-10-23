import { CURRENT_NETWORK_CONTRACTS, FuelToken, TOKENS } from 'app-commons';
import { bn } from 'fuels';
import { useMemo } from 'react';
import type { Address } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { tokenFaucetAbi } from '~staking/contracts/tokenFaucet/tokenFaucetAbi';
import { useFormatBalance } from '~staking/systems/Core/hooks/useFormatBalance';
import type { PendingTransaction } from '~staking/systems/Core/hooks/usePendingTransactions';
import {
  type AccountData,
  useSequencerAccount,
} from '../services/useSequencerAccount';

type VestingClaimParams = {
  options?: {
    onSuccess?: (hash: Address) => void;
  };
};

type UseVestingProps = {
  pendingTx?: PendingTransaction | undefined;
  account?: Address;
};

const { decimals: decimalsV2 } = TOKENS[FuelToken.V2];

const vestingSelector = (data: AccountData) => data.account.vesting_account;
export const useVesting = (props?: UseVestingProps) => {
  const { pendingTx, account } = props || {};
  const { data: vesting, isError: isVestingError } = useSequencerAccount(
    account,
    {
      select: vestingSelector,
    },
  );
  const {
    data: hash,
    isPending: isClaiming,
    writeContract,
    error,
  } = useWriteContract();
  const txHash = pendingTx?.hash ?? hash;
  const {
    isLoading: isWaitingVestingClaim,
    isSuccess: isConfirmedVestingClaim,
  } = useWaitForTransactionReceipt({
    hash: txHash,
    query: {
      enabled: txHash?.startsWith('0x'),
    },
  });
  const {
    freeTokens,
    vestingTokens,
    vestingTotal,
    vesting_start,
    vesting_end,
  } = useMemo(() => {
    if (isVestingError)
      return {
        freeTokens: bn(0),
        vestingTokens: bn(0),
        vestingTotal: bn(0),
        vesting_start: 0,
        vesting_end: 0,
      };
    return {
      vesting_start: Number(vesting?.start_time || 0),
      vesting_end: Number(vesting?.base_vesting_account.end_time || 0),
      freeTokens: bn(vesting?.base_vesting_account.delegated_free[0]?.amount),
      vestingTokens: bn(
        vesting?.base_vesting_account.delegated_vesting[0]?.amount,
      ),
      vestingTotal: bn(
        vesting?.base_vesting_account.original_vesting[0]?.amount,
      ),
    };
  }, [vesting, isVestingError]);

  const vestingTokensBalance = useFormatBalance(vestingTokens, decimalsV2);
  const vestingTotalBalance = useFormatBalance(vestingTotal, decimalsV2);

  const claim = ({ options }: VestingClaimParams = {}) => {
    writeContract(
      {
        address: CURRENT_NETWORK_CONTRACTS.FUEL_VESTING,
        abi: tokenFaucetAbi,
        functionName: 'claim',
      },
      options,
    );
  };

  return {
    handlers: {
      claim,
    },
    isClaiming,
    isWaitingVestingClaim,
    isConfirmedVestingClaim,
    error,
    freeTokens,
    vestingTokens,
    vestingTotal,
    vesting_start,
    vesting_end,
    vestingTokensBalance,
    vestingTotalBalance,
    vesting,
  };
};
