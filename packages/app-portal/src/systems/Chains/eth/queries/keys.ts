import { QueryKey } from '@tanstack/react-query';
import { BRIDGE_QUERY_KEYS } from '~portal/systems/Bridge/queries/keys';

export const ETH_QUERY_KEYS = {
  all: (): QueryKey => {
    return [...BRIDGE_QUERY_KEYS.all, 'eth'];
  },
  detail: (id: string): QueryKey => {
    return [...BRIDGE_QUERY_KEYS.all, 'detail', id];
  },
  message: (id: string): QueryKey => {
    return [...ETH_QUERY_KEYS.detail(id), 'message'];
  },
  messageStatus: (id: string): QueryKey => {
    return [...ETH_QUERY_KEYS.detail(id), 'messageStatus'];
  },
};
