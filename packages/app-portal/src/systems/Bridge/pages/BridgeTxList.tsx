import {
  TxListItemEthToFuel,
  TxListItemFuelToEth,
  isEthChain,
  isFuelChain,
  useFuelAccountConnection,
} from '~portal/systems/Chains';

import { Alert, Button, CardList } from '@fuels/ui';
import { IconChevronDown, IconInfoCircle } from '@fuels/ui';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import {
  BridgeListEmpty,
  BridgeTxItemsLoading,
  BridgeTxListNotConnected,
} from '../components';
import { useBridgeTxs } from '../hooks';

export const BridgeTxList = () => {
  const { t } = useTranslation();
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

  // Keys of the rows already on screen, to tell first rows from added ones.
  const seenKeys = useRef<Set<string> | null>(null);
  const pagedRef = useRef(false);
  const rowKeys = (bridgeTxs ?? []).map(rowKey);
  const rowKeysId = rowKeys.join('|');

  // biome-ignore lint/correctness/useExhaustiveDependencies: rowKeysId tracks the row set
  useEffect(() => {
    if (isLoading) {
      seenKeys.current = null;
      return;
    }
    const seen = seenKeys.current;
    const grew = !!seen && rowKeys.some((key) => !seen.has(key));
    seenKeys.current = new Set(rowKeys);
    if (grew) pagedRef.current = false;
  }, [isLoading, rowKeysId]);

  function enterProps(key: string, index: number) {
    const seen = seenKeys.current;
    if (!seen) {
      // First rows after the skeleton rise one after another.
      if (index >= MAX_STAGGER) return {};
      return {
        className: 'fuel-rise',
        style: { '--fuel-enter-delay': `${index * 40}ms` } as CSSProperties,
      };
    }
    if (seen.has(key)) return {};
    return { className: pagedRef.current ? 'fuel-appear' : 'fuel-row-new' };
  }

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
          <Alert className="fuel-appear mt-3 mb-6">
            <Alert.Icon>
              <IconInfoCircle size={16} />
            </Alert.Icon>
            <Alert.Text>{t('portal.history.slow_loading')}</Alert.Text>
            <Alert.Text>{t('portal.history.slow_loading_detail')}</Alert.Text>
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
      <CardList isClickable gap="0" className={classes.cardList()}>
        {bridgeTxs?.map((txDatum, index) => {
          const key = rowKey(txDatum);
          if (
            isEthChain(txDatum.fromNetwork) &&
            isFuelChain(txDatum.toNetwork) &&
            txDatum.txHash &&
            txDatum.nonce != null
          ) {
            return (
              <TxListItemEthToFuel
                key={key}
                txHash={txDatum.txHash}
                messageSentEventNonce={txDatum.nonce}
                {...enterProps(key, index)}
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
                key={key}
                txHash={txDatum.txHash}
                {...enterProps(key, index)}
              />
            );
          }

          return null;
        })}
      </CardList>
      {hasMorePages && (
        <Button
          variant="ghost"
          size="2"
          color="gray"
          className={classes.buttonShowMore()}
          rightIcon={IconChevronDown}
          iconSize={13}
          onClick={() => {
            pagedRef.current = true;
            handlers.showMore();
          }}
        >
          {t('portal.history.show_more')}
        </Button>
      )}
    </>
  );
};

const MAX_STAGGER = 8;

function rowKey(tx: { txHash?: string; nonce?: unknown }) {
  return `${tx.txHash}-${String(tx.nonce)}`;
}

const styles = tv({
  slots: {
    cardList:
      'cursor-pointer select-none border border-[var(--fuel-border)] overflow-hidden',
    buttonShowMore: 'mt-4 w-full',
  },
});
