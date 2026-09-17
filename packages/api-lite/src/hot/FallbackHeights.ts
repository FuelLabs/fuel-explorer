const HEIGHTS_PER_ACCOUNT = 30;
const MAX_ACCOUNTS = 1000;

// Block heights of the transactions an account's history pages last served
// from fuel-core, most recent first. These blocks sit below the index window,
// so the index cannot name them when the disk cache decides what to keep.
// Memory only: after a restart the next page view records them again.
export class FallbackHeights {
  private readonly byAccount = new Map<string, number[]>();

  constructor(
    private readonly perAccount = HEIGHTS_PER_ACCOUNT,
    private readonly maxAccounts = MAX_ACCOUNTS,
  ) {}

  record(account: string, heights: number[]): void {
    if (heights.length === 0) return;
    const fresh = new Set(heights);
    const previous = this.byAccount.get(account) ?? [];
    this.byAccount.delete(account);
    this.byAccount.set(
      account,
      [...fresh, ...previous.filter((h) => !fresh.has(h))].slice(
        0,
        this.perAccount,
      ),
    );
    if (this.byAccount.size > this.maxAccounts) {
      const oldest = this.byAccount.keys().next().value;
      if (oldest !== undefined) this.byAccount.delete(oldest);
    }
  }

  heightsFor(account: string): number[] {
    return this.byAccount.get(account) ?? [];
  }
}
