import { AnimatePresence, motion } from 'framer-motion';

type AnimatedHeightProps = {
  enabled: boolean;
  children: React.ReactNode;
};

export function AnimatedHeight({ enabled, children }: AnimatedHeightProps) {
  return (
    <AnimatePresence initial={false}>
      {enabled && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
