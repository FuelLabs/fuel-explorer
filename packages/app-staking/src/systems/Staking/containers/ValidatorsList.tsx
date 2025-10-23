import { AnimatePresence, type Variants, motion } from 'framer-motion';
import { AnimatedTable } from '~staking/systems/Core/components/AnimatedTable/AnimatedTable';
import { ValidatorListItem } from '../components/ValidatorListItem';
import { useValidatorsList } from '../hooks/useValidatorsList';

import { Box } from '@fuels/ui';
import { VALIDATORS_CELLS } from './constants';

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

export const ValidatorsList = () => {
  const { validators, isLoading, isPending, isError } = useValidatorsList();

  return (
    <Box className="flex flex-col gap-4">
      <AnimatedTable headerCells={VALIDATORS_CELLS}>
        <AnimatePresence initial={false} mode="popLayout">
          {(!!validators?.length || isLoading || isPending) && (
            <motion.div
              key="list"
              variants={animations}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {validators?.map((validator, idx) => (
                <ValidatorListItem
                  key={`${validator.description.moniker}-${validator.rank}`}
                  validator={validator}
                  index={idx}
                  isLast={idx === validators.length - 1}
                />
              ))}
              {(isLoading || isPending) &&
                [1, 2, 3, 4, 5].map((i) => (
                  <ValidatorListItem key={`load${i}`} isLoading />
                ))}
            </motion.div>
          )}
          {!validators?.length && isError && (
            <motion.div
              key="list"
              variants={animations}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div
                className="w-full flex align-center shadow-[inset_0px_-1px_var(--gray-6)] p-4"
                role="presentation"
              >
                <span
                  className="flex items-center justify-center text-md h-[40px] w-full text-color"
                  role="presentation"
                >
                  Error on fetching validators. Something went wrong, try again
                  later.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatedTable>
    </Box>
  );
};
