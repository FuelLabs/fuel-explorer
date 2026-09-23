import {
  ZERO_B256,
  toB256,
  toHex,
  toU64String,
  txPointerHex,
  utxoIdHex,
} from './values';

describe('values', () => {
  it('toHex', () => {
    expect(toHex(undefined)).toBe('0x');
    expect(toHex(new Uint8Array([0xab, 0x01]))).toBe('0xab01');
  });
  it('toB256 pads and zero-defaults', () => {
    expect(toB256(undefined)).toBe(ZERO_B256);
    expect(toB256(new Uint8Array([1]))).toBe(`0x${'00'.repeat(31)}01`);
    expect(() => toB256(new Uint8Array(33))).toThrow(/32 bytes/);
  });
  it('toU64String', () => {
    expect(toU64String(undefined)).toBe('0');
    expect(toU64String('123')).toBe('123');
    expect(toU64String(5)).toBe('5');
    expect(() => toU64String('x')).toThrow();
  });
  it('txPointerHex and utxoIdHex', () => {
    expect(txPointerHex(0x0388d8a0, 3)).toBe('0388d8a00003');
    expect(utxoIdHex(new Uint8Array(32).fill(0xaa), 1)).toBe(
      `0x${'aa'.repeat(32)}0001`,
    );
  });
});
