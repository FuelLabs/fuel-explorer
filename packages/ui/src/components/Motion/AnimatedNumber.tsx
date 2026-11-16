import { animate, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const COUNT_DURATION_S = 0.6;

export interface AnimatedNumberProps {
  value: number;
  format?: (value: number) => string;
  className?: string;
}

export function AnimatedNumber({
  value,
  format = (v) => v.toLocaleString(),
  className,
}: AnimatedNumberProps) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const previous = useRef(value);

  useEffect(() => {
    const from = previous.current;
    previous.current = value;
    if (reduceMotion || from === value || !Number.isFinite(from)) {
      setDisplay(value);
      return;
    }
    const controls = animate(from, value, {
      duration: COUNT_DURATION_S,
      ease: 'easeOut',
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [value, reduceMotion]);

  return <span className={className}>{format(display)}</span>;
}
