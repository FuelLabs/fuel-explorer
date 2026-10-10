import { useEffect, useRef, useState } from 'react';

export function useCopied(duration = 1500) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  function flash(next: 'copied' | 'failed') {
    setState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), duration);
  }

  function markCopied() {
    flash('copied');
  }

  function markFailed() {
    flash('failed');
  }

  /** Writes to the clipboard and flashes copied or failed. Resolves true on success. */
  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      markCopied();
      return true;
    } catch {
      markFailed();
      return false;
    }
  }

  return {
    copied: state === 'copied',
    failed: state === 'failed',
    markCopied,
    markFailed,
    copy,
  };
}
