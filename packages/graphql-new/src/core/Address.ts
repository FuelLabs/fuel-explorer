import { Address as FuelAddr } from 'fuels';

export class Address {
  private raw: FuelAddr;

  constructor(value: string) {
    this.raw = FuelAddr.fromDynamicInput(value);
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
