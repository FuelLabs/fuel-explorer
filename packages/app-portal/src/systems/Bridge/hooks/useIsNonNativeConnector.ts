import { useCurrentConnector } from '@fuels/react';
import { useMemo } from 'react';

const nonNative = ['ethereum', 'solana'];

export const useIsNonNativeConnector = () => {
  const { currentConnector } = useCurrentConnector();

  const isNonNative = useMemo<boolean | null>(() => {
    if (currentConnector?.name) {
      return nonNative.some((name) => {
        return currentConnector.name.toLowerCase().includes(name);
      });
    }

    return null;
  }, [currentConnector]);

  return { isNonNative };
};
