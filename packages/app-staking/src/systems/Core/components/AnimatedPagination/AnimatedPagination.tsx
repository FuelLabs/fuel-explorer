import { HStack, IconButton } from '@fuels/ui';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Pagination } from '~staking/systems/Core/types/pagination';
import { styles } from './styles';

type Props = Pagination & { enabled: boolean };

export function AnimatedPagination({
  hasNextPage,
  hasPreviousPage,
  fetchNextPage,
  fetchPreviousPage,
  isFetching,
  enabled,
}: Props) {
  const classes = styles();

  return (
    <HStack align="center" justify="between" flexGrow="1">
      <AnimatePresence initial={false}>
        {enabled && (
          <motion.div
            variants={{
              open: { opacity: 1 },
              closed: { opacity: 0 },
            }}
            initial="closed"
            animate="open"
            exit="closed"
            className={classes.paginationContainer()}
          >
            <IconButton
              aria-label="Previous page"
              variant="ghost"
              size="1"
              icon={IconArrowLeft}
              disabled={!hasPreviousPage}
              isLoading={isFetching}
              onClick={fetchPreviousPage}
              className={classes.paginationButton()}
            />
            <IconButton
              aria-label="Next page"
              variant="ghost"
              size="1"
              icon={IconArrowRight}
              disabled={!hasNextPage}
              isLoading={isFetching}
              onClick={fetchNextPage}
              className={classes.paginationButton()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </HStack>
  );
}
