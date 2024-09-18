import { GQLOperationType } from '~/graphql/generated/sdk-provider';

const GroupTypeMap = {
  CALL: 'FROM_CONTRACT',
  RETURN: 'FINAL_RESULT',
  SCRIPT_RESULT: 'FINAL_RESULT',
};

export function GroupedReceiptsFactory(group: any) {
  const type = GroupTypeMap[group.type] ?? GQLOperationType.Rootless;
  const top = {
    type,
    receipts: [] as any,
  };
  top.receipts.push({ item: group.item });
  group.receipts && top.receipts.push(...group.receipts);
  return top;
}
