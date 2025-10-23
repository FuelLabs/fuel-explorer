import {
  TxListItemEthToFuel,
  TxListItemFuelToEth,
  isEthChain,
  isFuelChain,
  useFuelAccountConnection,
} from '~portal/systems/Chains';

import { Alert, Button, CardList } from '@fuels/ui';
import { IconChevronDown, IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
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
  const [showDelayedLoader, setShowDelayedLoader] = useState(false);
  const {
    handlers,
    bridgeTxs,
    isLoading,
    shouldShowNotConnected,
    shouldShowEmpty,
    hasMorePages,
  } = useBridgeTxs();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isLoading) {
      timeout = setTimeout(() => setShowDelayedLoader(true), 5000);
    } else {
      setShowDelayedLoader(false);
    }
    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (isLoading) {
    return (
      <>
        <BridgeTxItemsLoading />
        {showDelayedLoader && (
          <Alert color="blue" className="mt-3 mb-6">
            <Alert.Icon>
              <IconInfoCircle size="md" />
            </Alert.Icon>
            <Alert.Text>
              This process is taking longer than expected and may take a few
              minutes, especially if your account has many transactions.
            </Alert.Text>
            <Alert.Text>
              We are actively working on improving this experience by
              implementing a dedicated indexer for the Fuel Bridge transactions.
            </Alert.Text>
          </Alert>
        )}
      </>
    );
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
            isFuelChain(txDatum.toNetwork) &&
            txDatum.txHash &&
            txDatum.nonce != null
          ) {
            return (
              <TxListItemEthToFuel
                key={`${index}-${txDatum.txHash}`}
                txHash={txDatum.txHash}
                messageSentEventNonce={txDatum.nonce}
              />
            );
          }
          if (
            isFuelChain(txDatum.fromNetwork) &&
            isEthChain(txDatum.toNetwork) &&
            txDatum.txHash
          ) {
            return (
              <TxListItemFuelToEth
                key={`${index}-${txDatum.txHash}`}
                txHash={txDatum.txHash}
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
