import { useModal } from 'connectkit';
import { useMemo } from 'react';
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
  const { address, isConnected } = useAccount();
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

  const hasPositions = (positions || []).length > 0;
  const isLoading = isLoadingQuery || isPending;
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
            positions?.map((position, idx) => (
              <DelegatedPositionItem
                key={position.consensus_pubkey.key}
                name={position.description.moniker}
                rate={position.commission.commission_rates.rate}
                validator={position.operator_address}
                size={availableValidatorsSize}
                isLast={idx === positions.length - 1}
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
