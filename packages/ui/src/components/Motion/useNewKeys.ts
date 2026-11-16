import { useRef } from 'react';

// Keys absent from the first non-empty list. Key rows by id so each mounts once.
export function useNewKeys(keys: string[]) {
  const initial = useRef<Set<string> | null>(null);
  if (initial.current === null) {
    if (keys.length === 0) return new Set<string>();
    initial.current = new Set(keys);
  }
  const seen = initial.current;
  return new Set(keys.filter((k) => !seen.has(k)));
}
