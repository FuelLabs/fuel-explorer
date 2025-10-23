import { animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

type UseAnimatedCounterParams = {
  to: string | number | undefined;
  duration?: number;
  parse?: (value: string) => number;
  format?: (value: number) => string;
};

const defaultParser = (value: string): number => {
  const parsed = Number(value.replace(/[^\d.]/g, ''));
  return parsed;
};

const defaultFormatter = (value: number): string => {
  return value.toFixed(0);
};

export const useAnimatedCounter = ({
  to = 0,
  duration = 0.8,
  parse = defaultParser,
  format = defaultFormatter,
}: UseAnimatedCounterParams) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const from = ref.current?.textContent ?? '0';
    const parsedFrom = parse(from);
    const parsedTo = parse(typeof to === 'string' ? to : to.toString());

    const controls = animate(parsedFrom, parsedTo, {
      duration,
      type: 'tween',
      ease: [0.5, 0.8, 0.83, 1],
      onUpdate: (value) => {
        if (ref.current) {
          ref.current.textContent = format(value);
        }
      },
    });

    return () => controls.stop();
  }, [to, duration, format, parse]);

  return ref;
};
