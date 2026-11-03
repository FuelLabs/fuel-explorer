import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type AnimatedHeightProps = {
  enabled: boolean;
  children: ReactNode;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function AnimatedHeight({ enabled, children }: AnimatedHeightProps) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {enabled && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.3, ease: EASE }}
          style={{ overflow: 'hidden' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
