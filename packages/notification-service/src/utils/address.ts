type ShortAddressOptions = {
  minLength?: number;
  start?: number;
  end?: number;
};

export function shortAddress(
  address: string = '',
  { minLength = 10, start = 6, end = 4 }: ShortAddressOptions = {}
) {
  return address.length > minLength
    ? `${address.slice(0, start)}...${address.slice(end * -1)}`
    : address;
}
