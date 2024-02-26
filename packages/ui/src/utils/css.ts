import { twJoin } from 'tailwind-merge';

export function fClass(root: string, ...args: string[]) {
  const nested = args.reduce((acc, curr) => {
    return `${acc}__${curr}`;
  }, '');
  return `fuel-${root}${nested}`;
}

export const cx = twJoin;

export function refColorVariablesAsObj(list: string[]) {
  return list.reduce(
    (acc, curr) => {
      acc[curr] = `var(--color-${curr})`;
      return acc;
    },
    {} as Record<string, string>,
  );
}
