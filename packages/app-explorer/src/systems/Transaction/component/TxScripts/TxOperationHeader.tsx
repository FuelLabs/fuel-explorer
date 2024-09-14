import { GQLReceipt, Maybe } from '@fuel-explorer/graphql/sdk';
import { Address, Code } from '@fuels/ui';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { memo } from 'react';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import {
  ReceiptHeaderOperation,
  ReceiptHeaderOperationDataType,
} from '~/systems/Transaction/component/TxScripts/TxReceiptHeader/types';

function _TxOperationHeader({
  field,
  index,
  receipt,
}: {
  field: ReceiptHeaderOperation;
  index: number;
  receipt: Maybe<GQLReceipt> | undefined;
}) {
  if (
    field == null ||
    (field.requiredField && !receipt?.[field.requiredField])
  ) {
    return null;
  }

  const key = `${field.label}-${index}`;
  const value =
    (field.field && receipt?.[field.field]) ||
    (field.fieldFallback && receipt?.[field.fieldFallback]);
  const formattedValue =
    field.type === ReceiptHeaderOperationDataType.HEX_ADDRESS &&
    value &&
    !String(value)?.startsWith('0x')
      ? bn(value).toHex()
      : value;

  if (formattedValue == null) {
    return null;
  }

  if (field.type === ReceiptHeaderOperationDataType.AMOUNT) {
    return (
      <Amount
        iconSize={16}
        assetId={receipt?.assetId}
        value={bn(value)}
        className="text-xs tablet:text-sm"
      />
    );
  }

  return String(formattedValue)?.startsWith('0x') ? (
    <Address
      value={formattedValue}
      className="text-xs tablet:text-sm font-mono"
      prefix={field.label}
      linkProps={
        field.type === ReceiptHeaderOperationDataType.HEX_ADDRESS &&
        field?.hrefFactory
          ? {
              as: NextLink,
              href: field.hrefFactory(formattedValue),
            }
          : undefined
      }
    />
  ) : (
    <Code
      key={key}
      className="text-xs tablet:text-sm font-mono bg-transparent text-muted p-0"
      color="gray"
    >
      {`${field.label} ${value}`}
    </Code>
  );
}

export const TxOperationHeader = memo(_TxOperationHeader);
