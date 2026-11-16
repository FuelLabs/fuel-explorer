import { useModal } from 'connectkit';
import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import {
  AnimatedTable,
  type Cell,
} from '~staking/systems/Core/components/AnimatedTable/AnimatedTable';
import { CELL_PADDING } from '~staking/systems/Core/components/AnimatedTable/styles';
import { useValidators } from '~staking/systems/Staking/services/useValidators';
import { DelegatedPositionItem } from '../components/DelegatedPositions/DelegatedPositionItem';
import { DelegatedPositionsConnect } from '../components/DelegatedPositions/DelegatedPositionsConnect';
import { DelegatedPositionsEmpty } from '../components/DelegatedPositions/DelegatedPositionsEmpty';
import { useAccountValidators } from '../services/useAccountValidators';
import {
  stakingTxDialogEvents,
  stakingTxDialogStore,
} from '../store/stakingTxDialogStore';

const DELEGATED_POSITIONS_CELLS: Cell[] = [
  {
    id: 'name',
    title: 'staking.table.name',
    className: `flex items-center basis-[120px] grow shrink min-w-0 text-sm laptop:basis-[340px] laptop:grow-0 laptop:shrink-0 ${CELL_PADDING}`,
  },
  {
    id: 'delegated',
    title: 'staking.table.delegated',
    className: `flex items-center basis-[140px] grow shrink min-w-0 text-sm laptop:basis-[290px] laptop:grow-0 laptop:shrink-0 ${CELL_PADDING}`,
  },
  {
    id: 'rewards',
    title: 'staking.table.rewards',
    className: `hidden laptop:flex items-center basis-[150px] grow shrink text-sm ${CELL_PADDING}`,
  },
  {
    id: 'actions',
    title: '',
    className: `flex items-center justify-end shrink-0 basis-[100px] min-w-[100px] laptop:basis-[130px] laptop:min-w-[130px] ${CELL_PADDING}`,
  },
];

export const DELEGATED_POSITIONS_CELLS_OBJ = DELEGATED_POSITIONS_CELLS.reduce<
  Record<string, string | undefined>
>((acc, cell) => {
  acc[cell.id] = cell.className;
  return acc;
}, {});

export const DelegatedPositions = () => {
  const { t } = useTranslation();
  const cells = useMemo(
    () =>
      DELEGATED_POSITIONS_CELLS.map((cell) => ({
        ...cell,
        title: cell.title ? t(cell.title) : '',
      })),
    [t],
  );
  const { setOpen } = useModal();
  // wagmi reports `reconnecting` for a moment when the tab regains focus.
  // Treat it as connected so the table does not unmount and remount.
  const { address, status } = useAccount();
  const isConnected = status === 'connected' || status === 'reconnecting';
  const {
    data: positions,
    isLoading: isLoadingQuery,
    isPending,
  } = useAccountValidators(address, {
    select: (positions) => positions.validators,
  });
  const {
    query: { data },
  } = useValidators();

  const availableValidatorsSize = data?.validators?.length ?? 0;

  const handleStartStaking = () => {
    stakingTxDialogStore.send(stakingTxDialogEvents.open('TxStakeNew'));
  };

  const handleConnect = () => {
    setOpen(true);
  };

  // Keep the rows already shown for this address while a query has no data
  // yet, so a refresh never drops the table back to its loading rows.
  const shown = useRef<{ address?: string; positions?: typeof positions }>({});
  if (positions && address) shown.current = { address, positions };
  const visiblePositions =
    positions ??
    (shown.current.address === address ? shown.current.positions : undefined);

  const hasPositions = (visiblePositions || []).length > 0;
  const isLoading = !visiblePositions && (isLoadingQuery || isPending);
  const shouldShowList = isConnected && (hasPositions || isLoading);
  const shouldShowEmpty = isConnected && !shouldShowList && !hasPositions;
  const shouldShowListContent = shouldShowList && hasPositions && !isLoading;
  const shouldShowListLoading = shouldShowList && isLoading;

  if (!isConnected)
    return <DelegatedPositionsConnect onConnect={handleConnect} />;

  return (
    <div className="flex flex-col gap-4">
      {shouldShowList && (
        <AnimatedTable headerCells={cells}>
          {shouldShowListLoading &&
            [1, 2, 3, 4, 5].map((i) => (
              <DelegatedPositionItem key={`load${i}`} isLoading />
            ))}
          {shouldShowListContent &&
            visiblePositions?.map((position, idx) => (
              <DelegatedPositionItem
                key={position.consensus_pubkey.key}
                name={position.description.moniker}
                rate={position.commission.commission_rates.rate}
                validator={position.operator_address}
                size={availableValidatorsSize}
                isLast={idx === visiblePositions.length - 1}
              />
            ))}
        </AnimatedTable>
      )}
      {shouldShowEmpty && (
        <DelegatedPositionsEmpty onStartStaking={handleStartStaking} />
      )}
    </div>
  );
};
