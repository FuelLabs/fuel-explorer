import { useEffect, useRef, useState } from 'react';

export function useCopied(duration = 1500) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  function markCopied() {
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), duration);
  }

  return { copied, markCopied };
}
