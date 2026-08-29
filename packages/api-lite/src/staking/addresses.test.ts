import {
  convertEthAddressToSequencerUserAddress,
  getValidAddress,
} from './addresses';

describe('getValidAddress', () => {
  it('checksums a valid lowercase address', () => {
    expect(getValidAddress('0x821d65c4e8bc11cb146452f28a5eb0dfc25a1113')).toBe(
      '0x821d65c4e8Bc11Cb146452F28a5eb0DFC25A1113',
    );
  });

  it('throws a fixed message for an invalid address', () => {
    expect(() => getValidAddress('not-an-address')).toThrow(
      'Invalid address format, expected a valid Ethereum address',
    );
  });
});

describe('convertEthAddressToSequencerUserAddress', () => {
  it('bech32-encodes the address bytes with the fuelsequencer HRP', () => {
    const result = convertEthAddressToSequencerUserAddress(
      '0x821d65c4e8Bc11Cb146452F28a5eb0DFC25A1113',
    );
    expect(result).toMatch(/^fuelsequencer1/);
  });

  it('returns undefined for an empty address', () => {
    expect(convertEthAddressToSequencerUserAddress('')).toBeUndefined();
  });
});
