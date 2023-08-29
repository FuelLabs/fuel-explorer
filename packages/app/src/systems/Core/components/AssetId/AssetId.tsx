import type { ThemeUtilsCSS } from '@fuel-ui/css';
import { Copyable } from '@fuel-ui/react';

import { shortAddress } from '../../utils/address';

type AssetIdProps = {
  id: string;
  className?: string;
  css?: ThemeUtilsCSS;
};

export function AssetId({ id, ...props }: AssetIdProps) {
  return (
    <Copyable as="span" value={id} {...props} data-address={id}>
      {shortAddress(id)}
    </Copyable>
  );
}
