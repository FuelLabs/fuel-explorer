import { Contract, type Provider } from 'fuels';
import abi from './src7.abi.json';

// SRC-9 image keys first, then keys that hold a link to a JSON metadata file.
const IMAGE_KEYS = [
  'image:png',
  'image:svg',
  'image:jpeg',
  'image:webp',
  'image:gif',
  'image',
];
const LINK_KEYS = ['metadata', 'uri'];

export type Src7Metadata = {
  name: string | null;
  image: string | null;
  link: string | null;
};

// Tokens of one contract share a key scheme, so the key that answered is
// reused for the rest of the contract (null: none did), and a contract
// without SRC-20/SRC-7 is not called again.
export class Src7Reader {
  private readonly keyByContract = new Map<string, string | null>();
  private readonly unsupported = new Set<string>();

  constructor(private readonly provider: Provider) {}

  async read(
    contractId: string,
    assetId: string,
  ): Promise<Src7Metadata | null> {
    if (this.unsupported.has(contractId)) return null;
    const contract = new Contract(contractId, abi, this.provider);
    const asset = { bits: assetId };

    let name: string | null;
    try {
      const { value } = await contract.functions.name(asset).get();
      name = typeof value === 'string' ? value : null;
    } catch {
      this.unsupported.add(contractId);
      return null;
    }

    const known = this.keyByContract.get(contractId);
    const keys =
      known === undefined
        ? [...IMAGE_KEYS, ...LINK_KEYS]
        : known
          ? [known]
          : [];
    for (const key of keys) {
      const value = await this.metadata(contract, asset, key);
      if (!value) continue;
      this.keyByContract.set(contractId, key);
      const isLink = LINK_KEYS.includes(key);
      return {
        name,
        image: isLink ? null : value,
        link: isLink ? value : null,
      };
    }
    if (known === undefined) this.keyByContract.set(contractId, null);
    return { name, image: null, link: null };
  }

  private async metadata(
    contract: Contract,
    asset: { bits: string },
    key: string,
  ): Promise<string | null> {
    try {
      const { value } = await contract.functions.metadata(asset, key).get();
      return (value as { String?: string } | undefined)?.String ?? null;
    } catch {
      return null;
    }
  }
}
