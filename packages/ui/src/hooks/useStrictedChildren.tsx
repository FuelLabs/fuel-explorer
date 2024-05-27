'use client';

import type { ReactNode } from 'react';
import { Children, useEffect, useMemo } from 'react';

export function useStrictedChildren(
  name: string,
  list: string[],
  children: ReactNode | ReactNode[],
) {
  const count = Children.count(children);
  const items = Children.toArray(children);
  const head = useMemo(() => [...list].slice(0, list.length - 1), list);
  const last = useMemo(() => list[list.length - 1], list);

  if (count === 0) {
    throw new Error(
      `${name} must have at least one child of type ${head.join(
        ', ',
      )} or ${last}`,
    );
  }

  useEffect(() => {
    items.forEach((child) => {
      const id = (child as any)?.type?.id;
      if (!list.includes(id)) {
        throw new Error(
          `${name} only accepts ${head.join(', ')} or ${last} as children`,
        );
      }
    });
  }, [count]);

  return children;
}
