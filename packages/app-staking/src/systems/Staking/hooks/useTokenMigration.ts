import { CURRENT_NETWORK_CONTRACTS } from 'app-commons';
import { useSafeWriteContract } from 'app-commons';
import type { Address } from 'viem';
import { tokenMigratorAbi } from '~staking/contracts/migrator/tokenMigratorAbi';

type MigrateData = {
  amount: bigint;
  period: string;
  options?: {
    onSuccess?: (hash: Address) => void;
  };
};

export const useTokenMigration = () => {
  const {
    isPending: isMigrating,
    writeContract,
    error,
  } = useSafeWriteContract({
    conditions: {
      pauser: [CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE],
    },
  });

  const migrate = (params: MigrateData) => {
    writeContract(
      {
        address: CURRENT_NETWORK_CONTRACTS.FUEL_TOKEN_MIGRATOR,
        abi: tokenMigratorAbi,
        functionName: 'migrate',
        args: [params.amount, BigInt(params.period)],
      },
      params.options,
    );
  };

  return {
    migrate,
    isMigrating,
    error,
  };
};
