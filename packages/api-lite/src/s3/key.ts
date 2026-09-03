export function s3KeyForBlock(height: number): string {
  if (!Number.isInteger(height) || height < 0 || height > 0xffffffff) {
    throw new Error(`block height is not a u32: ${height}`);
  }
  const bytes = [
    (height >>> 24) & 0xff,
    (height >>> 16) & 0xff,
    (height >>> 8) & 0xff,
    height & 0xff,
  ];
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join('/');
}
