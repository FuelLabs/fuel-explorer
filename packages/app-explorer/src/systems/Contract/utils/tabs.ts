export function isAllowedTab(tab: string): tab is 'assets' | 'code' {
  return ['assets', 'code'].includes(tab);
}

export function isAssetsTab(tab: string): tab is 'assets' {
  return tab === 'assets';
}

export function isCodeTab(tab: string): tab is 'code' {
  return tab === 'code';
}
