export const HOME = [
  '{ getBlocksDashboard { nodes { blockNo transactionsCount totalFee gasUsed timestamp } } }',
  '{ transactions(first: 10) { nodes { _id id title statusType time { fromNow rawUnix full } gasCosts { fee feeInUsd } } pageInfo { endCursor hasNextPage hasPreviousPage startCursor } } }',
  '{ blocks(first: 10) { edges { node { id height producer time { fromNow full rawUnix } header { transactionsCount } } } pageInfo { hasNextPage hasPreviousPage } } }',
];
export const TX = (id) =>
  `{ transaction(id: "${id}") { id blockHeight statusType title time { fromNow full rawUnix } gasCosts { fee gasUsed } groupedInputs { __typename } groupedOutputs { __typename } operations { type receipts { item { receiptType } } } receipts { receiptType } inputs { __typename } outputs { __typename } status { __typename } rawPayload } }`;
export const ACCOUNT = (addr) =>
  `{ transactionsByOwner(owner: "${addr}", first: 10) { nodes { _id id title statusType time { fromNow } gasCosts { fee } } pageInfo { totalCount hasNextPage hasPreviousPage endCursor } } }`;
export const SEARCH = (q) =>
  `{ search(query: "${q}") { block { height } transaction { id } account { address } } }`;
