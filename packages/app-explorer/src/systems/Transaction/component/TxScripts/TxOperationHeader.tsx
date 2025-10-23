import type { GQLReceipt, Maybe } from '@fuel-explorer/graphql/sdk';
import { Address, Code, Copyable, HStack } from '@fuels/ui';
import { bn } from 'fuels';

import { memo } from 'react';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import {
  type ReceiptHeaderOperation,
  ReceiptHeaderOperationDataType,
} from '~/systems/Transaction/component/TxScripts/TxReceiptHeader/types';
import { notBoolean } from './utils';

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
  let value = notBoolean(
    (field.field && receipt?.[field.field]) ||
      (field.fieldFallback && receipt?.[field.fieldFallback]),
  );
  const copyableValue = notBoolean(
    field.copyableValue && receipt?.[field.copyableValue],
  );
  if (!value && field && field.fieldsFallback) {
    for (const fieldFallback of field.fieldsFallback) {
      const receiptFallback = receipt as { [key: string]: any };
      if (receipt && fieldFallback) {
        value = receiptFallback[fieldFallback];
        if (value) break;
      }
    }
  }

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
        className="text-primary text-base"
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
              href: field.hrefFactory(formattedValue),
            }
          : undefined
      }
    />
  ) : (
    <HStack gap="1" className="items-center">
      <Code
        key={key}
        className="text-xs tablet:text-sm font-mono bg-transparent text-muted p-0"
        color="gray"
      >
        {`${field.label} ${value}`}
      </Code>
      {receipt && field.copyableValue && (
        <Copyable value={copyableValue || ''} iconSize={16} />
      )}
    </HStack>
  );
}

export const TxOperationHeader = memo(_TxOperationHeader);
