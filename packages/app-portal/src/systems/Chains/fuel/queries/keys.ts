import { QueryKey } from '@tanstack/react-query';
import { BRIDGE_QUERY_KEYS } from '~portal/systems/Bridge/queries/keys';

export const FUEL_QUERY_KEYS = {
  all: (): QueryKey => {
    return [...BRIDGE_QUERY_KEYS.all, 'fuel'];
  },
  detail: (id: string): QueryKey => {
    return [...BRIDGE_QUERY_KEYS.all, 'detail', id];
  },
  blockCommit: (id: string): QueryKey => {
    return [...FUEL_QUERY_KEYS.detail(id), 'blockCommit'];
  },
  messageProof: (id: string): QueryKey => {
    return [...FUEL_QUERY_KEYS.detail(id), 'messageProof'];
  },
  blockFinalization: (id: string): QueryKey => {
    return [...FUEL_QUERY_KEYS.detail(id), 'blockFinalization'];
  },
  messageRelayed: (id: string): QueryKey => {
    return [...FUEL_QUERY_KEYS.detail(id), 'messageRelayed'];
  },
  waitingReceive: (id: string): QueryKey => {
    return [...FUEL_QUERY_KEYS.detail(id), 'waitingReceive'];
  },
};
