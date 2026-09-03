export const ZERO_B256 = `0x${'00'.repeat(32)}`;

export function record(
  value: unknown,
  what = 'message',
): Record<string, unknown> {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`expected protobuf ${what} object`);
  }
  return value as Record<string, unknown>;
}

export function bytesOf(value: unknown): Uint8Array | undefined {
  if (value == null) return undefined;
  if (value instanceof Uint8Array) return value;
  throw new Error(`expected bytes, got ${typeof value}`);
}

export function toU64String(value: unknown): string {
  if (value == null) return '0';
  if (typeof value === 'bigint') return value.toString();
  if (typeof value === 'number') return Math.trunc(value).toString();
  if (typeof value === 'string' && /^\d+$/.test(value)) return value;
  if (typeof value === 'object' && 'toString' in (value as object)) {
    const s = String(value);
    if (/^\d+$/.test(s)) return s;
  }
  throw new Error(`cannot convert to u64: ${String(value)}`);
}

export function toNumber(value: unknown, fallback = 0): number {
  if (value == null) return fallback;
  return Number(toU64String(value));
}

export function toHex(bytes?: Uint8Array | null): string {
  if (!bytes || bytes.length === 0) return '0x';
  return `0x${Buffer.from(bytes).toString('hex')}`;
}

export function toB256(bytes?: Uint8Array | null): string {
  if (!bytes || bytes.length === 0) return ZERO_B256;
  const hex = Buffer.from(bytes).toString('hex');
  if (hex.length > 64)
    throw new Error(`b256 longer than 32 bytes: ${hex.length / 2}`);
  return `0x${hex.padStart(64, '0')}`;
}

export function txPointerHex(height: number, index: number): string {
  return `${height.toString(16).padStart(8, '0')}${index.toString(16).padStart(4, '0')}`;
}

export function utxoIdHex(
  txId: Uint8Array | undefined,
  outputIndex: number,
): string {
  return `${toB256(txId)}${outputIndex.toString(16).padStart(4, '0')}`;
}
