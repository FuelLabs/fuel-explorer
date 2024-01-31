import { cssObj } from '@fuel-ui/css';
import { Button, CardList } from '@fuel-ui/react';
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
  const { isConnecting, handlers: fuelHandlers } = useFuelAccountConnection();
  const {
    handlers,
    bridgeTxs,
    isLoading,
    shouldShowNotConnected,
    shouldShowEmpty,
    shouldShowList,
    hasMorePages,
  } = useBridgeTxs();

  return (
    <>
      {isLoading && <BridgeTxItemsLoading />}
      {shouldShowNotConnected && (
        <BridgeTxListNotConnected
          isConnecting={isConnecting}
          onClick={fuelHandlers.connect}
        />
      )}
      {shouldShowEmpty && <BridgeListEmpty />}
      {shouldShowList && (
        <>
          <CardList isClickable css={styles.cardList}>
            {bridgeTxs?.map((txDatum, index) => {
              if (
                isEthChain(txDatum.fromNetwork) &&
                isFuelChain(txDatum.toNetwork)
              ) {
                return (
                  <TxListItemEthToFuel
                    key={`${index}-${txDatum.txHash}`}
                    txHash={txDatum.txHash || ''}
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
                  />
                );
              }

              return null;
            })}
          </CardList>
          {hasMorePages && (
            <Button
              variant="link"
              size="sm"
              intent="info"
              css={styles.buttonShowMore}
              rightIcon="ChevronDown"
              iconSize={13}
              onClick={handlers.showMore}
            >
              Show more
            </Button>
          )}
        </>
      )}
    </>
  );
};

const styles = {
  cardList: cssObj({
    cursor: 'pointer',
    userSelect: 'none',

    ':hover': {
      backgroundColor: '$intentsBase3',
    },
  }),
  buttonShowMore: cssObj({
    mt: '$2',
  }),
};
