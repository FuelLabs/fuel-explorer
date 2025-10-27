export async function forceRetryWithTimeout<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  maxTimeout = 5000,
  retryCount = 20,
  retryDelay = 0,
): Promise<T> {
  for (let attempt = 0; attempt < retryCount; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), maxTimeout);

    try {
      const result = await fn(controller.signal);
      return result;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.warn('Timeout occurred, will retry');
      }

      if (attempt === retryCount - 1) {
        throw new Error(`Max retries reached: ${error.message || error}`);
      }

      retryDelay &&
        (await new Promise((resolve) => setTimeout(resolve, retryDelay)));
    } finally {
      clearTimeout(timeout);
    }
  }
  throw new Error('Max retries reached without success.');
}
