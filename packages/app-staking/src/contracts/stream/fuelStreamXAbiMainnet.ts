export const fuelStreamXAbiMainnet = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AccessControlBadConfirmation',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'neededRole',
        type: 'bytes32',
      },
    ],
    name: 'AccessControlUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'AddressEmptyCode',
    type: 'error',
  },
  {
    inputs: [],
    name: 'BridgeCommitmentNotFound',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CommitmentNotFinalized',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'ERC1967InvalidImplementation',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ERC1967NonPayable',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EnforcedPause',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ExpectedPause',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FailedInnerCall',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'char',
        type: 'uint8',
      },
    ],
    name: 'InvalidCharacter',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidCommitmentProof',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidExecTxResultCode',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidInitialization',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 's',
        type: 'string',
      },
    ],
    name: 'InvalidIntString',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidProofNonce',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidStringLength',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidTxResultProof',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 's',
        type: 'string',
      },
    ],
    name: 'InvalidUintString',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LatestHeaderNotFound',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Missing0xPrefix',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NonceAlreadyUsed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotInitializing',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TargetBlockNotInRange',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TrustedHeaderNotFound',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UUPSUnauthorizedCallContext',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'slot',
        type: 'bytes32',
      },
    ],
    name: 'UUPSUnsupportedProxiableUUID',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'proofNonce',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'uint64',
        name: 'startBlock',
        type: 'uint64',
      },
      {
        indexed: true,
        internalType: 'uint64',
        name: 'endBlock',
        type: 'uint64',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'bridgeCommitment',
        type: 'bytes32',
      },
    ],
    name: 'BridgeCommitmentStored',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint64',
        name: 'blockNumber',
        type: 'uint64',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'headerHash',
        type: 'bytes32',
      },
    ],
    name: 'HeadUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newHeaderRangeFunctionId',
        type: 'bytes32',
      },
    ],
    name: 'HeaderRangeFunctionIdUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint64',
        name: 'trustedBlock',
        type: 'uint64',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'trustedHeader',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint64',
        name: 'targetBlock',
        type: 'uint64',
      },
    ],
    name: 'HeaderRangeRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint64',
        name: 'version',
        type: 'uint64',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint64',
        name: 'trustedBlock',
        type: 'uint64',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'trustedHeader',
        type: 'bytes32',
      },
    ],
    name: 'NextHeaderRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32',
      },
    ],
    name: 'RoleAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleGranted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'RoleRevoked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'int256',
        name: 'delta',
        type: 'int256',
      },
    ],
    name: 'SupplyDelta',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'Upgraded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'WithdrawalProcessed',
    type: 'event',
  },
  {
    inputs: [],
    name: 'BRIDGE_COMMITMENT_MAX',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'GUARDIAN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'L2_ACCOUNT_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'L2_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PAUSER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    name: 'blockHeightToHeaderHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'commitmentTimestamp',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gateway',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'l2Account',
        type: 'address',
      },
    ],
    name: 'grantL2AccountRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'headerRangeFunctionId',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'vault',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'gateway',
            type: 'address',
          },
          {
            internalType: 'uint64',
            name: 'height',
            type: 'uint64',
          },
          {
            internalType: 'bytes32',
            name: 'header',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'nextHeaderFunctionId',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'headerRangeFunctionId',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'tokenCosmosDenomination',
            type: 'string',
          },
        ],
        internalType: 'struct FuelStreamX.InitParameters',
        name: '_params',
        type: 'tuple',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'header',
        type: 'bytes32',
      },
    ],
    name: 'initializeTrustedHeader',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestBlock',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextHeaderFunctionId',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_proofNonce',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'height',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'resultsHash',
            type: 'bytes32',
          },
        ],
        internalType: 'struct BridgeCommitmentLeaf',
        name: 'bridgeCommitmentLeaf',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'bytes32[]',
            name: 'sideNodes',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'key',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'numLeaves',
            type: 'uint256',
          },
        ],
        internalType: 'struct BinaryMerkleProof',
        name: 'bridgeCommitmentLeafProof',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'txResultMarshalled',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'bytes32[]',
            name: 'sideNodes',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'key',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'numLeaves',
            type: 'uint256',
          },
        ],
        internalType: 'struct BinaryMerkleProof',
        name: 'txResultProof',
        type: 'tuple',
      },
    ],
    name: 'processSequencerSupplyUpdate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_proofNonce',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'height',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'resultsHash',
            type: 'bytes32',
          },
        ],
        internalType: 'struct BridgeCommitmentLeaf',
        name: 'bridgeCommitmentLeaf',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'bytes32[]',
            name: 'sideNodes',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'key',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'numLeaves',
            type: 'uint256',
          },
        ],
        internalType: 'struct BinaryMerkleProof',
        name: 'bridgeCommitmentLeafProof',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'txResultMarshalled',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'bytes32[]',
            name: 'sideNodes',
            type: 'bytes32[]',
          },
          {
            internalType: 'uint256',
            name: 'key',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'numLeaves',
            type: 'uint256',
          },
        ],
        internalType: 'struct BinaryMerkleProof',
        name: 'txResultProof',
        type: 'tuple',
      },
    ],
    name: 'processSequencerWithdrawalMessage',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'proxiableUUID',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'recoveryRegistry',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'callerConfirmation',
        type: 'address',
      },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'denomination',
        type: 'string',
      },
    ],
    name: 'setCosmosTokenDenomination',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newRecoveryRegistry',
        type: 'address',
      },
    ],
    name: 'setRecoveryRegistry',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'roleAdmin',
        type: 'bytes32',
      },
    ],
    name: 'setRoleAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'newTimeToFinalize',
        type: 'uint32',
      },
    ],
    name: 'setTimeToFinalize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'state_bridgeCommitments',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'state_proofNonce',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'timeToFinalize',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokenCosmosDenominationHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: '_targetBlock',
        type: 'uint64',
      },
      {
        internalType: 'bytes32',
        name: '_targetHeader',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: '_bridgeCommitment',
        type: 'bytes32',
      },
    ],
    name: 'updateCommitHeaderRange',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '_height',
        type: 'uint32',
      },
      {
        internalType: 'bytes32',
        name: '_header',
        type: 'bytes32',
      },
    ],
    name: 'updateGenesisState',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_headerRangeFunctionId',
        type: 'bytes32',
      },
    ],
    name: 'updateHeaderRangeFunctionId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'usedNonces',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'vault',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
