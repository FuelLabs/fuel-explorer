import { PausedContractDialogContent } from 'app-commons';
import { memo } from 'react';
import { stakingTxDialogStore } from '~staking/systems/Staking/store/stakingTxDialogStore';

function onClose() {
  stakingTxDialogStore.send({ type: 'close' });
}
function _PausedContractDialogStakingContent() {
  return (
    <PausedContractDialogContent name="staking" open={true} onClose={onClose} />
  );
}
export const PausedContractDialogStakingContent = memo(
  _PausedContractDialogStakingContent,
);
