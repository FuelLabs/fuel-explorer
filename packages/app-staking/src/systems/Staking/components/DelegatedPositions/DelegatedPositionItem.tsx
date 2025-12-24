import {
  Button,
  Dropdown,
  HStack,
  IconButton,
  LoadingBox,
  LoadingWrapper,
  Tooltip,
} from '@fuels/ui';
import { IconMenu } from '@tabler/icons-react';
import { FuelToken, TOKENS } from 'app-commons';
import { motion } from 'framer-motion';
import { BN } from 'fuels';
import { memo, useMemo } from 'react';
import { useAccount } from 'wagmi';
import type { SequencerValidatorAddress } from '~staking/systems/Core';
import { LIST_SEPARATOR_BORDER } from '~staking/systems/Core/components/AnimatedTable/styles';
import { formatAmount } from '~staking/systems/Core/utils/bn';
import { useAccountValidatorDelegations } from '~staking/systems/Staking/services/useAccountValidatorDelegations';
import { useValidatorRewards } from '~staking/systems/Staking/services/useValidatorRewards';
import type { ValidatorReward } from '~staking/systems/Staking/services/useValidatorRewards/types';
import { DELEGATED_POSITIONS_CELLS_OBJ } from '../../containers/DelegatedPositions';

import {
  stakingTxDialogEvents,
  stakingTxDialogStore,
} from '~staking/systems/Staking/store/stakingTxDialogStore';

type DelegatedPositionItemProps = {
  name?: string;
  rate?: string;
  validator?: SequencerValidatorAddress;
  size?: number;
  isLast?: boolean;
  isLoading?: boolean;
};
const { symbol, decimals } = TOKENS[FuelToken.V2];
const EMPTY_REWARDS: Array<ValidatorReward> = [];

const _DelegatedPositionItem = ({
  name,
  validator,
  size,
  isLast,
  isLoading,
}: DelegatedPositionItemProps) => {
  const openModal = () => {
    stakingTxDialogStore.send(
      stakingTxDialogEvents.open('TxClaimRewardNew', validator),
    );
  };

  const { address } = useAccount();
  const { data: totalDelegated, isLoading: isLoadingDelegations } =
    useAccountValidatorDelegations({
      address,
      validator,
      options: {
        select: (data) => data?.delegation_response?.balance?.amount,
      },
    });
  const { data: rewardsData = EMPTY_REWARDS } = useValidatorRewards(
    validator,
    address,
    {
      select: ({ rewards }) => rewards,
    },
  );
  const delegatedBN = useMemo(
    () => new BN(totalDelegated || '0'),
    [totalDelegated],
  );
  // Only disable redelegate if there's only 1 validator (nowhere to redelegate to)
  // or if there's no delegated balance. Sequencer blocking is handled in the review step.
  const isRedelegateDisabled = size === 1 || delegatedBN.isZero();

  // Only disable undelegate if there's no delegated balance.
  // Sequencer blocking is handled in the review step.
  const isUndelegateDisabled = delegatedBN.isZero();

  const rewardBN = useMemo(() => {
    return rewardsData.reduce((acc, curr) => {
      return acc.add(new BN(curr.amount.split('.')[0] ?? 0));
    }, new BN(0));
  }, [rewardsData]);

  const rewardFormatted = useMemo(() => {
    return formatAmount(rewardBN, decimals);
  }, [rewardBN]);

  const delegatedFormatted = useMemo(() => {
    return formatAmount(totalDelegated || '0', decimals);
  }, [totalDelegated]);

  return (
    <motion.div
      key={name}
      className={`w-full flex align-center ${LIST_SEPARATOR_BORDER} ${isLast ? '' : 'border-b'}`}
      role="row"
    >
      <div
        className={`${DELEGATED_POSITIONS_CELLS_OBJ.name} font-semibold min-h-[52px]`}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-32 h-6" />}
          regularEl={name}
        />
      </div>
      <div
        className={`${DELEGATED_POSITIONS_CELLS_OBJ.delegated} font-semibold`}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading || isLoadingDelegations}
          loadingEl={<LoadingBox className="w-20 h-6" />}
          regularEl={
            <Tooltip
              content={`${delegatedFormatted.original.display} ${symbol}`}
              delayDuration={0}
            >
              <div className="flex items-center">
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
                  {delegatedFormatted.formatted.display}
                </span>
                <span className="block whitespace-nowrap ml-2">{symbol}</span>
              </div>
            </Tooltip>
          }
        />
      </div>
      <div
        className={`${DELEGATED_POSITIONS_CELLS_OBJ.rewards} font-semibold`}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-32 h-6" />}
          regularEl={
            <>
              <Tooltip
                content={`${rewardFormatted.original.display} ${symbol}`}
                delayDuration={0}
              >
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
                  {rewardFormatted.formatted.display}
                </span>
              </Tooltip>
              <span className="block whitespace-nowrap ml-2">{symbol}</span>
            </>
          }
        />
      </div>
      <div className={DELEGATED_POSITIONS_CELLS_OBJ.actions} role="cell">
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={null}
          regularEl={
            <HStack gap="2" align="center">
              <Button size="2" onClick={openModal}>
                Claim
              </Button>
              <Dropdown>
                <Dropdown.Trigger>
                  <IconButton
                    aria-label="Delegated item"
                    icon={IconMenu}
                    variant="outline"
                    color="gray"
                  />
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item
                    onClick={() =>
                      !isRedelegateDisabled &&
                      stakingTxDialogStore.send({
                        type: 'open',
                        name: 'TxRedelegateNew',
                        data: validator,
                      })
                    }
                    disabled={isRedelegateDisabled}
                  >
                    Redelegate
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      !isUndelegateDisabled &&
                      stakingTxDialogStore.send({
                        type: 'open',
                        name: 'TxUndelegateNew',
                        data: validator,
                      })
                    }
                    disabled={isUndelegateDisabled}
                    color="orange"
                  >
                    Undelegate
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            </HStack>
          }
        />
      </div>
    </motion.div>
  );
};

export const DelegatedPositionItem = memo(_DelegatedPositionItem);
