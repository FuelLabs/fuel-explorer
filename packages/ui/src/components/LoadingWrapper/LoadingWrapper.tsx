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

  return isLoading ? (
    <>
      {Array.from({ length: repeatLoader }).map((_, i) =>
        // biome-ignore lint/suspicious/noDoubleEquals: <explanation>
        loadingEl != undefined
          ? cloneElement(loadingEl as any, { key: i })
          : null,
      )}
    </>
  ) : (
    <>{regularEl}</>
  );
}
