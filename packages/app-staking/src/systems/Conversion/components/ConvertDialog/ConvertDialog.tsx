import {
  CURRENT_NETWORK_CONTRACTS,
  FuelToken,
  type HexAddress,
  TOKENS,
} from 'app-commons';
import { useIsStakingContractPaused } from '~staking/hooks/useIsStakingContractPaused';
import { useFormatBalance } from '../../../Core/hooks/useFormatBalance';
import { useTokenBalance } from '../../../Staking/services/useTokenBalance';
import { ConvertDialogContent } from './ConvertDialogContent';

const { token, decimals } = TOKENS[FuelToken.V1];

export const ConvertDialog = ({
  identifier: account,
}: { identifier: HexAddress }) => {
  const isPaused = useIsStakingContractPaused({
    conditions: {
      pauser: [
        CURRENT_NETWORK_CONTRACTS.SEQUENCER_INTERFACE,
        CURRENT_NETWORK_CONTRACTS.FUEL_TOKEN_MIGRATOR,
      ],
    },
  });

  const { data: tokens } = useTokenBalance(token, account);
  const { amount: balance } = useFormatBalance(tokens, decimals);

  return (
    <ConvertDialogContent
      account={account}
      token={token}
      decimals={decimals}
      balance={balance}
      isContractPaused={isPaused}
    />
  );
};
