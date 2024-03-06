export const BRIDGE_QUERY_KEYS = {
  all: ['bridge'] as const,
  list: () => [...BRIDGE_QUERY_KEYS.all, 'list'] as const,
};
