export const bridgeAbi = {
  programType: 'contract',
  specVersion: '1',
  encodingVersion: '1',
  concreteTypes: [
    {
      type: '()',
      concreteTypeId:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
    },
    {
      type: 'b256',
      concreteTypeId:
        '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
    },
    {
      type: 'enum errors::BridgeFungibleTokenError',
      concreteTypeId:
        '0b110bf0bfe47de46ec4252cf33a4c4225e4f8185d7382091b5a7cae96b05136',
      metadataTypeId: 0,
    },
    {
      type: 'enum standards::src7::Metadata',
      concreteTypeId:
        'f44b531974c6c04e17e66ab54e9868d230b9a24b3710b184399c363f0190180d',
      metadataTypeId: 1,
    },
    {
      type: 'enum std::option::Option<enum standards::src7::Metadata>',
      concreteTypeId:
        'fe93748eeb5d91a422fcea06e1b374216ad4ac0b2db01be0a6316af7f90dfa4f',
      metadataTypeId: 3,
      typeArguments: [
        'f44b531974c6c04e17e66ab54e9868d230b9a24b3710b184399c363f0190180d',
      ],
    },
    {
      type: 'enum std::option::Option<struct std::string::String>',
      concreteTypeId:
        '7c06d929390a9aeeb8ffccf8173ac0d101a9976d99dda01cce74541a81e75ac0',
      metadataTypeId: 3,
      typeArguments: [
        '9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c',
      ],
    },
    {
      type: 'enum std::option::Option<u64>',
      concreteTypeId:
        'd852149004cc9ec0bbe7dc4e37bffea1d41469b759512b6136f2e865a4c06e7d',
      metadataTypeId: 3,
      typeArguments: [
        '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
      ],
    },
    {
      type: 'enum std::option::Option<u8>',
      concreteTypeId:
        '2da102c46c7263beeed95818cd7bee801716ba8303dddafdcd0f6c9efda4a0f1',
      metadataTypeId: 3,
      typeArguments: [
        'c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b',
      ],
    },
    {
      type: 'enum sway_libs::reentrancy::errors::ReentrancyError',
      concreteTypeId:
        '4d216c57b3357523323f59401c7355785b41bdf832f6e1106272186b94797038',
      metadataTypeId: 4,
    },
    {
      type: 'struct events::ClaimRefundEvent',
      concreteTypeId:
        '43a196568054cc5857b7b8949732aea78a79c356fbbf23605d9057655fbaabc8',
      metadataTypeId: 7,
    },
    {
      type: 'struct events::DepositEvent',
      concreteTypeId:
        'aeb9b947da259c606e2c25be1150e2150f609fe5f2ec593c9a7ebb771e4e7065',
      metadataTypeId: 8,
    },
    {
      type: 'struct events::RefundRegisteredEvent',
      concreteTypeId:
        '53314ca6f7d49036353511ef4d38a91d77a13dceeb09509b89c707fcbb3b4a71',
      metadataTypeId: 9,
    },
    {
      type: 'struct events::WithdrawalEvent',
      concreteTypeId:
        '4b2a1039798597241d783edcc2292afb341e5f5beb9858521a9740426db8138a',
      metadataTypeId: 10,
    },
    {
      type: 'struct standards::src20::SetDecimalsEvent',
      concreteTypeId:
        'fbe071a6e7ca2b2b5e503e82638f9f11c861a6fb452b65473eca8260db87392d',
      metadataTypeId: 11,
    },
    {
      type: 'struct standards::src20::SetNameEvent',
      concreteTypeId:
        '6ce295b0fb4c1c15e8ed1cfa4babda47d8a04940a5266a3229e12243a2e37c2c',
      metadataTypeId: 12,
    },
    {
      type: 'struct standards::src20::SetSymbolEvent',
      concreteTypeId:
        'a8a4b78066c51a50da6349bd395fe1c67e774d75c1db2c5c22288a432d7a363d',
      metadataTypeId: 13,
    },
    {
      type: 'struct standards::src20::TotalSupplyEvent',
      concreteTypeId:
        'f255d5cc2114d1b6bc34bef4c28d4b60caccffd9a672ed16b79ea217e1c4a8a3',
      metadataTypeId: 14,
    },
    {
      type: 'struct standards::src7::SetMetadataEvent',
      concreteTypeId:
        'f1b1cc90b68559aa4bb5cc58201ebb5c5402ed3aa28927140761e8ff7dcd3ab8',
      metadataTypeId: 15,
    },
    {
      type: 'struct std::asset_id::AssetId',
      concreteTypeId:
        'c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974',
      metadataTypeId: 17,
    },
    {
      type: 'struct std::string::String',
      concreteTypeId:
        '9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c',
      metadataTypeId: 21,
    },
    {
      type: 'u64',
      concreteTypeId:
        '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
    },
    {
      type: 'u8',
      concreteTypeId:
        'c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b',
    },
  ],
  metadataTypes: [
    {
      type: 'enum errors::BridgeFungibleTokenError',
      metadataTypeId: 0,
      components: [
        {
          name: 'UnauthorizedSender',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          name: 'NoCoinsSent',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          name: 'NoRefundAvailable',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          name: 'AssetNotFound',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          name: 'WithdrawalToZeroAddress',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
      ],
    },
    {
      type: 'enum standards::src7::Metadata',
      metadataTypeId: 1,
      components: [
        {
          name: 'B256',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
        {
          name: 'Bytes',
          typeId: 18,
        },
        {
          name: 'Int',
          typeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
        {
          name: 'String',
          typeId: 21,
        },
      ],
    },
    {
      type: 'enum std::identity::Identity',
      metadataTypeId: 2,
      components: [
        {
          name: 'Address',
          typeId: 16,
        },
        {
          name: 'ContractId',
          typeId: 20,
        },
      ],
    },
    {
      type: 'enum std::option::Option',
      metadataTypeId: 3,
      components: [
        {
          name: 'None',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          name: 'Some',
          typeId: 5,
        },
      ],
      typeParameters: [5],
    },
    {
      type: 'enum sway_libs::reentrancy::errors::ReentrancyError',
      metadataTypeId: 4,
      components: [
        {
          name: 'NonReentrant',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
      ],
    },
    {
      type: 'generic T',
      metadataTypeId: 5,
    },
    {
      type: 'raw untyped ptr',
      metadataTypeId: 6,
    },
    {
      type: 'struct events::ClaimRefundEvent',
      metadataTypeId: 7,
      components: [
        {
          name: 'amount',
          typeId: 22,
        },
        {
          name: 'from',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
        {
          name: 'token_address',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
        {
          name: 'token_id',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
      ],
    },
    {
      type: 'struct events::DepositEvent',
      metadataTypeId: 8,
      components: [
        {
          name: 'amount',
          typeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
        {
          name: 'from',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
        {
          name: 'to',
          typeId: 2,
        },
      ],
    },
    {
      type: 'struct events::RefundRegisteredEvent',
      metadataTypeId: 9,
      components: [
        {
          name: 'amount',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
        {
          name: 'token_address',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
        {
          name: 'token_id',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
        {
          name: 'from',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
      ],
    },
    {
      type: 'struct events::WithdrawalEvent',
      metadataTypeId: 10,
      components: [
        {
          name: 'amount',
          typeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
        {
          name: 'from',
          typeId: 2,
        },
        {
          name: 'to',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
      ],
    },
    {
      type: 'struct standards::src20::SetDecimalsEvent',
      metadataTypeId: 11,
      components: [
        {
          name: 'asset',
          typeId: 17,
        },
        {
          name: 'decimals',
          typeId:
            'c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b',
        },
        {
          name: 'sender',
          typeId: 2,
        },
      ],
    },
    {
      type: 'struct standards::src20::SetNameEvent',
      metadataTypeId: 12,
      components: [
        {
          name: 'asset',
          typeId: 17,
        },
        {
          name: 'name',
          typeId: 3,
          typeArguments: [
            {
              name: '',
              typeId: 21,
            },
          ],
        },
        {
          name: 'sender',
          typeId: 2,
        },
      ],
    },
    {
      type: 'struct standards::src20::SetSymbolEvent',
      metadataTypeId: 13,
      components: [
        {
          name: 'asset',
          typeId: 17,
        },
        {
          name: 'symbol',
          typeId: 3,
          typeArguments: [
            {
              name: '',
              typeId: 21,
            },
          ],
        },
        {
          name: 'sender',
          typeId: 2,
        },
      ],
    },
    {
      type: 'struct standards::src20::TotalSupplyEvent',
      metadataTypeId: 14,
      components: [
        {
          name: 'asset',
          typeId: 17,
        },
        {
          name: 'supply',
          typeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
        {
          name: 'sender',
          typeId: 2,
        },
      ],
    },
    {
      type: 'struct standards::src7::SetMetadataEvent',
      metadataTypeId: 15,
      components: [
        {
          name: 'asset',
          typeId: 17,
        },
        {
          name: 'metadata',
          typeId: 3,
          typeArguments: [
            {
              name: '',
              typeId: 1,
            },
          ],
        },
        {
          name: 'key',
          typeId: 21,
        },
        {
          name: 'sender',
          typeId: 2,
        },
      ],
    },
    {
      type: 'struct std::address::Address',
      metadataTypeId: 16,
      components: [
        {
          name: 'bits',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
      ],
    },
    {
      type: 'struct std::asset_id::AssetId',
      metadataTypeId: 17,
      components: [
        {
          name: 'bits',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
      ],
    },
    {
      type: 'struct std::bytes::Bytes',
      metadataTypeId: 18,
      components: [
        {
          name: 'buf',
          typeId: 19,
        },
        {
          name: 'len',
          typeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
      ],
    },
    {
      type: 'struct std::bytes::RawBytes',
      metadataTypeId: 19,
      components: [
        {
          name: 'ptr',
          typeId: 6,
        },
        {
          name: 'cap',
          typeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
      ],
    },
    {
      type: 'struct std::contract_id::ContractId',
      metadataTypeId: 20,
      components: [
        {
          name: 'bits',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
      ],
    },
    {
      type: 'struct std::string::String',
      metadataTypeId: 21,
      components: [
        {
          name: 'bytes',
          typeId: 18,
        },
      ],
    },
    {
      type: 'u256',
      metadataTypeId: 22,
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'msg_idx',
          concreteTypeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
      ],
      name: 'process_message',
      output:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
      attributes: [
        {
          name: 'payable',
          arguments: [],
        },
        {
          name: 'storage',
          arguments: ['read', 'write'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'asset_id',
          concreteTypeId:
            'c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974',
        },
      ],
      name: 'asset_to_l1_address',
      output:
        '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
      attributes: [
        {
          name: 'storage',
          arguments: ['read'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'asset_id',
          concreteTypeId:
            'c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974',
        },
      ],
      name: 'asset_to_sub_id',
      output:
        '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
      attributes: [
        {
          name: 'storage',
          arguments: ['read'],
        },
      ],
    },
    {
      inputs: [],
      name: 'bridged_token_gateway',
      output:
        '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
      attributes: null,
    },
    {
      inputs: [
        {
          name: 'from',
          concreteTypeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
        {
          name: 'token_address',
          concreteTypeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
        {
          name: 'token_id',
          concreteTypeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
      ],
      name: 'claim_refund',
      output:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
      attributes: [
        {
          name: 'storage',
          arguments: ['read', 'write'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'to',
          concreteTypeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
      ],
      name: 'withdraw',
      output:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
      attributes: [
        {
          name: 'payable',
          arguments: [],
        },
        {
          name: 'storage',
          arguments: ['read', 'write'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'asset',
          concreteTypeId:
            'c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974',
        },
      ],
      name: 'decimals',
      output:
        '2da102c46c7263beeed95818cd7bee801716ba8303dddafdcd0f6c9efda4a0f1',
      attributes: [
        {
          name: 'storage',
          arguments: ['read'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'asset',
          concreteTypeId:
            'c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974',
        },
      ],
      name: 'name',
      output:
        '7c06d929390a9aeeb8ffccf8173ac0d101a9976d99dda01cce74541a81e75ac0',
      attributes: [
        {
          name: 'storage',
          arguments: ['read'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'asset',
          concreteTypeId:
            'c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974',
        },
      ],
      name: 'symbol',
      output:
        '7c06d929390a9aeeb8ffccf8173ac0d101a9976d99dda01cce74541a81e75ac0',
      attributes: [
        {
          name: 'storage',
          arguments: ['read'],
        },
      ],
    },
    {
      inputs: [],
      name: 'total_assets',
      output:
        '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
      attributes: [
        {
          name: 'storage',
          arguments: ['read'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'asset',
          concreteTypeId:
            'c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974',
        },
      ],
      name: 'total_supply',
      output:
        'd852149004cc9ec0bbe7dc4e37bffea1d41469b759512b6136f2e865a4c06e7d',
      attributes: [
        {
          name: 'storage',
          arguments: ['read'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'asset',
          concreteTypeId:
            'c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974',
        },
        {
          name: 'key',
          concreteTypeId:
            '9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c',
        },
      ],
      name: 'metadata',
      output:
        'fe93748eeb5d91a422fcea06e1b374216ad4ac0b2db01be0a6316af7f90dfa4f',
      attributes: [
        {
          name: 'storage',
          arguments: ['read'],
        },
      ],
    },
  ],
  loggedTypes: [
    {
      logId: '5557842539076482339',
      concreteTypeId:
        '4d216c57b3357523323f59401c7355785b41bdf832f6e1106272186b94797038',
    },
    {
      logId: '797431737660767716',
      concreteTypeId:
        '0b110bf0bfe47de46ec4252cf33a4c4225e4f8185d7382091b5a7cae96b05136',
    },
    {
      logId: '5994656859013025846',
      concreteTypeId:
        '53314ca6f7d49036353511ef4d38a91d77a13dceeb09509b89c707fcbb3b4a71',
    },
    {
      logId: '17415926155927968170',
      concreteTypeId:
        'f1b1cc90b68559aa4bb5cc58201ebb5c5402ed3aa28927140761e8ff7dcd3ab8',
    },
    {
      logId: '18149631459970394923',
      concreteTypeId:
        'fbe071a6e7ca2b2b5e503e82638f9f11c861a6fb452b65473eca8260db87392d',
    },
    {
      logId: '17462098202904023478',
      concreteTypeId:
        'f255d5cc2114d1b6bc34bef4c28d4b60caccffd9a672ed16b79ea217e1c4a8a3',
    },
    {
      logId: '12590297951544646752',
      concreteTypeId:
        'aeb9b947da259c606e2c25be1150e2150f609fe5f2ec593c9a7ebb771e4e7065',
    },
    {
      logId: '7845998088195677205',
      concreteTypeId:
        '6ce295b0fb4c1c15e8ed1cfa4babda47d8a04940a5266a3229e12243a2e37c2c',
    },
    {
      logId: '12152039456660331088',
      concreteTypeId:
        'a8a4b78066c51a50da6349bd395fe1c67e774d75c1db2c5c22288a432d7a363d',
    },
    {
      logId: '4873341570055982168',
      concreteTypeId:
        '43a196568054cc5857b7b8949732aea78a79c356fbbf23605d9057655fbaabc8',
    },
    {
      logId: '5416159340904421156',
      concreteTypeId:
        '4b2a1039798597241d783edcc2292afb341e5f5beb9858521a9740426db8138a',
    },
  ],
  messagesTypes: [],
  configurables: [
    {
      name: 'BRIDGED_TOKEN_GATEWAY',
      concreteTypeId:
        '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
      offset: 57016,
    },
  ],
};
