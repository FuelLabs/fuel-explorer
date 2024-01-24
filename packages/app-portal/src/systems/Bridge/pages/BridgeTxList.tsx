import { cssObj } from '@fuel-ui/css';
import { CardList } from '@fuel-ui/react';
import {
  useFuelAccountConnection,
  TxListItemEthToFuel,
  isEthChain,
  isFuelChain,
  TxListItemFuelToEth,
} from '~/systems/Chains';

import {
  BridgeListEmpty,
  BridgeTxItemsLoading,
  BridgeTxListNotConnected,
} from '../components';
import { useBridgeTxs } from '../hooks';

export const BridgeTxList = () => {
  const { isConnecting, handlers } = useFuelAccountConnection();
  const {
    txs: bridgeTxs,
    isLoading,
    shouldShowNotConnected,
    shouldShowEmpty,
    shouldShowList,
  } = useBridgeTxs();

  return (
    <>
      {isLoading && <BridgeTxItemsLoading />}
      {shouldShowNotConnected && (
        <BridgeTxListNotConnected
          isConnecting={isConnecting}
          onClick={handlers.connect}
        />
      )}
      {shouldShowEmpty && <BridgeListEmpty />}
      {shouldShowList && (
        <CardList isClickable css={styles.cardList}>
          {bridgeTxs.map((txDatum, index) => {
            if (
              isEthChain(txDatum.fromNetwork) &&
              isFuelChain(txDatum.toNetwork)
            ) {
              return (
                <TxListItemEthToFuel
                  key={`${index}-${txDatum.txHash}`}
                  txHash={txDatum.txHash || ''}
                  asset={txDatum.asset}
                  isDone={txDatum.isDone}
                />
              );
            }
            if (
              isFuelChain(txDatum.fromNetwork) &&
              isEthChain(txDatum.toNetwork)
            ) {
              return (
                <TxListItemFuelToEth
                  key={`${index}-${txDatum.txHash}`}
                  txHash={txDatum.txHash || ''}
                  asset={txDatum.asset}
                  isDone={txDatum.isDone}
                  date={txDatum.date}
                />
              );
            }

            return null;
          })}
        </CardList>
      )}
    </>
  );
};

const styles = {
  cardList: cssObj({
    // width: '328px',
    // '@md': {
    //   width: '95%',
    // },
  }),
};
