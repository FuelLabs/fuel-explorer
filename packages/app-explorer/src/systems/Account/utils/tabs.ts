export function isAllowedTab(
  tab: string,
): tab is 'assets' | 'transactions' | 'predicate' {
  return ['assets', 'transactions', 'predicate'].includes(tab);
}

export function isAssetsTab(tab: string): tab is 'assets' {
  return tab === 'assets';
}

export function isTransactionsTab(tab: string): tab is 'transactions' {
  return tab === 'transactions';
}

export function isPredicateTab(tab: string): tab is 'predicate' {
  return tab === 'predicate';
}
