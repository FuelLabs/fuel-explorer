import { Collapsible, ScrollArea } from '@fuels/ui';
import { useContext } from 'react';
import { useMeasure } from 'react-use';
import { JsonViewer } from '~/systems/Core/components/JsonViewer/JsonViewer';
import { ReceiptContext } from '~/systems/Transaction/component/TxScripts/context';
import { parseTXScriptJson } from '~/systems/Transaction/component/TxScripts/utils';

import { styles } from './styles';

const DECODED_FIELDS = ['decoded', 'arguments', 'data'];

const expandDecoded = (level: number, _value: unknown, field?: string) =>
  level === 0 || (level <= 2 && DECODED_FIELDS.includes(field ?? ''));

export function TxReceiptBlock() {
  const { receipt } = useContext(ReceiptContext);
  const classes = styles();
  const [ref, { width }] = useMeasure();
  return (
    <Collapsible.Content
      ref={ref as React.Ref<HTMLDivElement>}
      className={classes.utxos()}
    >
      <ScrollArea style={{ width }}>
        <JsonViewer
          shouldExpandNode={expandDecoded}
          data={
            receipt?.decoded
              ? {
                  decoded: {
                    contract: receipt.decoded.contractName,
                    [receipt.decoded.kind === 'call' ? 'method' : 'event']:
                      receipt.decoded.name,
                    [receipt.decoded.contractName
                      ? receipt.decoded.kind === 'call'
                        ? 'arguments'
                        : 'data'
                      : 'callData']: receipt.decoded.value,
                  },
                  ...parseTXScriptJson(receipt.item),
                }
              : parseTXScriptJson(receipt?.item)
          }
        />
      </ScrollArea>
    </Collapsible.Content>
  );
}
