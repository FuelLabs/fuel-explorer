import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

import { createComponent } from '../../utils/component';
import { cx } from '../../utils/css';
import type { BaseProps, WithAsProps } from '../../utils/types';
import { Copyable } from '../Copyable';
import type { LinkProps } from '../Link';
import { Link } from '../Link';
import { LoadingBox } from '../LoadingBox';
import { LoadingWrapper } from '../LoadingWrapper';

import { Tooltip } from '@radix-ui/themes';
import type { UseFuelAddressOpts } from './useFuelAddress';
import { useFuelAddress } from './useFuelAddress';

export type AddressBaseProps = {
  value?: string;
  prefix?: ReactNode;
  full?: boolean;
  addressOpts?: UseFuelAddressOpts;
  isAccount?: boolean;
  linkProps?: AddressLinkProps;
  isLoading?: boolean;
  iconSize?: number;
  hideCopyable?: boolean;
};

export type AddressLinkProps = Omit<LinkProps, 'children'>;
export type AddressProps = BaseProps<AddressBaseProps> & WithAsProps;

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
  const baseClass = cx(['text-sm', className]);
  return (
    <>
      {full && (
        <span className={cx(baseClass, 'mobile:max-laptop:hidden')}>
          {address}
        </span>
      )}
      <span className={cx(baseClass, full && 'laptop:hidden')}>{short}</span>
    </>
  );
};

export const Address = createComponent<AddressProps, 'div'>({
  id: 'Address',
  render: (
    _,
    {
      value,
      full,
      iconSize = 16,
      isAccount,
      prefix,
      className,
      addressOpts,
      linkProps,
      isLoading,
      hideCopyable,
      children,
      ...props
    },
  ) => {
    const classes = styles();
    const { address, short } = useFuelAddress(value || '', {
      ...addressOpts,
      isAccount,
    });

    return (
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={<LoadingBox className="w-32 h-4 mt-1" />}
        regularEl={
          <div {...props} className={classes.root({ className })}>
            {prefix && <span className={classes.prefix()}>{prefix}</span>}
            <Tooltip content={value} open={full ? false : undefined}>
              <div>
                {linkProps ? (
                  <Link
                    {...linkProps}
                    className={cx('text-sm text-link', linkProps.className)}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <AddressSpan
                      full={full}
                      address={address}
                      short={short}
                      className="text-link underline"
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
              </div>
            </Tooltip>
            {children}
            {!hideCopyable && (
              <Copyable
                value={address}
                className={classes.address()}
                iconSize={iconSize}
              />
            )}
          </div>
        }
      />
    );
  },
});

const styles = tv({
  slots: {
    root: 'inline-flex flex-nowrap items-center gap-3 text-sm font-mono',
    prefix: 'mr-px text-sm text-secondary whitespace-nowrap',
    address: 'text-sm text-muted mt-px gap-3 shrink-0',
  },
});
