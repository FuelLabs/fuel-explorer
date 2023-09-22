import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function fClass(root: string, ...args: string[]) {
  const nested = args.reduce((acc, curr) => {
    return `${acc}__${curr}`;
  }, '');
  return `fuel-${root}${nested}`;
}

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function refColorVariablesAsObj(list: string[]) {
  return list.reduce(
    (acc, curr) => {
      acc[curr] = `var(--color-${curr})`;
      return acc;
    },
    {} as Record<string, string>,
  );
}
