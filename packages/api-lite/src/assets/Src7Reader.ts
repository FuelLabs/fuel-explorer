import { Contract, ErrorCode, type Provider } from 'fuels';
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
const KEYS = [...IMAGE_KEYS, ...LINK_KEYS];

export type Src7Metadata = {
  name: string | null;
  image: string | null;
  link: string | null;
};

// A revert means the contract lacks the function. Any other error is a failed
// request, which is thrown so the caller retries it later.
function isRevert(e: unknown): boolean {
  return (e as { code?: unknown } | null)?.code === ErrorCode.SCRIPT_REVERTED;
}

// Tokens of one contract usually share a key scheme, so the key that last
// answered is tried first. A contract without SRC-20 or SRC-7 is not called
// for them again.
export class Src7Reader {
  private readonly keyByContract = new Map<string, string>();
  private readonly unsupported = new Set<string>();
  private readonly withoutSrc7 = new Set<string>();

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
    } catch (e) {
      if (!isRevert(e)) throw e;
      this.unsupported.add(contractId);
      return null;
    }

    const none = { name, image: null, link: null };
    if (this.withoutSrc7.has(contractId)) return none;
    const known = this.keyByContract.get(contractId);
    const keys = known ? [known, ...KEYS.filter((k) => k !== known)] : KEYS;
    for (const key of keys) {
      let value: string | null;
      try {
        value = await this.metadata(contract, asset, key);
      } catch (e) {
        if (!isRevert(e)) throw e;
        this.withoutSrc7.add(contractId);
        return none;
      }
      if (!value) continue;
      this.keyByContract.set(contractId, key);
      const isLink = LINK_KEYS.includes(key);
      return {
        name,
        image: isLink ? null : value,
        link: isLink ? value : null,
      };
    }
    return none;
  }

  private async metadata(
    contract: Contract,
    asset: { bits: string },
    key: string,
  ): Promise<string | null> {
    const { value } = await contract.functions.metadata(asset, key).get();
    return (value as { String?: string } | undefined)?.String ?? null;
  }
}
