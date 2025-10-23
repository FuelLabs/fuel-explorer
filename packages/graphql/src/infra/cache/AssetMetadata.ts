import { Contract, Provider } from 'fuels';
import { env } from '~/config';

export default class AssetMetadata {
  static instance: AssetMetadata;
  private lastDate?: Date;
  private provider?: Provider;
  private values: Record<string, any> = {};

  private constructor() {}

  async getProvider() {
    if (!this.provider) {
      const providerUrl = env.get('FUEL_PROVIDER');
      if (!providerUrl) {
        throw new Error('FUEL_PROVIDER is not set');
      }
      this.provider = new Provider(providerUrl);
    }
    return this.provider;
  }

  shouldFetch(asset_id: string) {
    const now = new Date();
    return (
      !this.lastDate ||
      !this.values[asset_id] ||
      now.getTime() - this.lastDate.getTime() > 60000
    );
  }

  returnValue(asset_id: string, value: any) {
    this.lastDate = new Date();
    this.values[asset_id] = value;
    return value;
  }

  static parseUrl(url: string): string {
    // Check if the input is a valid CID
    const isCID =
      /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[A-Za-z2-7]{58}|B[A-Z2-7]{58}|z[1-9A-HJ-NP-Za-km-z]{48}|F[0-9A-F]{50})$/.test(
        url,
      );

    if (isCID) {
      // If it's a CID, convert it to an IPFS gateway URL
      return `https://ipfs.io/ipfs/${url}`;
    }
    if (url.startsWith('ipfs://')) {
      // Convert IPFS URI to a gateway URL
      const cid = url.slice(7);
      return `https://ipfs.io/ipfs/${cid}`;
    }
    if (url.startsWith('ar://')) {
      // Convert Arweave URI to a gateway URL
      const id = url.slice(5);
      return `https://arweave.net/${id}`;
    }
    if (url.startsWith('data:')) {
      // Data URIs are returned as-is
      return url;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Assume HTTPS for URLs without a protocol
      return `https://${url}`;
    }
    // Return other URLs as-is
    return url;
  }

  async fetch(contractId: string, asset_id: string) {
    if (this.shouldFetch(asset_id)) {
      try {
        const provider = await this.getProvider();
        const contract = new Contract(contractId, ABI_SRC7, provider);
        const { value } = await contract.functions
          .metadata(
            {
              bits: asset_id,
            },
            'uri',
          )
          .get();
        if (!value?.String) return null;
        const uri = AssetMetadata.parseUrl(value.String);
        return this.returnValue(asset_id, uri);
      } catch {
        return null;
      }
    }
    return this.values[asset_id];
  }

  static getInstance() {
    if (!AssetMetadata.instance) {
      AssetMetadata.instance = new AssetMetadata();
    }
    return AssetMetadata.instance;
  }
}

