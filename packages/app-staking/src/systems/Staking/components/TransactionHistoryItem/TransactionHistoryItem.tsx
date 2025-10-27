import { GQLWithdrawStatusType } from '@fuel-explorer/graphql/sdk';
import { Button, LoadingBox, LoadingWrapper, Text, Tooltip } from '@fuels/ui';
import { FuelToken, TOKENS } from 'app-commons';
import { memo, useMemo } from 'react';
import {
  CELL_PADDING,
  LIST_SEPARATOR_BORDER,
} from '~staking/systems/Core/components/AnimatedTable/styles';
import { formatAmount } from '~staking/systems/Core/utils/bn';
import { formatFullDate } from '~staking/systems/Core/utils/dateFormat';
import {
  stakingTxDialogEvents,
  stakingTxDialogStore,
} from '~staking/systems/Staking/store/stakingTxDialogStore';
import { TransactionHistoryItemStatus } from './TransactionHistoryItemStatus';
import { typeLabel, withdrawType } from './constants';
import type { TransactionHistoryItemProps } from './types';
const v2 = TOKENS[FuelToken.V2];
const { symbol, decimals } = v2;

const _TransactionHistoryItem = ({
  event,
  hideSeparator,
  isLoading,
}: TransactionHistoryItemProps) => {
  const openModal = () => {
    stakingTxDialogStore.send(
      stakingTxDialogEvents.open(withdrawType[event.type], event.id),
    );
  };

  const { formatted, original } = useMemo(() => {
    return formatAmount(event.amount, decimals);
  }, [event.amount]);

  return (
    <div
      key={event.id}
      className={`w-full flex align-center ${LIST_SEPARATOR_BORDER} ${hideSeparator ? '' : 'border-b'}`}
      role="row"
      tabIndex={0}
    >
      <div
        className={`${transactionHistoryItemClassNames.dateCol} font-semibold min-h-[54px] `}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading}
          regularEl={formatFullDate(
            event.statusInfo?.[GQLWithdrawStatusType.TransactionSent]?.ethTx
              .timestamp,
          )}
          loadingEl={<LoadingBox className="w-28 h-6" />}
        />
      </div>
      <div
        className={`${transactionHistoryItemClassNames.typeCol} font-semibold min-h-[52px] `}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading}
          regularEl={typeLabel[event.type]}
          loadingEl={<LoadingBox className="w-16 h-6" />}
        />
      </div>
      <div
        className={`${transactionHistoryItemClassNames.amountCol} font-semibold`}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading}
          regularEl={
            <Tooltip
              content={`${original.display} ${symbol}`}
              delayDuration={0}
            >
              <div className="flex items-center">
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis">
                  {formatted.display}
                </span>
              </div>
            </Tooltip>
          }
          loadingEl={<LoadingBox className="w-16 h-6" />}
        />
      </div>
      <div
        className={`${transactionHistoryItemClassNames.etaCol} font-semibold`}
        role="cell"
      >
        <LoadingWrapper
          isLoading={isLoading}
          regularEl={<TransactionHistoryItemStatus event={event} />}
          loadingEl={<LoadingBox className="w-28 h-6" />}
        />
      </div>
      <div className={transactionHistoryItemClassNames.actionsCol} role="cell">
        <LoadingWrapper
          isLoading={isLoading}
          regularEl={
            <Button
              color="gray"
              variant="ghost"
              size="2"
              onClick={openModal}
              className="max-h-[30px]"
            >
              <Text className="text-sm text-heading">Details</Text>
            </Button>
          }
          loadingEl={<LoadingBox className="w-[75px] h-6" />}
        />
      </div>
    </div>
  );
};

export const TransactionHistoryItem = memo(_TransactionHistoryItem);

export const transactionHistoryItemClassNames = {
  dateCol: `flex items-center basis-[250px] grow-0 text-sm ${CELL_PADDING}`,
  typeCol: `flex items-center basis-[200px] shrink-0 grow-0 text-sm ${CELL_PADDING}`,
  amountCol: `flex items-center basis-[220px] grow shrink laptop:grow-0 laptop:shrink-0 text-sm ${CELL_PADDING}`,
  etaCol: `hidden laptop:flex items-center basis-[150px] grow shrink text-sm ${CELL_PADDING}`,
  actionsCol: `flex items-center justify-end shrink-0 basis-[130px] min-w-[130px] ${CELL_PADDING}`,
};
