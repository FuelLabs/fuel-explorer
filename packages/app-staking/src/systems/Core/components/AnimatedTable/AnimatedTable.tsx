import { HStack, HelperIcon, IconInfoCircle } from '@fuels/ui';
import { AnimatePresence, type AnimationProps, motion } from 'framer-motion';
import type React from 'react';
import { memo } from 'react';
import {
  CELL_ANIMATE,
  CELL_EXIT,
  CELL_INITIAL,
  CELL_TRANSITION,
} from './styles';

export type Cell = {
  id: string;
  tooltip?: string;
  title: string;
  className?: string;
  animate?: AnimationProps['animate'];
};

type AnimatedTableProps = {
  children: React.ReactNode;
  headerCells: Cell[];
};

function _AnimatedTable({ children, headerCells }: AnimatedTableProps) {
  return (
    <div>
      <div className="flex-row w-full">
        <HStack gap="0">
          <AnimatePresence initial={false}>
            {headerCells.map(
              ({ id, tooltip, title, className, animate = CELL_ANIMATE }) => (
                <motion.div
                  key={id}
                  initial={CELL_INITIAL}
                  animate={animate}
                  exit={CELL_EXIT}
                  transition={CELL_TRANSITION}
                  className={`${className} fuel-label`}
                >
                  {title}

                  {tooltip && (
                    <HelperIcon
                      message={tooltip}
                      icon={IconInfoCircle}
                      iconSize={12}
                    />
                  )}
                </motion.div>
              ),
            )}
          </AnimatePresence>
        </HStack>
      </div>
      <div className="border-t border-[var(--fuel-line)]">{children}</div>
    </div>
  );
}

export const AnimatedTable = memo(_AnimatedTable);
