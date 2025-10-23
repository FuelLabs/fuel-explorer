import { route } from 'app-commons';

export const Routes = {
  home: route<[cursor: string, dir: 'after' | 'before']>(
    '/?cursor=:page&dir=:dir',
  ),
  txLoading: route<[id: string]>('/tx/:id/loading'),
  txSimple: route<[id: string]>('/tx/:id/simple'),
  txStandard: route<[id: string]>('/tx/:id/standard'),
  txAdvanced: route<[id: string]>('/tx/:id/advanced'),
  blockSimpleQuery: route<
    [id: string, cursor: string, dir: 'after' | 'before']
  >('/block/:id/simple/?cursor=:page&dir=:dir'),
  blockSimple: route<[id: string]>('/block/:id/simple'),
  blockAdvanced: route<[id: string]>('/block/:id/advanced'),
  accountTxs: route<[id: string]>('/account/:id/transactions'),
  accountTxsWithPagination: route<
    [id: string, cursor: string, dir: 'after' | 'before']
  >('/account/:id/transactions/?cursor=:page&dir=:dir'),
  accountAssets: route<[id: string]>('/account/:id/assets'),
  accountPredicate: route<[id: string]>('/account/:id/predicate'),
  contract: route<[id: string, tab: string]>('/contract/:id/:tab'),
  contractAssets: route<[id: string]>('/contract/:id/assets'),
  contractMintedAssets: route<[id: string]>('/contract/:id/minted-assets'),
  contractMintedAssetsWithPagination: route<
    [id: string, cursor: string, dir: 'after' | 'before']
  >('/contract/:id/minted-assets/?cursor=:page&dir=:dir'),
  contractTxs: route<[id: string]>('/contract/:id/transactions'),
  contractTxsWithPagination: route<
    [id: string, cursor: string, dir: 'after' | 'before']
  >('/contract/:id/transactions/?cursor=:page&dir=:dir'),
  contractCode: route<[id: string]>('/contract/:id/code'),
};
