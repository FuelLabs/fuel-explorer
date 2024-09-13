import { GQLReceiptType } from '@fuel-explorer/graphql/sdk';
import {
  ReceiptHeaderOperation,
  ReceiptHeaderOperationDataType,
} from './types';

export const RECEIPT_FIELDS_MAP: Record<
  GQLReceiptType,
  Array<ReceiptHeaderOperation>
> = {
  [GQLReceiptType.Call]: [
    { label: 'Method', field: 'param1' },
    {
      label: 'Contract:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'to',
      fieldFallback: 'contractId',
    },
  ],
  [GQLReceiptType.Mint]: [
    {
      label: 'Value',
      type: ReceiptHeaderOperationDataType.AMOUNT,
      field: 'val',
      requiredField: 'subId',
    },
    {
      label: 'Asset:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'contractId',
    },
  ],
  [GQLReceiptType.Burn]: [
    {
      label: 'Value',
      type: ReceiptHeaderOperationDataType.AMOUNT,
      field: 'val',
      requiredField: 'subId',
    },
    {
      label: 'Asset:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'contractId',
    },
  ],
  [GQLReceiptType.TransferOut]: [
    { type: ReceiptHeaderOperationDataType.AMOUNT, field: 'amount' },
    {
      label: 'To:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'toAddress',
      hrefFactory: (value: string) => `/account/${value}/assets`,
    },
  ],
  [GQLReceiptType.Transfer]: [
    { type: ReceiptHeaderOperationDataType.AMOUNT, field: 'amount' },
    {
      label: 'To:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'toAddress',
      hrefFactory: (value: string) => `/account/${value}/assets`,
    },
  ],
  [GQLReceiptType.MessageOut]: [
    {
      label: 'To:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'sender',
      requiredField: 'recipient',
      hrefFactory: (value: string) => `/account/${value}/assets`,
    },
    {
      label: 'From:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'recipient',
      requiredField: 'sender',
      hrefFactory: (value: string) => `/account/${value}/assets`,
    },
  ],
  [GQLReceiptType.Log]: [
    { label: 'PC', field: 'pc' },
    { label: 'Data:', field: 'data' },
  ],
  [GQLReceiptType.LogData]: [
    { label: 'PC', field: 'pc' },
    { label: 'Data:', field: 'data' },
  ],
  [GQLReceiptType.Panic]: [
    { label: 'Reason:', field: 'reason' },
    {
      label: 'Contract ID:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'contractId',
    },
  ],
  [GQLReceiptType.Revert]: [
    { label: 'Reason:', field: 'reason' },
    {
      label: 'Contract ID:',
      type: ReceiptHeaderOperationDataType.HEX_ADDRESS,
      field: 'contractId',
    },
  ],
  [GQLReceiptType.ReturnData]: [
    { label: 'PC', field: 'pc' },
    { label: 'Data:', field: 'data' },
  ],
  [GQLReceiptType.Return]: [
    { label: 'Value:', field: 'val' },
    { label: 'PC', field: 'pc' },
  ],
  [GQLReceiptType.ScriptResult]: [
    { label: 'Gas Used:', field: 'gasUsed' },
    { label: 'Result:', field: 'result' },
  ],
};
