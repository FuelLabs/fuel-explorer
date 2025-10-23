import {
  Avatar,
  Button,
  Link,
  LoadingBox,
  LoadingWrapper,
  Tooltip,
} from '@fuels/ui';
import { FuelToken, TOKENS } from 'app-commons';
import { memo, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { LIST_SEPARATOR_BORDER } from '~staking/systems/Core/components/AnimatedTable/styles';
import { PendingTransactionTypeL1 } from '~staking/systems/Core/hooks/usePendingTransactions';
import { formatAmount } from '~staking/systems/Core/utils/bn';
import { stakingTxDialogStore } from '~staking/systems/Staking/store/stakingTxDialogStore';
import { toPercentage } from '../../Core/utils/percentage';
import { VALIDATORS_CELLS_OBJ } from '../containers/constants';
import { useDisabledL1Actions } from '../hooks/useDisabledL1Actions';
import type { ValidatorItem } from '../hooks/useValidatorsList';
import { getValidatorImage } from '../utils/validatorImages';

type ValidatorListItemProps = {
  validator?: ValidatorItem;
  index?: number;
  isLast?: boolean;
  isLoading?: boolean;
};

const { symbol, decimals } = TOKENS[FuelToken.V2];

const _ValidatorListItem = ({
  validator,
  index,
  isLast,
  isLoading,
}: ValidatorListItemProps) => {
  const disabledActions = useDisabledL1Actions(validator?.operator_address);
  const delegated = useMemo(() => {
    return formatAmount(validator?.tokens, decimals);
  }, [validator]);
  const { isConnected } = useAccount();
  const disabled = disabledActions[PendingTransactionTypeL1.Delegate];
  const tooltipLabel = disabled
    ? 'Stake is disabled while other staking operations are pending.'
    : undefined;

  return (
    <div
      key={`${validator?.description?.moniker}-${validator?.rank}`}
      className={`w-full flex align-center ${LIST_SEPARATOR_BORDER} ${isLast ? '' : 'border-b'}`}
      role="row"
      tabIndex={index}
    >
      <div
        className={`${VALIDATORS_CELLS_OBJ.name} font-semibold min-h-[52px] !pl-4`}
        role="cell"
      >
        <Avatar
          size="3"
          src={getValidatorImage(validator?.description?.moniker)}
          fallback={''}
          className="mr-4"
        />
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-32 h-6" />}
          regularEl={
            <Link
              href={validator?.description?.website}
              isExternal
              className="text-gray-12"
              size="2"
            >
              {validator?.description?.moniker}
            </Link>
          }
        />
      </div>

      <div
        className={`${VALIDATORS_CELLS_OBJ.power} font-semibold`}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-48 h-6" />}
          regularEl={
            <Tooltip
              content={`${delegated.original.display} ${symbol}`}
              delayDuration={0}
            >
              <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
                {toPercentage(validator?.rank?.toString() || '0')}
                <span className="text-gray-10 ml-2">
                  ({delegated.formatted.display} {symbol})
                </span>
              </span>
            </Tooltip>
          }
        />
      </div>
      <div
        className={`${VALIDATORS_CELLS_OBJ.commission} font-semibold`}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-24 h-6" />}
          regularEl={toPercentage(
            validator?.commission?.commission_rates?.rate || 0,
          )}
        />
      </div>

      <div
        className={`${VALIDATORS_CELLS_OBJ.actions} font-semibold`}
        role="cell"
      >
        {isConnected ? (
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-32 h-7" />}
            regularEl={
              <Tooltip
                content={tooltipLabel}
                delayDuration={50}
                open={disabled ? undefined : false}
              >
                <Button
                  color="gray"
                  variant="outline"
                  size="2"
                  onClick={() =>
                    stakingTxDialogStore.send({
                      type: 'open',
                      name: 'TxStakeNew',
                      data: validator?.operator_address,
                    })
                  }
                  className="flex max-h-[30px]"
                  disabled={disabled}
                >
                  Stake
                </Button>
              </Tooltip>
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export const ValidatorListItem = memo(_ValidatorListItem);
