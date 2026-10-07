import {
  Button,
  Dropdown,
  HStack,
  IconButton,
  LoadingBox,
  LoadingWrapper,
  Tooltip,
} from '@fuels/ui';
import { IconMenu } from '@fuels/ui';
import { FuelToken, TOKENS } from 'app-commons';
import { BN } from 'fuels';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
  const isRedelegateDisabled = size === 1 || delegatedBN.isZero();
  const isUndelegateDisabled = delegatedBN.isZero();

  const rewardBN = useMemo(() => {
    return rewardsData.reduce((acc, curr) => {
      // Cosmos API returns decimal strings - truncate to integer for BN
      const integerAmount = Math.floor(Number(curr.amount ?? 0)).toString();
      return acc.add(new BN(integerAmount));
    }, new BN(0));
  }, [rewardsData]);

  const rewardFormatted = useMemo(() => {
    return formatAmount(rewardBN, decimals);
  }, [rewardBN]);

  const delegatedFormatted = useMemo(() => {
    return formatAmount(totalDelegated || '0', decimals);
  }, [totalDelegated]);

  return (
    <div
      key={name}
      className={`fuel-hover-fill w-full flex align-center ${LIST_SEPARATOR_BORDER} ${isLast ? '' : 'border-b'}`}
      role="row"
      tabIndex={0}
    >
      <div
        className={`${DELEGATED_POSITIONS_CELLS_OBJ.name} font-medium text-heading min-h-[52px]`}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-32 h-6 !rounded-none" />}
          regularEl={<span className="fuel-appear">{name}</span>}
        />
      </div>
      <div
        className={`${DELEGATED_POSITIONS_CELLS_OBJ.delegated} font-medium text-heading`}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading || isLoadingDelegations}
          loadingEl={<LoadingBox className="w-20 h-6 !rounded-none" />}
          regularEl={
            <Tooltip
              content={`${delegatedFormatted.original.display} ${symbol}`}
              delayDuration={0}
            >
              <div className="fuel-appear flex items-center">
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
        className={`${DELEGATED_POSITIONS_CELLS_OBJ.rewards} font-medium text-heading`}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-32 h-6 !rounded-none" />}
          regularEl={
            <div className="fuel-appear flex items-center">
              <Tooltip
                content={`${rewardFormatted.original.display} ${symbol}`}
                delayDuration={0}
              >
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
                  {rewardFormatted.formatted.display}
                </span>
              </Tooltip>
              <span className="block whitespace-nowrap ml-2">{symbol}</span>
            </div>
          }
        />
      </div>
      <div className={DELEGATED_POSITIONS_CELLS_OBJ.actions} role="cell">
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={
            <HStack gap="2" align="center">
              <LoadingBox className="h-8 w-16 !rounded-none" />
              <LoadingBox className="size-8 !rounded-none" />
            </HStack>
          }
          regularEl={
            <HStack gap="2" align="center" className="fuel-appear">
              <Button size="2" onClick={openModal}>
                {t('staking.position.claim')}
              </Button>
              <Dropdown>
                <Dropdown.Trigger>
                  <IconButton
                    aria-label={t('staking.position.menu')}
                    icon={IconMenu}
                    variant="ghost"
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
                    {t('staking.position.redelegate')}
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
                  >
                    {t('staking.position.undelegate')}
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
            </HStack>
          }
        />
      </div>
    </div>
  );
};

export const DelegatedPositionItem = memo(_DelegatedPositionItem);
