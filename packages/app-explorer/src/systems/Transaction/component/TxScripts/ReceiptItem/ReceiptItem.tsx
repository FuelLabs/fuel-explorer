import { Collapsible, cx } from '@fuels/ui';
import { memo, useState } from 'react';
import { TxReceiptBlock } from '~/systems/Transaction/component/TxScripts/TxReceiptBlock/TxReceiptBlock';
import { TxReceiptHeader } from '~/systems/Transaction/component/TxScripts/TxReceiptHeader/TxReceiptHeader';
import {
  ReceiptContext,
  type ReceiptItemContext,
} from '~/systems/Transaction/component/TxScripts/context';
import { styles } from './styles';

function _ReceiptItem({
  receipt,
  isIndented,
  hasPanic,
  className,
  ...props
}: ReceiptItemContext) {
  const classes = styles({ indent: isIndented });
  const [opened, setOpened] = useState(false);

  return (
    <ReceiptContext.Provider value={{ receipt: receipt, isIndented, hasPanic }}>
      <div
        className={cx(classes.receiptRow({ className }), 'group')}
        data-opened={opened}
      >
        <Collapsible
          {...props}
          opened={opened}
          className="gap-0"
          onOpenChange={setOpened}
        >
          <TxReceiptHeader />
          <TxReceiptBlock />
        </Collapsible>
      </div>
    </ReceiptContext.Provider>
  );
}

export const ReceiptItem = memo(_ReceiptItem);
