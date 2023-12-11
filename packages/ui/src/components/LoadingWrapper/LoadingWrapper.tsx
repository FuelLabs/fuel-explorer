import { cloneElement } from 'react';
import type { ReactNode } from 'react';

type LoadingBoxProps = {
  isLoading?: boolean;
  repeatLoader?: number;
  loadingEl?: ReactNode;
  regularEl?: ReactNode;
  noItems?: boolean;
  noItemsEl?: ReactNode;
};

export function LoadingWrapper({
  isLoading,
  repeatLoader = 1,
  loadingEl,
  regularEl,
  noItems,
  noItemsEl,
}: LoadingBoxProps) {
  if (!isLoading && noItems) return noItemsEl ?? null;
  return isLoading ? (
    <>
      {Array.from({ length: repeatLoader }).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (_, i) => cloneElement(loadingEl as any, { key: i }) ?? null,
      )}
    </>
  ) : (
    regularEl ?? null
  );
}
