export type TxsRouteSearchParams = {
  cursor?: string | null;
  dir?: 'after' | 'before';
  page?: string;
};

export type TxsRouteProps = {
  searchParams: TxsRouteSearchParams;
};
