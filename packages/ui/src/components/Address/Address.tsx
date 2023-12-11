import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

import { useBreakpoints } from '../../hooks/useBreakpoints';
import { createComponent } from '../../utils/component';
import { cx } from '../../utils/css';
import type { BaseProps, WithAsProps } from '../../utils/types';
import { HStack } from '../Box';
import { Copyable } from '../Copyable';
import type { LinkProps } from '../Link';
import { Link } from '../Link';
import { LoadingBox } from '../LoadingBox';
import { LoadingWrapper } from '../LoadingWrapper';

import type { UseFuelAddressOpts } from './useFuelAddress';
import { useFuelAddress } from './useFuelAddress';

export type AddressBaseProps = {
  value?: string;
  prefix?: ReactNode;
  full?: boolean;
  addressOpts?: UseFuelAddressOpts;
  fixed?: UseFuelAddressOpts['fixed'];
  linkProps?: AddressLinkProps;
  isLoading?: boolean;
  iconSize?: number;
};

export type AddressLinkProps = Omit<LinkProps, 'children'>;
export type AddressProps = BaseProps<AddressBaseProps> & WithAsProps;

export const Address = createComponent<AddressProps, 'div'>({
  id: 'Address',
  render: (
    _,
    {
      value,
      full,
      iconSize = 16,
      fixed,
      prefix,
      className,
      addressOpts,
      linkProps,
      isLoading,
      ...props
    },
  ) => {
    const classes = styles();
    const { address, short } = useFuelAddress(value || '', {
      ...addressOpts,
      fixed,
    });

    const { isMobile } = useBreakpoints();
    const isFull = isMobile ? false : full;

    return (
      <HStack
        gap="3"
        align="center"
        {...props}
        className={classes.root({ className })}
      >
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="w-32 h-5 mt-1" />}
          regularEl={
            <HStack align="center" gap="1">
              {prefix && <span className={classes.prefix()}>{prefix}</span>}
              <Copyable
                value={address}
                className={classes.address()}
                iconSize={iconSize}
              >
                {linkProps ? (
                  <Link
                    {...linkProps}
                    className={cx('text-xs text-[1em]')}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <span className="text-[1em] text-link">
                      {isFull ? address : short}
                    </span>
                  </Link>
                ) : (
                  <span className="text-muted text-[1em]">
                    {isFull ? address : short}
                  </span>
                )}
              </Copyable>
            </HStack>
          }
        />
      </HStack>
    );
  },
});

const styles = tv({
  slots: {
    root: 'flex gap-1 text-sm font-mono',
    prefix: 'mr-px text-[1em] text-secondary',
    address: 'text-[1em] text-muted mt-px gap-3',
  },
});
