import { cloneElement } from 'react';
import type { ReactElement, ReactNode } from 'react';

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
}: LoadingBoxProps): ReactElement | null {
  if (!isLoading && noItems) return noItemsEl ? <>{noItemsEl}</> : null;

  return isLoading && loadingEl ? (
    <>
      {Array.from({ length: repeatLoader }).map((_, i) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        loadingEl ? cloneElement(loadingEl as any, { key: i }) : null
      )}
    </>
  ) : (
    <>{regularEl}</> ?? null
  );
}
