import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

import { createComponent } from '../../utils/component';
import { cx } from '../../utils/css';
import type { BaseProps, WithAsProps } from '../../utils/types';
import { HStack } from '../Box';
import { Copyable } from '../Copyable';
import type { LinkProps } from '../Link';
import { Link } from '../Link';
import { Text } from '../Text';

import type { UseFuelAddressOpts } from './useFuelAddress';
import { useFuelAddress } from './useFuelAddress';

export type AddressBaseProps = {
  value?: string;
  prefix?: ReactNode;
  full?: boolean;
  addressOpts?: UseFuelAddressOpts;
  fixed?: UseFuelAddressOpts['fixed'];
  linkProps?: AddressLinkProps;
};

export type AddressProps = BaseProps<AddressBaseProps> & WithAsProps;
export type AddressLinkProps = Omit<LinkProps, 'children'>;

export const Address = createComponent<AddressProps, typeof HStack>({
  id: 'Address',
  baseElement: HStack,
  render: (
    Root,
    { value, full, fixed, prefix, className, addressOpts, linkProps, ...props },
  ) => {
    const classes = styles();
    const { address, short } = useFuelAddress(value || '', {
      ...addressOpts,
      fixed,
    });

    return (
      <Root
        gap="3"
        align="center"
        {...props}
        className={classes.root({ className })}
      >
        <HStack align="center" gap="1">
          {prefix && <Text className={classes.prefix()}>{prefix}</Text>}
          <Copyable value={address} className={classes.address()} iconSize={16}>
            <Link {...linkProps} className={cx('text-xs')}>
              <span className="text-muted hover:text-brand">
                {full ? address : short}
              </span>
            </Link>
          </Copyable>
        </HStack>
      </Root>
    );
  },
});

const styles = tv({
  slots: {
    root: '',
    prefix: 'text-sm text-secondary',
    address: 'text-sm text-muted mt-px',
  },
});
