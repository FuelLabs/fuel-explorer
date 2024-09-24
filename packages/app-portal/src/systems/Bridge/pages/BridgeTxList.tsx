import {
  TxListItemEthToFuel,
  TxListItemFuelToEth,
  isEthChain,
  isFuelChain,
  useFuelAccountConnection,
} from '~portal/systems/Chains';

import { Button, CardList } from '@fuels/ui';
import { IconChevronDown } from '@tabler/icons-react';
import { tv } from 'tailwind-variants';
import {
  BridgeListEmpty,
  BridgeTxItemsLoading,
  BridgeTxListNotConnected,
} from '../components';
import { useBridgeTxs } from '../hooks';

export const BridgeTxList = () => {
  const classes = styles();
  const { isConnecting, handlers: fuelHandlers } = useFuelAccountConnection();
  const {
    handlers,
    bridgeTxs,
    isLoading,
    shouldShowNotConnected,
    shouldShowEmpty,
    hasMorePages,
  } = useBridgeTxs();

  if (isLoading) {
    return <BridgeTxItemsLoading />;
  }

  if (shouldShowNotConnected) {
    return (
      <BridgeTxListNotConnected
        isConnecting={isConnecting}
        onClick={fuelHandlers.connect}
      />
    );
  }

  if (shouldShowEmpty) {
    return <BridgeListEmpty />;
  }

  return (
    <>
      <CardList isClickable className={classes.cardList()}>
        {bridgeTxs?.map((txDatum, index) => {
          if (
            isEthChain(txDatum.fromNetwork) &&
            isFuelChain(txDatum.toNetwork)
          ) {
            return (
              <TxListItemEthToFuel
                key={`${index}-${txDatum.txHash}`}
                txHash={txDatum.txHash || ''}
                messageSentEventNonce={txDatum.nonce || 0n}
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
          size="2"
          color="blue"
          className={classes.buttonShowMore()}
          rightIcon={IconChevronDown}
          iconSize={13}
          onClick={handlers.showMore}
        >
          Show more
        </Button>
      )}
    </>
  );
};

const styles = tv({
  slots: {
    cardList: 'cursor-pointer select-none :hover:bg-muted', // was intentsBase3
    buttonShowMore: 'mt-2 w-full',
  },
});
