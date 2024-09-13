import { GQLOperationReceipt } from '@fuel-explorer/graphql';
import { memo } from 'react';
import { ReceiptItem } from '~/systems/Transaction/component/TxScripts/ReceiptItem/ReceiptItem';
import { styles } from './styles';
import { ReceiptItemRProps } from './types';

function _ReceiptItemR(props: ReceiptItemRProps) {
  const classes = styles();
  return (
    <>
      {props.receipts?.map((sub, j) => (
        <div
          key={`${j}-${sub?.item?.receiptType ?? ''}`}
          data-nested="true"
          className={classes.operationChild()}
        >
          <ReceiptItem
            isIndented
            receipt={sub as GQLOperationReceipt}
            hasPanic={props.hasPanic}
          />
          {sub?.receipts && sub?.receipts?.length > 0 && (
            <ReceiptItemR receipts={sub?.receipts} hasPanic={props.hasPanic} />
          )}
        </div>
      ))}
    </>
  );
}

export const ReceiptItemR = memo(_ReceiptItemR);
