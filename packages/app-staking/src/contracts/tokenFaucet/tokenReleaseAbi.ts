export const tokenReleaseAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256',
      },
    ],
    name: 'Claim',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint48',
            name: 'start',
            type: 'uint48',
          },
          {
            internalType: 'uint48',
            name: 'cliff',
            type: 'uint48',
          },
          {
            internalType: 'uint48',
            name: 'end',
            type: 'uint48',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimed',
            type: 'uint256',
          },
        ],
        indexed: true,
        internalType: 'struct TokenRelease.Release',
        name: 'release',
        type: 'tuple',
      },
    ],
    name: 'Create',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint48',
            name: 'start',
            type: 'uint48',
          },
          {
            internalType: 'uint48',
            name: 'cliff',
            type: 'uint48',
          },
          {
            internalType: 'uint48',
            name: 'end',
            type: 'uint48',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimed',
            type: 'uint256',
          },
        ],
        indexed: true,
        internalType: 'struct TokenRelease.Release',
        name: 'release',
        type: 'tuple',
      },
    ],
    name: 'Modify',
    type: 'event',
  },
  {
    inputs: [],
    name: 'TOKEN_ADDRESS',
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
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
    ],
    name: 'accrued',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newBeneficiary',
        type: 'address',
      },
    ],
    name: 'changeBeneficiary',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'beneficiaries',
        type: 'address[]',
      },
      {
        components: [
          {
            internalType: 'uint48',
            name: 'start',
            type: 'uint48',
          },
          {
            internalType: 'uint48',
            name: 'cliff',
            type: 'uint48',
          },
          {
            internalType: 'uint48',
            name: 'end',
            type: 'uint48',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimed',
            type: 'uint256',
          },
        ],
        internalType: 'struct TokenRelease.Release[]',
        name: 'releases',
        type: 'tuple[]',
      },
    ],
    name: 'createReleases',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'uint48',
            name: 'start',
            type: 'uint48',
          },
          {
            internalType: 'uint48',
            name: 'cliff',
            type: 'uint48',
          },
          {
            internalType: 'uint48',
            name: 'end',
            type: 'uint48',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimed',
            type: 'uint256',
          },
        ],
        internalType: 'struct TokenRelease.Release',
        name: 'release',
        type: 'tuple',
      },
    ],
    name: 'modifyRelease',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 's_owner',
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
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 's_releases',
    outputs: [
      {
        internalType: 'uint48',
        name: 'start',
        type: 'uint48',
      },
      {
        internalType: 'uint48',
        name: 'cliff',
        type: 'uint48',
      },
      {
        internalType: 'uint48',
        name: 'end',
        type: 'uint48',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'claimed',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'beneficiary',
        type: 'address',
      },
    ],
    name: 'unpaid',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amt',
        type: 'uint256',
      },
    ],
    name: 'withdrawTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