const ABI_SRC7 = {
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
      type: 'str[12]',
      concreteTypeId:
        'd41cd041a54363a3d61ab80537895c873f2315f976fc58def6e5035f6b1f0710',
    },
    {
      type: 'str[27]',
      concreteTypeId:
        '4692ce1cc6bd808ea5fe87f76008be9b96a38c78a8b1b86957d486351b10ff75',
    },
    {
      type: 'str[5]',
      concreteTypeId:
        '84877f6e98274b9e4721db68b4c0bdb9e52b8e9572c5bd7811c07a41ced882c7',
    },
    {
      type: 'str[7]',
      concreteTypeId:
        '5bc5f5dfcd28de7e77d30dec3e6392905198dac3b172c043b403f669f66585ca',
    },
    {
      type: 'struct standards::src20::SetDecimalsEvent',
      concreteTypeId:
        'fbe071a6e7ca2b2b5e503e82638f9f11c861a6fb452b65473eca8260db87392d',
      metadataTypeId: 6,
    },
    {
      type: 'struct standards::src20::SetNameEvent',
      concreteTypeId:
        '6ce295b0fb4c1c15e8ed1cfa4babda47d8a04940a5266a3229e12243a2e37c2c',
      metadataTypeId: 7,
    },
    {
      type: 'struct standards::src20::SetSymbolEvent',
      concreteTypeId:
        'a8a4b78066c51a50da6349bd395fe1c67e774d75c1db2c5c22288a432d7a363d',
      metadataTypeId: 8,
    },
    {
      type: 'struct standards::src20::TotalSupplyEvent',
      concreteTypeId:
        'f255d5cc2114d1b6bc34bef4c28d4b60caccffd9a672ed16b79ea217e1c4a8a3',
      metadataTypeId: 9,
    },
    {
      type: 'struct standards::src7::SetMetadataEvent',
      concreteTypeId:
        'f1b1cc90b68559aa4bb5cc58201ebb5c5402ed3aa28927140761e8ff7dcd3ab8',
      metadataTypeId: 10,
    },
    {
      type: 'struct std::asset_id::AssetId',
      concreteTypeId:
        'c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974',
      metadataTypeId: 12,
    },
    {
      type: 'struct std::string::String',
      concreteTypeId:
        '9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c',
      metadataTypeId: 16,
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
      type: 'b256',
      metadataTypeId: 0,
    },
    {
      type: 'enum standards::src7::Metadata',
      metadataTypeId: 1,
      components: [
        {
          name: 'B256',
          typeId: 0,
        },
        {
          name: 'Bytes',
          typeId: 13,
        },
        {
          name: 'Int',
          typeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
        {
          name: 'String',
          typeId: 16,
        },
      ],
    },
    {
      type: 'enum std::identity::Identity',
      metadataTypeId: 2,
      components: [
        {
          name: 'Address',
          typeId: 11,
        },
        {
          name: 'ContractId',
          typeId: 15,
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
          typeId: 4,
        },
      ],
      typeParameters: [4],
    },
    {
      type: 'generic T',
      metadataTypeId: 4,
    },
    {
      type: 'raw untyped ptr',
      metadataTypeId: 5,
    },
    {
      type: 'struct standards::src20::SetDecimalsEvent',
      metadataTypeId: 6,
      components: [
        {
          name: 'asset',
          typeId: 12,
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
      metadataTypeId: 7,
      components: [
        {
          name: 'asset',
          typeId: 12,
        },
        {
          name: 'name',
          typeId: 3,
          typeArguments: [
            {
              name: '',
              typeId: 16,
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
      metadataTypeId: 8,
      components: [
        {
          name: 'asset',
          typeId: 12,
        },
        {
          name: 'symbol',
          typeId: 3,
          typeArguments: [
            {
              name: '',
              typeId: 16,
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
      metadataTypeId: 9,
      components: [
        {
          name: 'asset',
          typeId: 12,
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
      metadataTypeId: 10,
      components: [
        {
          name: 'asset',
          typeId: 12,
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
          typeId: 16,
        },
        {
          name: 'sender',
          typeId: 2,
        },
      ],
    },
    {
      type: 'struct std::address::Address',
      metadataTypeId: 11,
      components: [
        {
          name: 'bits',
          typeId: 0,
        },
      ],
    },
    {
      type: 'struct std::asset_id::AssetId',
      metadataTypeId: 12,
      components: [
        {
          name: 'bits',
          typeId: 0,
        },
      ],
    },
    {
      type: 'struct std::bytes::Bytes',
      metadataTypeId: 13,
      components: [
        {
          name: 'buf',
          typeId: 14,
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
      metadataTypeId: 14,
      components: [
        {
          name: 'ptr',
          typeId: 5,
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
      metadataTypeId: 15,
      components: [
        {
          name: 'bits',
          typeId: 0,
        },
      ],
    },
    {
      type: 'struct std::string::String',
      metadataTypeId: 16,
      components: [
        {
          name: 'bytes',
          typeId: 13,
        },
      ],
    },
  ],
  functions: [
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
          arguments: [' use src7::{SRC7, Metadata};'],
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
          arguments: ['     let key = String::from_ascii_str("social:x");'],
        },
        {
          name: 'doc-comment',
          arguments: ['     let data = contract_abi.metadata(asset, key);'],
        },
        {
          name: 'doc-comment',
          arguments: [
            '     assert(data.unwrap() == Metadata::String(String::from_ascii_str("fuel_network")));',
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
          name: 'svg_image',
          concreteTypeId:
            '9a7f1d3e963c10e0a4ea70a8e20a4813d1dc5682e28f74cb102ae50d32f7f98c',
        },
        {
          name: 'health_attribute',
          concreteTypeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
      ],
      name: 'set_src7_events',
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
          name: 'supply',
          concreteTypeId:
            '1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0',
        },
      ],
      name: 'set_src20_data',
      output:
        '2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d',
      attributes: null,
    },
  ],
  loggedTypes: [
    {
      logId: '17415926155927968170',
      concreteTypeId:
        'f1b1cc90b68559aa4bb5cc58201ebb5c5402ed3aa28927140761e8ff7dcd3ab8',
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
      logId: '18149631459970394923',
      concreteTypeId:
        'fbe071a6e7ca2b2b5e503e82638f9f11c861a6fb452b65473eca8260db87392d',
    },
    {
      logId: '17462098202904023478',
      concreteTypeId:
        'f255d5cc2114d1b6bc34bef4c28d4b60caccffd9a672ed16b79ea217e1c4a8a3',
    },
  ],
  messagesTypes: [],
  configurables: [
    {
      name: 'DECIMALS',
      concreteTypeId:
        'c89951a24c6ca28c13fd1cfdc646b2b656d69e61a92b91023be7eb58eb914b6b',
      offset: 34624,
    },
    {
      name: 'NAME',
      concreteTypeId:
        '5bc5f5dfcd28de7e77d30dec3e6392905198dac3b172c043b403f669f66585ca',
      offset: 34632,
    },
    {
      name: 'SYMBOL',
      concreteTypeId:
        '84877f6e98274b9e4721db68b4c0bdb9e52b8e9572c5bd7811c07a41ced882c7',
      offset: 34688,
    },
    {
      name: 'SOCIAL_X',
      concreteTypeId:
        'd41cd041a54363a3d61ab80537895c873f2315f976fc58def6e5035f6b1f0710',
      offset: 34672,
    },
    {
      name: 'SITE_FORUM',
      concreteTypeId:
        '4692ce1cc6bd808ea5fe87f76008be9b96a38c78a8b1b86957d486351b10ff75',
      offset: 34640,
    },
  ],
};
