import { route } from '~/systems/Core/utils/route';

export const Routes = {
  home: route<[page: string]>('/?page=:page'),
  txSimple: route<[id: string]>('/tx/:id/simple'),
  txAdvanced: route<[id: string]>('/tx/:id/advanced'),
  blockSimple: route<[id: string]>('/block/:id/simple'),
  blockAdvanced: route<[id: string]>('/block/:id/advanced'),
  account: route<[id: string, tab: string]>('/account/:id/:tab'),
  accountTxs: route<[id: string]>('/account/:id/transactions'),
  accountAssets: route<[id: string]>('/account/:id/assets'),
  accountPredicate: route<[id: string]>('/account/:id/predicate'),
  contract: route<[id: string, tab: string]>('/contract/:id/:tab'),
  contractAssets: route<[id: string]>('/contract/:id/assets'),
  contractCode: route<[id: string]>('/contract/:id/code'),
};
