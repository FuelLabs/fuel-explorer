import { AnimatedDialog } from '@fuels/ui';
import { useSelector } from '@xstate/store/react';
import type { HexAddress } from 'app-commons';
import { memo } from 'react';
import { ConvertDialog } from '~staking/systems/Conversion/components/ConvertDialog/ConvertDialog';
import { WithdrawNewDialog } from '~staking/systems/Staking/components/WithdrawNewDialog/WithdrawNewDialog';

import type { SequencerValidatorAddress } from '~staking/systems/Core/utils/address';
import { UndelegateNewDialog } from '~staking/systems/Staking/components/UndelegateNewDialog/UndelegateNewDialog';
import { WithdrawStatusDialog } from '~staking/systems/Staking/components/WithdrawStatusDialog/WithdrawStatusDialog';
import {
  stakingTxDialogEvents,
  stakingTxDialogStore,
  txDialogStoreSelectors,
} from '~staking/systems/Staking/store/stakingTxDialogStore';
import { ClaimRewardNewDialog } from '../ClaimRewardNewDialog/ClaimRewardNewDialog';
import { ClaimRewardStatusDialog } from '../ClaimRewardStatusDialog/ClaimRewardStatusDialog';
import { RedelegateNewDialog } from '../RedelegateNewDialog/RedelegateNewDialog';
import { RedelegateStatusDialog } from '../RedelegateStatusDialog/RedelegateStatusDialog';
import { StakeNewDialog } from '../StakeNewDialog/StakeNewDialog';
import { StakeStatusDialog } from '../StakeStatusDialog/StakeStatusDialog';
import { UndelegateStatusDialog } from '../UndelegateStatusDialog/UndelegateStatusDialog';

function onClose() {
  stakingTxDialogStore.send(stakingTxDialogEvents.close());
}

function _StakingDialogs() {
  const data = useSelector(stakingTxDialogStore, txDialogStoreSelectors.data);
  const dialogName = useSelector(
    stakingTxDialogStore,
    txDialogStoreSelectors.name,
  );

  return (
    /* When we change the key React's pointer to the component state is "cleared", so we don't need to add overhead logic just to ensure the state is cleaned up */
    <AnimatedDialog
      key={`${dialogName}-${data || ''}`}
      onOpenChange={(open) => !open && onClose()}
      open
    >
      {dialogName === 'TxWithdrawStatus' && data && (
        <WithdrawStatusDialog identifier={data} />
      )}
      {dialogName === 'TxWithdrawNew' && <WithdrawNewDialog />}
      {dialogName === 'TxClaimRewardStatus' && data && (
        <ClaimRewardStatusDialog identifier={data} />
      )}
      {dialogName === 'TxClaimRewardNew' && data && (
        <ClaimRewardNewDialog validator={data as SequencerValidatorAddress} />
      )}
      {dialogName === 'TxUndelegateStatus' && data && (
        <UndelegateStatusDialog identifier={data} />
      )}
      {dialogName === 'TxUndelegateNew' && data && (
        <UndelegateNewDialog validator={data as SequencerValidatorAddress} />
      )}
      {dialogName === 'TxRedelegateStatus' && data && (
        <RedelegateStatusDialog identifier={data} />
      )}
      {dialogName === 'TxRedelegateNew' && data && (
        <RedelegateNewDialog validator={data as SequencerValidatorAddress} />
      )}
      {dialogName === 'TxStakeNew' && data && (
        <StakeNewDialog validator={data as SequencerValidatorAddress} />
      )}
      {dialogName === 'TxStakeStatus' && data && (
        <StakeStatusDialog identifier={data} />
      )}

      {/* new dialogs will go before here, old dialogs will stay below so we can remove them later */}
      {dialogName === 'TxConvert' && (
        <ConvertDialog identifier={data as HexAddress} />
      )}
    </AnimatedDialog>
  );
}

export const StakingDialogs = memo(_StakingDialogs);
