import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type RollingLabelProps = {
  text: string;
  /** 1 rolls the new text in from below, -1 from above. */
  direction: 1 | -1;
};

const SPRING = {
  type: 'spring',
  stiffness: 520,
  damping: 34,
  mass: 0.6,
} as const;

const charVariants = {
  enter: (direction: number) => ({ y: `${direction * 100}%`, opacity: 0 }),
  center: { y: '0%', opacity: 1 },
  exit: (direction: number) => ({ y: `${direction * -100}%`, opacity: 0 }),
};

export function RollingLabel({ text, direction }: RollingLabelProps) {
  const reduce = useReducedMotion();

  return (
    // Clip only vertically: the outgoing word can be wider than the new one.
    // The letters are the text itself; a hidden copy would double it for
    // anything reading the element's text, including the e2e bridge helpers.
    <span className="relative inline-flex overflow-x-visible overflow-y-clip">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        {/* Not flex: flex items are blocks, which breaks innerText per letter. */}
        <motion.span key={text} className="inline-block whitespace-pre">
          {[...text].map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              custom={direction}
              variants={charVariants}
              initial={reduce ? false : 'enter'}
              animate="center"
              exit={reduce ? undefined : 'exit'}
              transition={{ ...SPRING, delay: index * 0.018 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
