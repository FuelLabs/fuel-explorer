export function truncateMaxSizeString(str: string, maxSize: number) {
  return str.length > maxSize ? `${str.slice(0, maxSize)}...` : str;
}
