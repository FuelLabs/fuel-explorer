import _ from 'lodash';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

import { createComponent } from '../../utils/component';
import { cx } from '../../utils/css';
import type { BaseProps, WithAsProps } from '../../utils/types';
import { HStack } from '../Box';
import { Copyable } from '../Copyable';
import type { LinkProps } from '../Link';
import { Link } from '../Link';

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

const AddressSpan = ({
  address,
  short,
  full,
  className,
}: {
  full?: boolean;
  address: string;
  short: string;
  className?: string;
}) => {
  const baseClass = cx(['text-[1em]', className]);
  return (
    <>
      {full && (
        <span className={cx(baseClass, 'mobile:max-laptop:hidden')}>
          {address}
        </span>
      )}
      <span
        className={cx(baseClass, {
          'laptop:hidden': full,
        })}
      >
        {short}
      </span>
    </>
  );
};

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
          {prefix && <span className={classes.prefix()}>{prefix}</span>}
          <Copyable value={address} className={classes.address()} iconSize={16}>
            {linkProps ? (
              <Link
                {...linkProps}
                className={cx('text-xs text-[1em]')}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <AddressSpan
                  full={full}
                  address={address}
                  short={short}
                  className="text-link"
                />
              </Link>
            ) : (
              <AddressSpan
                full={full}
                address={address}
                short={short}
                className="text-muted"
              />
            )}
          </Copyable>
        </HStack>
      </Root>
    );
  },
});

const styles = tv({
  slots: {
    root: 'text-sm font-mono',
    prefix: 'mt-[1px] text-[1em] text-secondary',
    address: 'text-[1em] text-muted mt-px',
  },
});
