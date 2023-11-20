import type { ReactNode } from 'react';

type LoadingBoxProps = {
  isLoading?: boolean;
  loadingEl?: ReactNode;
  regularEl?: ReactNode;
};

export function LoadingWrapper({
  isLoading,
  loadingEl,
  regularEl,
}: LoadingBoxProps) {
  return isLoading ? loadingEl : regularEl;
}
