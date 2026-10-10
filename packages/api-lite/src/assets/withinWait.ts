// Resolves to null once `ms` passes; the promise keeps running and can still
// fill a cache for the next caller.
export async function withinWait<T>(
  promise: Promise<T>,
  ms: number,
): Promise<T | null> {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
}
