import { Address as FuelAddr, isB256, isBech32 } from 'fuels';

type ShortAddressOptions = {
  minLength?: number;
  start?: number;
  end?: number;
};

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

  short({ minLength = 10, start = 6, end = 4 }: ShortAddressOptions = {}) {
    const address = this.raw.toB256().toString();
    return address.length > minLength
      ? `${address.slice(0, start)}...${address.slice(end * -1)}`
      : address;
  }
}
