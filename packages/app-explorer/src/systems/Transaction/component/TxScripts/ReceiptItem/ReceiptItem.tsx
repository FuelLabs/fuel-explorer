import { Collapsible, cx } from '@fuels/ui';
import { memo, useState } from 'react';
import { TxReceiptBlock } from '~/systems/Transaction/component/TxScripts/TxReceiptBlock/TxReceiptBlock';
import { TxReceiptHeader } from '~/systems/Transaction/component/TxScripts/TxReceiptHeader/TxReceiptHeader';
import { TxScriptsContext } from './constants';
import { styles } from './styles';
import { ReceiptItemProps } from './types';

function _ReceiptItem({
  receipt,
  isIndented,
  hasPanic,
  className,
  ...props
}: ReceiptItemProps) {
  const classes = styles({ indent: isIndented });
  const [opened, setOpened] = useState(false);

  return (
    <TxScriptsContext.Provider
      value={{ receipt: receipt, isIndented, hasPanic }}
    >
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
    </TxScriptsContext.Provider>
  );
}

export const ReceiptItem = memo(_ReceiptItem);
