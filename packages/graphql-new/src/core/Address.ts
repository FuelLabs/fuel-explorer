import { Address as FuelAddr, isB256, isBech32 } from 'fuels';

export class Address {
  private raw: FuelAddr;

  constructor(value: string) {
    const isValvalue = value && (isB256(value) || isBech32(value));
    if (!value || !isValvalue) {
      throw new Error('Invalvalue address');
    }

    this.raw = FuelAddr.fromString(value);
  }

  toB256() {
    return this.raw.toB256();
  }
  toBech32() {
    return this.raw.bech32Address;
  }
  toString() {
    return this.raw.toString();
  }
}
