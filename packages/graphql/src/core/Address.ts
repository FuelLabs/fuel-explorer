import { Address as FuelAddr, isB256, isBech32 } from 'fuels';

type ShortAddressOptions = {
  minLength?: number;
  start?: number;
  end?: number;
};

export class Address {
  constructor(public value: string) {}

  parse() {
    const value = this.value;
    const isValue = value && (isB256(value) || isBech32(value));
    if (!value || !isValue) {
      throw new Error('Invalid value address');
    }

    return FuelAddr.fromString(value);
  }

  raw() {
    return this.value;
  }

  short({ minLength = 10, start = 6, end = 4 }: ShortAddressOptions = {}) {
    const address = this.value;
    return address.length > minLength
      ? `${address.slice(0, start)}...${address.slice(end * -1)}`
      : address;
  }
}
