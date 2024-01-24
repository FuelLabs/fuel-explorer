import { bn } from 'fuels';
import { useMemo } from 'react';
import type { BridgeTx } from '~/systems/Bridge/types';
import {
  useEthDepositLogs,
  ethLogoSrc,
  ETH_SYMBOL,
  FUEL_UNITS,
  ETH_CHAIN,
  FUEL_CHAIN,
  EthTxCache,
} from '~/systems/Chains';

export const useTxsEthToFuel = () => {
  const { logs, isFetching } = useEthDepositLogs();

  const txs: BridgeTx[] | undefined = useMemo(() => {
    return logs?.map((log) => {
      const txDatum = {
        asset: {
          assetAmount: bn(log.event.args.amount.toString()).format({
            precision: 9,
            units: FUEL_UNITS,
          }),
          assetImageSrc: ethLogoSrc,
          assetSymbol: ETH_SYMBOL,
        },
        date: log.date,
        txHash: log.transactionHash || '0x',
        fromNetwork: ETH_CHAIN,
        toNetwork: FUEL_CHAIN,
        isDone: EthTxCache.getTxIsDone(log.transactionHash || '') === 'true',
      };
      return txDatum;
    });
  }, [logs]);

  return {
    txs,
    isLoading: isFetching,
  };
};
