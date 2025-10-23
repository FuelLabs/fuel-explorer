import { Card, HStack, Tooltip } from '@fuels/ui';
import { IconInfoCircle } from '@tabler/icons-react';
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
  tooltip?: React.ReactNode;
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
                  className={`${className} text-gray-11`}
                >
                  {title}

                  {tooltip && (
                    <Tooltip
                      content={tooltip}
                      delayDuration={0}
                      className="text-center"
                    >
                      <IconInfoCircle
                        size={12}
                        className="hidden tablet:block"
                      />
                    </Tooltip>
                  )}
                </motion.div>
              ),
            )}
          </AnimatePresence>
        </HStack>
      </div>
      <Card className="border-none p-0 [&:before]:inset-0 [&:before]:bg-transparent [&:after]:inset-0 [&:after]:shadow-none gap-0 bg-gray-3 rounded-b-none">
        {children}
      </Card>
    </div>
  );
}

export const AnimatedTable = memo(_AnimatedTable);
