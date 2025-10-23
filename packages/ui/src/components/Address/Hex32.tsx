import { type ReactNode, useMemo, useState } from 'react';
import { tv } from 'tailwind-variants';

import { createComponent } from '../../utils/component';
import { cx } from '../../utils/css';
import type { BaseProps, WithAsProps } from '../../utils/types';
import { HStack } from '../Box';
import { Copyable } from '../Copyable';
import type { LinkProps } from '../Link';
import { Link } from '../Link';
import { LoadingBox } from '../LoadingBox';
import { LoadingWrapper } from '../LoadingWrapper';
import { Text } from '../Text';

import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import type { UseFuelAddressOpts } from './useFuelAddress';
import { useFuelAddress } from './useFuelAddress';

export type Hex32BaseProps = {
  value?: string;
  prefix?: ReactNode;
  full?: boolean;
  addressOpts?: UseFuelAddressOpts;
  isAccount?: boolean;
  linkProps?: Hex32LinkProps;
  isLoading?: boolean;
  iconSize?: number;
};

export type Hex32LinkProps = Omit<LinkProps, 'children'>;
export type Hex32Props = BaseProps<Hex32BaseProps> & WithAsProps;

const Hex32Span = ({
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

export const Hex32 = createComponent<Hex32Props, 'div'>({
  id: 'Hex32',
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
      ...props
    },
  ) => {
    const classes = styles();
    const { address, short } = useFuelAddress(value || '', {
      ...addressOpts,
      isAccount,
    });
    const [format, setFormat] = useState('hex');
    const decAddress = useMemo(() => {
      return `${Number.parseInt(address, 16)}`;
    }, [address]);
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
              <Dropdown>
                <Dropdown.Trigger>
                  <Button radius="full" variant="ghost" color="gray" size="1">
                    {format}
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item onClick={() => setFormat('hex')}>
                    hex
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFormat('dec')}>
                    dec
                  </Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
              {format === 'hex' && (
                <Copyable
                  value={address}
                  className={classes.address()}
                  iconSize={iconSize}
                >
                  {linkProps ? (
                    <Link
                      {...linkProps}
                      className={cx('text-xs text-sm')}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Hex32Span
                        full={full}
                        address={address}
                        short={short}
                        className="text-link"
                      />
                    </Link>
                  ) : (
                    <Hex32Span
                      full={full}
                      address={address}
                      short={short}
                      className="text-muted"
                    />
                  )}
                </Copyable>
              )}
              {format === 'dec' && (
                <Copyable
                  value={decAddress}
                  className={classes.address()}
                  iconSize={iconSize}
                >
                  <Text className="text-xs text-secondary font-mono">
                    {decAddress}
                  </Text>
                </Copyable>
              )}
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
    prefix: 'mr-px text-sm text-secondary',
    address: 'text-sm text-muted mt-px gap-3',
  },
});
