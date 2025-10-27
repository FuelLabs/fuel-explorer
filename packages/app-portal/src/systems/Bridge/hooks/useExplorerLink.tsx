import { ETH_CHAIN, FUEL_CHAIN, urlJoin } from 'app-commons';
import { buildBlockExplorerUrl } from 'fuels';
import { useMemo } from 'react';

export type ExplorerLinkProps = {
  network: 'ethereum' | 'fuel';
  providerUrl?: string;
  id: string;
};

export const createETHExplorerLink = (...path: string[]) => {
  return urlJoin(ETH_CHAIN.blockExplorers?.default.url || '', ...path);
};

export function useExplorerLink({
  network,
  providerUrl,
  id,
}: ExplorerLinkProps) {
  const href = useMemo<string>(() => {
    if (network === 'ethereum') {
      return `${ETH_CHAIN.blockExplorers?.default.url}/tx/${id}`;
    }

    if (network === 'fuel') {
      if (providerUrl === FUEL_CHAIN.providerUrl) {
        return `/tx/${id}`;
      }

      return buildBlockExplorerUrl({
        path: `transaction/${id}`,
        providerUrl,
        blockExplorerUrl: FUEL_CHAIN.blockExplorerUrl,
      });
    }

    return '';
  }, [network, providerUrl, id]);

  return {
    href,
  };
}
