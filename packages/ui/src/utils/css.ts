import clsx from 'clsx';

export function fClass(root: string, ...args: string[]) {
  const nested = args.reduce((acc, curr) => {
    return `${acc}__${curr}`;
  }, '');
  return `fuel-${root}${nested}`;
}

export const cx = clsx;

export function refColorVariablesAsObj(list: string[]) {
  return list.reduce(
    (acc, curr) => {
      acc[curr] = `var(--color-${curr})`;
      return acc;
    },
    {} as Record<string, string>,
  );
}
