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
import { useTranslation } from 'react-i18next';
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
  isLast,
  isLoading,
}: ValidatorListItemProps) => {
  const { t } = useTranslation();
  const { disabledActions, disabledReasons } = useDisabledL1Actions(
    validator?.operator_address,
  );
  const delegated = useMemo(() => {
    return formatAmount(validator?.tokens, decimals);
  }, [validator]);
  const { isConnected } = useAccount();
  const disabled = disabledActions[PendingTransactionTypeL1.Delegate];
  const tooltipLabel =
    disabledReasons[PendingTransactionTypeL1.Delegate] ||
    (disabled ? t('staking.validator.stake_disabled') : undefined);

  return (
    // biome-ignore lint/a11y/useFocusableInteractive: a row holds its own buttons and is not a tab stop
    <div
      key={`${validator?.description?.moniker}-${validator?.rank}`}
      className={`fuel-hover-fill w-full flex align-center ${LIST_SEPARATOR_BORDER} ${isLast ? '' : 'border-b'}`}
      role="row"
    >
      <div
        className={`${VALIDATORS_CELLS_OBJ.name} font-medium text-heading min-h-[52px] !pl-4`}
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
          loadingEl={<LoadingBox className="w-32 h-6 !rounded-none" />}
          regularEl={
            <Link
              href={validator?.description?.website}
              isExternal
              className="fuel-appear text-heading"
              size="2"
            >
              {validator?.description?.moniker}
            </Link>
          }
        />
      </div>

      <div
        className={`${VALIDATORS_CELLS_OBJ.power} font-medium text-heading`}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-48 h-6 !rounded-none" />}
          regularEl={
            <Tooltip
              content={`${delegated.original.display} ${symbol}`}
              delayDuration={0}
            >
              <span className="fuel-appear block whitespace-nowrap overflow-hidden text-ellipsis">
                {toPercentage(validator?.rank?.toString() || '0')}
                <span className="ml-2 text-[var(--fuel-element-low-em)]">
                  ({delegated.formatted.display} {symbol})
                </span>
              </span>
            </Tooltip>
          }
        />
      </div>
      <div
        className={`${VALIDATORS_CELLS_OBJ.commission} font-medium text-heading`}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-24 h-6 !rounded-none" />}
          regularEl={
            <span className="fuel-appear">
              {toPercentage(validator?.commission?.commission_rates?.rate || 0)}
            </span>
          }
        />
      </div>

      <div
        className={`${VALIDATORS_CELLS_OBJ.actions} font-medium text-heading`}
        role="cell"
      >
        {isConnected ? (
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-16 h-8 !rounded-none" />}
            regularEl={
              <Tooltip
                content={tooltipLabel}
                delayDuration={50}
                open={disabled ? undefined : false}
              >
                <Button
                  size="2"
                  onClick={() =>
                    stakingTxDialogStore.send({
                      type: 'open',
                      name: 'TxStakeNew',
                      data: validator?.operator_address,
                    })
                  }
                  className="fuel-appear flex"
                  disabled={disabled}
                >
                  {t('staking.validator.stake')}
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
