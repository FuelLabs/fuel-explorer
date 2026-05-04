import { gql } from 'graphql-request';

export const LATEST_HEIGHT_QUERY = gql`
  query latestHeight {
    blocks(last: 1) {
      nodes {
        header {
          height
        }
      }
    }
  }
`;

export const SYNCER_BLOCKS_QUERY = gql`
  query syncerBlocks($after: String, $first: Int) {
    blocks(after: $after, first: $first) {
      nodes {
        consensus {
          __typename
          ... on PoAConsensus {
            signature
          }
        }
        header {
          daHeight
          height
          id
          time
          transactionsCount
        }
        id
        transactions {
          id
          inputAssetIds
          inputContracts
          inputs {
            __typename
            ... on InputCoin {
              amount
              assetId
              owner
              predicate
              utxoId
            }
            ... on InputContract {
              contractId
              utxoId
            }
            ... on InputMessage {
              amount
              data
              nonce
              predicate
              recipient
              sender
            }
          }
          isCreate
          isMint
          isScript
          isUpgrade
          isUpload
          maturity
          mintAmount
          mintAssetId
          mintGasPrice
          outputs {
            __typename
            ... on ChangeOutput {
              amount
              assetId
              to
            }
            ... on CoinOutput {
              amount
              assetId
              to
            }
            ... on ContractCreated {
              contract
              stateRoot
            }
            ... on ContractOutput {
              balanceRoot
              inputIndex
            }
            ... on VariableOutput {
              amount
              assetId
              to
            }
          }
          policies {
            maturity
            maxFee
            tip
            witnessLimit
          }
          rawPayload
          scriptData
          scriptGasLimit
          status {
            __typename
            ... on FailureStatus {
              programState {
                data
                returnType
              }
              reason
              receipts {
                amount
                assetId
                contractId
                data
                digest
                gas
                gasUsed
                id
                is
                len
                nonce
                param1
                param2
                pc
                ptr
                ra
                rb
                rc
                rd
                reason
                receiptType
                recipient
                result
                sender
                subId
                to
                toAddress
                val
              }
              time
              totalFee
              totalGas
              transactionId
            }
            ... on SqueezedOutStatus {
              reason
            }
            ... on SubmittedStatus {
              time
            }
            ... on SuccessStatus {
              programState {
                data
                returnType
              }
              receipts {
                amount
                assetId
                contractId
                data
                digest
                gas
                gasUsed
                id
                is
                len
                nonce
                param1
                param2
                pc
                ptr
                ra
                rb
                rc
                rd
                reason
                receiptType
                recipient
                result
                sender
                subId
                to
                toAddress
                val
              }
              time
              totalFee
              totalGas
              transactionId
            }
          }
        }
      }
    }
  }
`;
