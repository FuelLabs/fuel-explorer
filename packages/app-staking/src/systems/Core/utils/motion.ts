import { useReducedMotion } from 'framer-motion';

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_EXIT = [0.4, 0, 0.2, 1] as const;

// One entrance for content that mounts and unmounts: a short rise and fade.
// Reduced motion keeps the fade and drops the rise.
export function useRiseMotion() {
  const reduced = useReducedMotion();
  return {
    initial: { opacity: 0, y: reduced ? 0 : 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: EASE_OUT },
    },
    exit: {
      opacity: 0,
      y: 0,
      transition: { duration: 0.15, ease: EASE_EXIT },
    },
  };
}
