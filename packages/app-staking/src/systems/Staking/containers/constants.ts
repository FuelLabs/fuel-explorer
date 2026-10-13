import type { Cell } from '~staking/systems/Core/components/AnimatedTable/AnimatedTable';
import {
  CELL_ANIMATE_AUTO,
  CELL_PADDING,
} from '~staking/systems/Core/components/AnimatedTable/styles';

export const VALIDATORS_CELLS: Cell[] = [
  {
    id: 'name',
    title: 'staking.table.name',
    className: `text-sm flex items-center basis-[240px] shrink-0 grow-0 laptop:!basis-[320px] ${CELL_PADDING} pl-[60px]`,
    animate: CELL_ANIMATE_AUTO,
  },
  {
    id: 'power',
    title: 'staking.table.power',
    className: `text-sm flex items-center basis-[290px] grow shrink laptop:grow-0 laptop:shrink-0 laptop:!basis-[340px] ${CELL_PADDING}`,
  },
  {
    id: 'commission',
    title: 'staking.table.commission',
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
