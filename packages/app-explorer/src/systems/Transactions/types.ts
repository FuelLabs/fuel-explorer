export type TxsRouteSearchParams = {
  cursor?: string | null;
  dir?: 'after' | 'before';
};

export type TxsRouteProps = {
  searchParams: TxsRouteSearchParams;
};
