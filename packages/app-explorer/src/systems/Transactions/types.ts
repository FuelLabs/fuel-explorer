export type TxsRouteSearchParams = {
  cursor?: string | null;
  dir?: 'next' | 'prev';
};

export type TxsRouteProps = {
  searchParams: TxsRouteSearchParams;
};
