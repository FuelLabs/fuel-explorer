import { Collapsible, ScrollArea } from '@fuels/ui';
import { useContext } from 'react';
import { useMeasure } from 'react-use';
import { JsonViewer } from '~/systems/Core/components/JsonViewer/JsonViewer';
import { ReceiptContext } from '~/systems/Transaction/component/TxScripts/context';
import { parseTXScriptJson } from '~/systems/Transaction/component/TxScripts/utils';
import type { DecodedReceipt } from '~/systems/Transaction/utils/abiDecoder';

import { styles } from './styles';

const DECODED_FIELDS = ['decoded', 'arguments', 'data'];

const expandDecoded = (level: number, _value: unknown, field?: string) =>
  level === 0 || (level <= 2 && DECODED_FIELDS.includes(field ?? ''));

function decodedView(decoded: DecodedReceipt) {
  if (decoded.kind === 'log') {
    return {
      contract: decoded.contractName,
      event: decoded.name,
      data: decoded.value,
    };
  }
  return {
    contract: decoded.contractName,
    method: decoded.name,
    [decoded.raw ? 'callData' : 'arguments']: decoded.value,
  };
}

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
                  decoded: decodedView(receipt.decoded),
                  ...parseTXScriptJson(receipt.item),
                }
              : parseTXScriptJson(receipt?.item)
          }
        />
      </ScrollArea>
    </Collapsible.Content>
  );
}
