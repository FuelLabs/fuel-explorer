import { motion, useReducedMotion } from 'framer-motion';

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Skips the fade. Use it for content already in the first viewport. */
  immediate?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion || immediate) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}
