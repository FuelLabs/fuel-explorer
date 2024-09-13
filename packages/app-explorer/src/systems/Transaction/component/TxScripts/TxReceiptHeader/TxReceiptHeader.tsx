import { GQLReceiptType } from '@fuel-explorer/graphql/sdk';
import { Collapsible, VStack } from '@fuels/ui';
import { useContext } from 'react';
import { TxOperationHeader } from '~/systems/Transaction/component/TxScripts/TxOperationHeader';
import { TxReceiptAmount } from '~/systems/Transaction/component/TxScripts/TxReceiptAmount';
import { TxReceiptBadge } from '~/systems/Transaction/component/TxScripts/TxReceiptBadge/TxReceiptBadge';
import { ReceiptContext } from '~/systems/Transaction/component/TxScripts/context';

import { RECEIPT_FIELDS_MAP } from './constants';
import { styles } from './styles';

export function TxReceiptHeader() {
  const { receipt: item } = useContext(ReceiptContext);
  const receipt = item?.item;
  const classes = styles();
  const type = (receipt?.receiptType ?? 'UNKNOWN') as GQLReceiptType;
  const fields = RECEIPT_FIELDS_MAP[type] || [];

  return (
    <Collapsible.Header className={classes.header()}>
      <TxReceiptBadge />
      <VStack className="flex-1 gap-[2px]">
        {!fields?.length && <TxReceiptBadge />}

        {fields?.map((field, index) => (
          <TxOperationHeader
            key={`operation-header-${field.type}-${field.requiredField ?? ''}-${
              field.field
            }-${field.fieldFallback}`}
            field={field}
            index={index}
            receipt={receipt}
          />
        ))}
      </VStack>
      <TxReceiptAmount />
    </Collapsible.Header>
  );
}
