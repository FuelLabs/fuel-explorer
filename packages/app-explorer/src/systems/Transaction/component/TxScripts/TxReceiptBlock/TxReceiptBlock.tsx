import { Collapsible, ScrollArea } from '@fuels/ui';
import { useContext } from 'react';
import { useMeasure } from 'react-use';
import { JsonViewer } from '~/systems/Core/components/JsonViewer/JsonViewer';
import { ReceiptContext } from '~/systems/Transaction/component/TxScripts/context';
import { parseTXScriptJson } from '~/systems/Transaction/component/TxScripts/utils';

import { styles } from './styles';

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
        <JsonViewer data={parseTXScriptJson(receipt?.item)} />
      </ScrollArea>
    </Collapsible.Content>
  );
}
