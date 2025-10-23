import { Contract, Provider } from 'fuels';
import { DatabaseConnection } from './infra/database/DatabaseConnection';

const _connection = DatabaseConnection.getInstance();

(async () => {
  await execute();
})();

async function execute() {
  const contractId =
    '0x3f3f87bb15c693784e90521c64bac855ce23d971356a6ccd57aa92e02e696432';
  const assetId =
    '0xa134d7fa9bbba3474af4c602a53929767acd23bd36d5e870b40cb6f8aa0f7922';
  const provider = new Provider('https://mainnet.fuel.network/v1/graphql');
  const contract = new Contract(contractId, abi, provider);
  const asset: any = {};
  const outputName = await contract.functions.name({ bits: assetId }).dryRun();
  asset.name = outputName.value;
  const outputSymbol = await contract.functions
    .symbol({ bits: assetId })
    .dryRun();
  asset.symbol = outputSymbol.value;
  const outputDecimals = await contract.functions
    .decimals({ bits: assetId })
    .dryRun();
  asset.decimals = outputDecimals.value;
  const { value } = await contract.functions
    .metadata(
      {
        bits: assetId,
      },
      'uri',
    )
    .get();
  console.log(asset);
  console.log(value?.String);
}

const abi = {
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
      type: 'bool',
      concreteTypeId:
        'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
    },
    {
      type: 'enum errors::MintError',
      concreteTypeId:
        'ee89c439b5472cab716006d7c677d16e15301e6c82cfce12cebfa57919f537de',
      metadataTypeId: 0,
    },
    {
      type: 'enum errors::SetError',
      concreteTypeId:
        'bf6597cf3d56a5e47a920520e275ccd481a27e7c988ea6af6f253170d5374c5a',
      metadataTypeId: 1,
    },
    {
      type: 'enum standards::src5::AccessError',
      concreteTypeId:
        '3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d',
      metadataTypeId: 2,
    },
    {
      type: 'enum standards::src5::State',
      concreteTypeId:
        '192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c',
      metadataTypeId: 3,
    },
    {
      type: 'enum standards::src7::Metadata',
      concreteTypeId:
        'f44b531974c6c04e17e66ab54e9868d230b9a24b3710b184399c363f0190180d',
      metadataTypeId: 4,
    },
    {
      type: 'enum std::identity::Identity',
      concreteTypeId:
        'ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335',
      metadataTypeId: 5,
    },
    {
      type: 'enum std::option::Option<b256>',
      concreteTypeId:
        '0c2beb9013490c4f753f2757dfe2d8340b22ce3827d596d81d249b7038033cb6',
      metadataTypeId: 6,
      typeArguments: [
        '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
      ],
    },
    {
      type: 'enum std::option::Option<enum standards::src7::Metadata>',
      concreteTypeId:
        'fe93748eeb5d91a422fcea06e1b374216ad4ac0b2db01be0a6316af7f90dfa4f',
      metadataTypeId: 6,
      typeArguments: [
        'f44b531974c6c04e17e66ab54e9868d230b9a24b3710b184399c363f0190180d',
      ],
    },
    {
      type: 'enum std::option::Option<struct std::string::String>',
      concreteTypeId:
        '7c06d929390a9aeeb8ffccf8173ac0d101a9976d99dda01cce74541a81e75ac0',
      metadataTypeId: 6,
      typeArguments: [
        '9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c',
      ],
    },
    {
      type: 'enum std::option::Option<u64>',
      concreteTypeId:
        'd852149004cc9ec0bbe7dc4e37bffea1d41469b759512b6136f2e865a4c06e7d',
      metadataTypeId: 6,
      typeArguments: [
        '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
      ],
    },
    {
      type: 'enum std::option::Option<u8>',
      concreteTypeId:
        '2da102c46c7263beeed95818cd7bee801716ba8303dddafdcd0f6c9efda4a0f1',
      metadataTypeId: 6,
      typeArguments: [
        'c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b',
      ],
    },
    {
      type: 'enum sway_libs::asset::errors::BurnError',
      concreteTypeId:
        '3acdc2adac8e0589c5864525e0edc9dc61a9571a4d09c3c57b58ea76d33f4b46',
      metadataTypeId: 7,
    },
    {
      type: 'enum sway_libs::asset::errors::MintError',
      concreteTypeId:
        'dff9dfec998a49b40f1c4b09567400f0e712aaf939c08f7d07bc5c63116e1084',
      metadataTypeId: 8,
    },
    {
      type: 'enum sway_libs::asset::errors::SetMetadataError',
      concreteTypeId:
        'c6c09c148c1a1341c7ab81697b3545cc695fa67668a169cddc59790a9a0b6b44',
      metadataTypeId: 9,
    },
    {
      type: 'enum sway_libs::ownership::errors::InitializationError',
      concreteTypeId:
        '1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893',
      metadataTypeId: 10,
    },
    {
      type: 'enum sway_libs::pausable::errors::PauseError',
      concreteTypeId:
        '8b3afcadf894415a10b09fc3717487e33802c8ffbb030edafe84ca4a71b280bc',
      metadataTypeId: 11,
    },
    {
      type: 'struct standards::src20::SetNameEvent',
      concreteTypeId:
        '6ce295b0fb4c1c15e8ed1cfa4babda47d8a04940a5266a3229e12243a2e37c2c',
      metadataTypeId: 14,
    },
    {
      type: 'struct standards::src20::SetSymbolEvent',
      concreteTypeId:
        'a8a4b78066c51a50da6349bd395fe1c67e774d75c1db2c5c22288a432d7a363d',
      metadataTypeId: 15,
    },
    {
      type: 'struct standards::src20::TotalSupplyEvent',
      concreteTypeId:
        'f255d5cc2114d1b6bc34bef4c28d4b60caccffd9a672ed16b79ea217e1c4a8a3',
      metadataTypeId: 16,
    },
    {
      type: 'struct standards::src7::SetMetadataEvent',
      concreteTypeId:
        'f1b1cc90b68559aa4bb5cc58201ebb5c5402ed3aa28927140761e8ff7dcd3ab8',
      metadataTypeId: 17,
    },
    {
      type: 'struct std::asset_id::AssetId',
      concreteTypeId:
        'c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974',
      metadataTypeId: 19,
    },
    {
      type: 'struct std::string::String',
      concreteTypeId:
        '9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c',
      metadataTypeId: 23,
    },
    {
      type: 'struct sway_libs::ownership::events::OwnershipSet',
      concreteTypeId:
        'e1ef35033ea9d2956f17c3292dea4a46ce7d61fdf37bbebe03b7b965073f43b5',
      metadataTypeId: 24,
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
      type: 'enum errors::MintError',
      metadataTypeId: 0,
      components: [
        {
          name: 'CannotMintMoreThanOneNFTWithSubId',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          name: 'MaxNFTsMinted',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          name: 'NFTAlreadyMinted',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          name: 'SubIdCannotBeNone',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
      ],
    },
    {
      type: 'enum errors::SetError',
      metadataTypeId: 1,
      components: [
        {
          name: 'ValueAlreadySet',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
      ],
    },
    {
      type: 'enum standards::src5::AccessError',
      metadataTypeId: 2,
      components: [
        {
          name: 'NotOwner',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
      ],
    },
    {
      type: 'enum standards::src5::State',
      metadataTypeId: 3,
      components: [
        {
          name: 'Uninitialized',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          name: 'Initialized',
          typeId: 5,
        },
        {
          name: 'Revoked',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
      ],
    },
    {
      type: 'enum standards::src7::Metadata',
      metadataTypeId: 4,
      components: [
        {
          name: 'B256',
          typeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
        {
          name: 'Bytes',
          typeId: 20,
        },
        {
          name: 'Int',
          typeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
        {
          name: 'String',
          typeId: 23,
        },
      ],
    },
    {
      type: 'enum std::identity::Identity',
      metadataTypeId: 5,
      components: [
        {
          name: 'Address',
          typeId: 18,
        },
        {
          name: 'ContractId',
          typeId: 22,
        },
      ],
    },
    {
      type: 'enum std::option::Option',
      metadataTypeId: 6,
      components: [
        {
          name: 'None',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          name: 'Some',
          typeId: 12,
        },
      ],
      typeParameters: [12],
    },
    {
      type: 'enum sway_libs::asset::errors::BurnError',
      metadataTypeId: 7,
      components: [
        {
          name: 'NotEnoughCoins',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          name: 'ZeroAmount',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
      ],
    },
    {
      type: 'enum sway_libs::asset::errors::MintError',
      metadataTypeId: 8,
      components: [
        {
          name: 'ZeroAmount',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
      ],
    },
    {
      type: 'enum sway_libs::asset::errors::SetMetadataError',
      metadataTypeId: 9,
      components: [
        {
          name: 'EmptyString',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          name: 'EmptyBytes',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
      ],
    },
    {
      type: 'enum sway_libs::ownership::errors::InitializationError',
      metadataTypeId: 10,
      components: [
        {
          name: 'CannotReinitialized',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
      ],
    },
    {
      type: 'enum sway_libs::pausable::errors::PauseError',
      metadataTypeId: 11,
      components: [
        {
          name: 'Paused',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
        {
          name: 'NotPaused',
          typeId:
            '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
        },
      ],
    },
    {
      type: 'generic T',
      metadataTypeId: 12,
    },
    {
      type: 'raw untyped ptr',
      metadataTypeId: 13,
    },
    {
      type: 'struct standards::src20::SetNameEvent',
      metadataTypeId: 14,
      components: [
        {
          name: 'asset',
          typeId: 19,
        },
        {
          name: 'name',
          typeId: 6,
          typeArguments: [
            {
              name: '',
              typeId: 23,
            },
          ],
        },
        {
          name: 'sender',
          typeId: 5,
        },
      ],
    },
    {
      type: 'struct standards::src20::SetSymbolEvent',
      metadataTypeId: 15,
      components: [
        {
          name: 'asset',
          typeId: 19,
        },
        {
          name: 'symbol',
          typeId: 6,
          typeArguments: [
            {
              name: '',
              typeId: 23,
            },
          ],
        },
        {
          name: 'sender',
          typeId: 5,
        },
      ],
    },
    {
      type: 'struct standards::src20::TotalSupplyEvent',
      metadataTypeId: 16,
      components: [
        {
          name: 'asset',
          typeId: 19,
        },
        {
          name: 'supply',
          typeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
        {
          name: 'sender',
          typeId: 5,
        },
      ],
    },
    {
      type: 'struct standards::src7::SetMetadataEvent',
      metadataTypeId: 17,
      components: [
        {
          name: 'asset',
          typeId: 19,
        },
        {
          name: 'metadata',
          typeId: 6,
          typeArguments: [
            {
              name: '',
              typeId: 4,
            },
          ],
        },
        {
          name: 'key',
          typeId: 23,
        },
        {
          name: 'sender',
          typeId: 5,
        },
      ],
    },
    {
      type: 'struct std::address::Address',
      metadataTypeId: 18,
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
      metadataTypeId: 19,
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
      metadataTypeId: 20,
      components: [
        {
          name: 'buf',
          typeId: 21,
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
      metadataTypeId: 21,
      components: [
        {
          name: 'ptr',
          typeId: 13,
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
      metadataTypeId: 22,
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
      metadataTypeId: 23,
      components: [
        {
          name: 'bytes',
          typeId: 20,
        },
      ],
    },
    {
      type: 'struct sway_libs::ownership::events::OwnershipSet',
      metadataTypeId: 24,
      components: [
        {
          name: 'new_owner',
          typeId: 5,
        },
      ],
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: '_asset',
          concreteTypeId:
            'c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974',
        },
      ],
      name: 'decimals',
      output:
        '2da102c46c7263beeed95818cd7bee801716ba8303dddafdcd0f6c9efda4a0f1',
      attributes: [
        {
          name: 'doc-comment',
          arguments: [' Returns the number of decimals the asset uses.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Additional Information'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' The standardized decimals for NFTs is 0u8.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Arguments'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * `asset`: [AssetId] - The asset of which to query the decimals.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Returns'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * [Option<u8>] - The decimal precision used by `asset`.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use src20::SRC20;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(contract_id: ContractId, asset: AssedId) {'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let contract_abi = abi(SRC20, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: [
            '     let decimals = contract_abi.decimals(asset).unwrap();',
          ],
        },
        {
          name: 'doc-comment',
          arguments: ['     assert(decimals == 0u8);'],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
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
          name: 'doc-comment',
          arguments: [' Returns the name of the asset, such as “Ether”.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Arguments'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * `asset`: [AssetId] - The asset of which to query the name.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Returns'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * [Option<String>] - The name of `asset`.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Reads: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use src20::SRC20;'],
        },
        {
          name: 'doc-comment',
          arguments: [' use std::string::String;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(contract_ic: ContractId, asset: AssetId) {'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let contract_abi = abi(SRC20, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let name = contract_abi.name(asset).unwrap();'],
        },
        {
          name: 'doc-comment',
          arguments: ['     assert(name.len() != 0);'],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
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
          name: 'doc-comment',
          arguments: [' Returns the symbol of the asset, such as “ETH”.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Arguments'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * `asset`: [AssetId] - The asset of which to query the symbol.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Returns'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * [Option<String>] - The symbol of `asset`.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Reads: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use src20::SRC20;'],
        },
        {
          name: 'doc-comment',
          arguments: [' use std::string::String;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(contract_id: ContractId, asset: AssetId) {'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let contract_abi = abi(SRC20, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let symbol = contract_abi.symbol(asset).unwrap();'],
        },
        {
          name: 'doc-comment',
          arguments: ['     assert(symbol.len() != 0);'],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
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
          name: 'doc-comment',
          arguments: [
            ' Returns the total number of individual NFTs for this contract.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Returns'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * [u64] - The number of assets that this contract has minted.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Reads: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use src20::SRC20;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(contract_id: ContractId) {'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let contract_abi = abi(SRC20, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let total_assets = contract_abi.total_assets();'],
        },
        {
          name: 'doc-comment',
          arguments: ['     assert(total_assets != 0);'],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
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
          name: 'doc-comment',
          arguments: [' Returns the total supply of coins for an asset.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Additional Information'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' This must always be at most 1 for NFTs.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Arguments'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * `asset`: [AssetId] - The asset of which to query the total supply.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Returns'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * [Option<u64>] - The total supply of coins for `asset`.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Reads: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use src20::SRC20;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(contract_id: ContractId, asset: AssetId) {'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let contract_abi = abi(SRC20, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: [
            '     let total_supply = contract_abi.total_supply(asset).unwrap();',
          ],
        },
        {
          name: 'doc-comment',
          arguments: ['     assert(total_supply == 1);'],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
        {
          name: 'storage',
          arguments: ['read'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'sub_id',
          concreteTypeId:
            '7c5ee1cecf5f8eacd1284feb5f0bf2bdea533a51e2f0c9aabe9236d335989f3b',
        },
        {
          name: 'amount',
          concreteTypeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
      ],
      name: 'burn',
      output:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
      attributes: [
        {
          name: 'doc-comment',
          arguments: [' Burns assets sent with the given `sub_id`.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Additional Information'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' NOTE: The sha-256 hash of `(ContractId, SubId)` must match the `AssetId` where `ContractId` is the id of',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' the implementing contract and `SubId` is the given `sub_id` argument.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Arguments'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * `sub_id`: [SubId] - The sub-identifier of the asset to burn.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [' * `amount`: [u64] - The quantity of coins to burn.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Reverts'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * When the contract is paused.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Reads: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [' * Writes: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use src3::SRC3;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(contract_id: ContractId, asset_id: AssetId) {'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let contract_abi = abi(SR3, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     contract_abi.burn {'],
        },
        {
          name: 'doc-comment',
          arguments: ['         gas: 10000,'],
        },
        {
          name: 'doc-comment',
          arguments: ['         coins: 1,'],
        },
        {
          name: 'doc-comment',
          arguments: ['         asset_id: AssetId,'],
        },
        {
          name: 'doc-comment',
          arguments: ['     } (ZERO_B256, 1);'],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
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
          name: 'recipient',
          concreteTypeId:
            'ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335',
        },
        {
          name: 'sub_id',
          concreteTypeId:
            '0c2beb9013490c4f753f2757dfe2d8340b22ce3827d596d81d249b7038033cb6',
        },
        {
          name: 'amount',
          concreteTypeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
      ],
      name: 'mint',
      output:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
      attributes: [
        {
          name: 'doc-comment',
          arguments: [' Mints new assets using the `sub_id` sub-identifier.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Additional Information'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' This conforms to the SRC-20 NFT portion of the standard for a maximum',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [' mint amount of 1 coin per asset.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Arguments'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * `recipient`: [Identity] - The user to which the newly minted assets are transferred to.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * `sub_id`: [SubId] - The sub-identifier of the newly minted asset.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [' * `amount`: [u64] - The quantity of coins to mint.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Reverts'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * When the contract is paused.'],
        },
        {
          name: 'doc-comment',
          arguments: [' * When amount is greater than one.'],
        },
        {
          name: 'doc-comment',
          arguments: [' * When the asset has already been minted.'],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * When more than the MAX_SUPPLY NFTs have been minted.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Reads: `3`'],
        },
        {
          name: 'doc-comment',
          arguments: [' * Writes: `2`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use src3::SRC3;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(contract_id: ContractId) {'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let contract_abi = abi(SR3, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: [
            '     contract_abi.mint(Identity::ContractId(ContractId::this()), ZERO_B256, 1);',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
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
          name: 'doc-comment',
          arguments: [
            ' Returns metadata for the corresponding `asset` and `key`.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Arguments'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * `asset`: [AssetId] - The asset of which to query the metadata.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [' * `key`: [String] - The key to the specific metadata.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Returns'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * [Option<Metadata>] - `Some` metadata that corresponds to the `key` or `None`.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Reads: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use src_7::{SRC7, Metadata};'],
        },
        {
          name: 'doc-comment',
          arguments: [' use std::string::String;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(contract_id: ContractId, asset: AssetId) {'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let contract_abi = abi(SRC7, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let key = String::from_ascii_str("image");'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let data = contract_abi.metadata(asset, key);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     assert(data.is_some());'],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
        {
          name: 'storage',
          arguments: ['read'],
        },
      ],
    },
    {
      inputs: [],
      name: 'owner',
      output:
        '192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c',
      attributes: [
        {
          name: 'doc-comment',
          arguments: [' Returns the owner.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Return Values'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * [State] - Represents the state of ownership for this contract.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Reads: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use standards::src5::SRC5;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(contract_id: ContractId) {'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let ownership_abi = abi(contract_id, SRC_5);'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: ['     match ownership_abi.owner() {'],
        },
        {
          name: 'doc-comment',
          arguments: [
            '         State::Uninitalized => log("The ownership is uninitalized"),',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [
            '         State::Initialized(owner) => log("The ownership is initalized"),',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [
            '         State::Revoked => log("The ownership is revoked"),',
          ],
        },
        {
          name: 'doc-comment',
          arguments: ['     }'],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
        {
          name: 'storage',
          arguments: ['read'],
        },
      ],
    },
    {
      inputs: [
        {
          name: '_asset',
          concreteTypeId:
            'c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974',
        },
        {
          name: '_decimals',
          concreteTypeId:
            'c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b',
        },
      ],
      name: 'set_decimals',
      output:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
      attributes: [
        {
          name: 'doc-comment',
          arguments: [' This function should never be called.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Additional Information'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' NFT decimals are always `0u8` and thus must not be set.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' This function is an artifact of the SetAssetAttributes ABI definition,',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' but does not have a use in this contract as the decimal value is hardcoded.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Reverts'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * When the function is called.'],
        },
        {
          name: 'storage',
          arguments: ['write'],
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
          name: 'name',
          concreteTypeId:
            '9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c',
        },
      ],
      name: 'set_name',
      output:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
      attributes: [
        {
          name: 'doc-comment',
          arguments: [' Sets the name of an asset.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Arguments'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * `asset`: [AssetId] - The asset of which to set the name.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [' * `name`: [String] - The name of the asset.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Reverts'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * When the caller is not the owner of the contract.'],
        },
        {
          name: 'doc-comment',
          arguments: [' * When the name has already been set for an asset.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Reads: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [' * Writes: `2`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use asset::SetAssetAttributes;'],
        },
        {
          name: 'doc-comment',
          arguments: [' use src20::SRC20;'],
        },
        {
          name: 'doc-comment',
          arguments: [' use std::string::String;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(asset: AssetId, contract_id: ContractId) {'],
        },
        {
          name: 'doc-comment',
          arguments: [
            '     let set_abi = abi(SetAssetAttributes, contract_id);',
          ],
        },
        {
          name: 'doc-comment',
          arguments: ['     let src_20_abi = abi(SRC20, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let name = String::from_ascii_str("Ether");'],
        },
        {
          name: 'doc-comment',
          arguments: ['     set_abi.set_name(asset, name);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     assert(src_20_abi.name(asset) == name);'],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
        {
          name: 'storage',
          arguments: ['write'],
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
          name: 'symbol',
          concreteTypeId:
            '9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c',
        },
      ],
      name: 'set_symbol',
      output:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
      attributes: [
        {
          name: 'doc-comment',
          arguments: [' Sets the symbol of an asset.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Arguments'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * `asset`: [AssetId] - The asset of which to set the symbol.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [' * `symbol`: [String] - The symbol of the asset.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Reverts'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * When the caller is not the owner of the contract.'],
        },
        {
          name: 'doc-comment',
          arguments: [' * When the symbol has already been set for an asset.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Reads: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [' * Writes: `2`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use asset::SetAssetAttributes;'],
        },
        {
          name: 'doc-comment',
          arguments: [' use src20::SRC20;'],
        },
        {
          name: 'doc-comment',
          arguments: [' use std::string::String;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(asset: AssetId, contract_id: ContractId) {'],
        },
        {
          name: 'doc-comment',
          arguments: [
            '     let set_abi = abi(SetAssetAttributes, contract_id);',
          ],
        },
        {
          name: 'doc-comment',
          arguments: ['     let src_20_abi = abi(SRC20, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let symbol = String::from_ascii_str("ETH");'],
        },
        {
          name: 'doc-comment',
          arguments: ['     set_abi.set_symbol(asset, symbol);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     assert(src_20_abi.symbol(asset) == symbol);'],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
        {
          name: 'storage',
          arguments: ['write'],
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
        {
          name: 'metadata',
          concreteTypeId:
            'f44b531974c6c04e17e66ab54e9868d230b9a24b3710b184399c363f0190180d',
        },
      ],
      name: 'set_metadata',
      output:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
      attributes: [
        {
          name: 'doc-comment',
          arguments: [' Stores metadata for a specific asset and key pair.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Arguments'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * `asset`: [AssetId] - The asset for the metadata to be stored.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * `key`: [String] - The key for the metadata to be stored.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [' * `metadata`: [Metadata] - The metadata to be stored.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Reverts'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * When the metadata has already been set for an asset.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Reads: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [' * Writes: `2`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Example'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use asset::metdata::SetAssetMetadata;'],
        },
        {
          name: 'doc-comment',
          arguments: [' use src_7::{SRC7, Metadata};'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' fn foo(asset: AssetId, key: String, contract_id: ContractId, metadata: Metadata) {',
          ],
        },
        {
          name: 'doc-comment',
          arguments: ['     let set_abi = abi(SetAssetMetadata, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let src_7_abi = abi(SRC7, contract);'],
        },
        {
          name: 'doc-comment',
          arguments: [
            '     set_abi.set_metadata(storage.metadata, asset, key, metadata);',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [
            '     assert(src_7_abi.metadata(asset, key) == metadata);',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
        {
          name: 'storage',
          arguments: ['read', 'write'],
        },
      ],
    },
    {
      inputs: [],
      name: 'is_paused',
      output:
        'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
      attributes: [
        {
          name: 'doc-comment',
          arguments: [' Returns whether the contract is paused.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Returns'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * [bool] - The pause state for the contract.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Reads: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use sway_libs::pausable::Pausable;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(contract_id: ContractId) {'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let pausable_abi = abi(Pausable, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     assert(!pausable_abi.is_paused());'],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
        {
          name: 'storage',
          arguments: ['read'],
        },
      ],
    },
    {
      inputs: [],
      name: 'pause',
      output:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
      attributes: [
        {
          name: 'doc-comment',
          arguments: [' Pauses the contract.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Reverts'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * When the caller is not the contract owner.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Writes: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use sway_libs::pausable::Pausable;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(contract_id: ContractId) {'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let pausable_abi = abi(Pausable, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     pausable_abi.pause();'],
        },
        {
          name: 'doc-comment',
          arguments: ['     assert(pausable_abi.is_paused());'],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
        {
          name: 'storage',
          arguments: ['write'],
        },
      ],
    },
    {
      inputs: [],
      name: 'unpause',
      output:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
      attributes: [
        {
          name: 'doc-comment',
          arguments: [' Unpauses the contract.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Reverts'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * When the caller is not the contract owner.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Accesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Writes: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use sway_libs::pausable::Pausable;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(contract_id: ContractId) {'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let pausable_abi = abi(Pausable, contract_id);'],
        },
        {
          name: 'doc-comment',
          arguments: ['     pausable_abi.unpause();'],
        },
        {
          name: 'doc-comment',
          arguments: ['     assert(!pausable_abi.is_paused());'],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
        {
          name: 'storage',
          arguments: ['write'],
        },
      ],
    },
    {
      inputs: [
        {
          name: 'owner',
          concreteTypeId:
            'ab7cd04e05be58e3fc15d424c2c4a57f824a2a2d97d67252440a3925ebdc1335',
        },
      ],
      name: 'constructor',
      output:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
      attributes: [
        {
          name: 'doc-comment',
          arguments: [' Sets the defaults for the contract.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Arguments'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            ' * `owner`: [Identity] - The `Identity` that will be the first owner.',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Reverts'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * When ownership has been set before.'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Number of Storage Acesses'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' * Reads: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [' * Write: `1`'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' # Examples'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' ```sway'],
        },
        {
          name: 'doc-comment',
          arguments: [' use standards::src5::SRC5;'],
        },
        {
          name: 'doc-comment',
          arguments: [' use nft::Constructor;'],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [' fn foo(contract: ContractId, owner: Identity) {'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let src_5_abi = abi(SRC5, contract.bits());'],
        },
        {
          name: 'doc-comment',
          arguments: [
            '     assert(src_5_abi.owner() == State::Uninitialized);',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [''],
        },
        {
          name: 'doc-comment',
          arguments: [
            '     let constructor_abi = abi(Constructor, contract.bits());',
          ],
        },
        {
          name: 'doc-comment',
          arguments: ['     constructor_abi.constructor(owner);'],
        },
        {
          name: 'doc-comment',
          arguments: [
            '     assert(src_5_abi.owner() == State::Initialized(owner));',
          ],
        },
        {
          name: 'doc-comment',
          arguments: [' }'],
        },
        {
          name: 'doc-comment',
          arguments: [' ```'],
        },
        {
          name: 'storage',
          arguments: ['read', 'write'],
        },
      ],
    },
  ],
  loggedTypes: [
    {
      logId: '10032608944051208538',
      concreteTypeId:
        '8b3afcadf894415a10b09fc3717487e33802c8ffbb030edafe84ca4a71b280bc',
    },
    {
      logId: '4237256875605624201',
      concreteTypeId:
        '3acdc2adac8e0589c5864525e0edc9dc61a9571a4d09c3c57b58ea76d33f4b46',
    },
    {
      logId: '17462098202904023478',
      concreteTypeId:
        'f255d5cc2114d1b6bc34bef4c28d4b60caccffd9a672ed16b79ea217e1c4a8a3',
    },
    {
      logId: '17188485204969729195',
      concreteTypeId:
        'ee89c439b5472cab716006d7c677d16e15301e6c82cfce12cebfa57919f537de',
    },
    {
      logId: '16139176946940135860',
      concreteTypeId:
        'dff9dfec998a49b40f1c4b09567400f0e712aaf939c08f7d07bc5c63116e1084',
    },
    {
      logId: '13791596350235125220',
      concreteTypeId:
        'bf6597cf3d56a5e47a920520e275ccd481a27e7c988ea6af6f253170d5374c5a',
    },
    {
      logId: '14321618427101975361',
      concreteTypeId:
        'c6c09c148c1a1341c7ab81697b3545cc695fa67668a169cddc59790a9a0b6b44',
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
      logId: '17415926155927968170',
      concreteTypeId:
        'f1b1cc90b68559aa4bb5cc58201ebb5c5402ed3aa28927140761e8ff7dcd3ab8',
    },
    {
      logId: '4571204900286667806',
      concreteTypeId:
        '3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d',
    },
    {
      logId: '2161305517876418151',
      concreteTypeId:
        '1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893',
    },
    {
      logId: '16280289466020123285',
      concreteTypeId:
        'e1ef35033ea9d2956f17c3292dea4a46ce7d61fdf37bbebe03b7b965073f43b5',
    },
  ],
  messagesTypes: [],
  configurables: [],
};
