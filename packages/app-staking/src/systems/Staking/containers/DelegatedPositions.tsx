import { useModal } from 'connectkit';
import { AnimatePresence, type Variants, motion } from 'framer-motion';
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

const animations: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const DELEGATED_POSITIONS_CELLS: Cell[] = [
  {
    id: 'name',
    title: 'Name',
    className: `flex items-center basis-[120px] grow shrink min-w-0 text-sm laptop:basis-[340px] laptop:grow-0 laptop:shrink-0 ${CELL_PADDING}`,
  },
  {
    id: 'delegated',
    title: 'Tokens Delegated',
    className: `flex items-center basis-[140px] grow shrink min-w-0 text-sm laptop:basis-[290px] laptop:grow-0 laptop:shrink-0 ${CELL_PADDING}`,
  },
  {
    id: 'rewards',
    title: 'Rewards Earned',
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

  return (
    <AnimatePresence>
      {isConnected ? (
        <motion.div
          key="list"
          variants={animations}
          initial="closed"
          animate="open"
          exit="closed"
          className="flex flex-col gap-4"
        >
          {shouldShowList && (
            <AnimatedTable headerCells={DELEGATED_POSITIONS_CELLS}>
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
        </motion.div>
      ) : (
        <DelegatedPositionsConnect onConnect={handleConnect} />
      )}
    </AnimatePresence>
  );
};
