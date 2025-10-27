import type { Cell } from '~staking/systems/Core/components/AnimatedTable/AnimatedTable';
import {
  CELL_ANIMATE_AUTO,
  CELL_PADDING,
} from '~staking/systems/Core/components/AnimatedTable/styles';

export const VALIDATORS_CELLS: Cell[] = [
  {
    id: 'name',
    title: 'Name',
    className: `text-sm flex items-center basis-[240px] shrink-0 grow-0 laptop:!basis-[320px] ${CELL_PADDING} pl-[60px]`,
    animate: CELL_ANIMATE_AUTO,
  },
  {
    id: 'power',
    title: 'Voting Power',
    className: `text-sm flex items-center basis-[290px] grow shrink laptop:grow-0 laptop:shrink-0 laptop:!basis-[340px] ${CELL_PADDING}`,
  },
  {
    id: 'commission',
    title: 'Commission',
    className: `text-sm hidden laptop:flex items-center basis-[150px] grow shrink ${CELL_PADDING}`,
  },
  {
    id: 'actions',
    title: '',
    className: `flex items-center justify-end shrink-0 basis-[130px] min-w-[130px] ${CELL_PADDING}`,
  },
];

export const VALIDATORS_CELLS_OBJ = VALIDATORS_CELLS.reduce<
  Record<string, string | undefined>
>((acc, cell) => {
  acc[cell.id] = cell.className;
  return acc;
}, {});

export const PAGE_VARIANTS_ANIMATION = {
  // Start page animations
  startInitial: { opacity: 0, x: -32 },
  startAnimate: { opacity: 1, x: 0 },
  startExit: { opacity: 0, x: -32 },

  // Middle page animations
  middleInitial: { opacity: 0, x: 32 },
  middleAnimate: { opacity: 1, x: 0 },
  middleExit: { opacity: 0, x: -32 },
  middleBackInitial: { opacity: 0, x: -32 },
  middleBackExit: { opacity: 0, x: 32 },

  // End page animations
  endInitial: { opacity: 0, x: 32 },
  endAnimate: { opacity: 1, x: 0 },
  endExit: { opacity: 0, x: -32 },
};
