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
        loadingEl ? cloneElement(loadingEl as any, { key: i }) : null,
      )}
    </>
  ) : (
    // biome-ignore lint: we need to "unnecessary Fragment" to make sure it's a ReactElement output
    <>{regularEl}</> ?? null
  );
}
