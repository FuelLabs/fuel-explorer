import {
  IconExternalLink,
  IconGridScan,
  IconLineScan,
} from '@tabler/icons-react';
import type { ReactNode, SyntheticEvent } from 'react';
import { tv } from 'tailwind-variants';

import { useBreakpoints } from '../../hooks/useBreakpoints';
import { createComponent, withNamespace } from '../../utils/component';
import { cx } from '../../utils/css';
import type { BaseProps, WithAsProps } from '../../utils/types';
import { HStack } from '../Box';
import { Copyable } from '../Copyable';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton';
import type { LinkProps } from '../Link';
import { Link } from '../Link';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip/Tooltip';

import type { UseFuelAddressOpts } from './useFuelAddress';
import { useFuelAddress } from './useFuelAddress';

export type AddressBaseProps = {
  value?: string;
  prefix?: ReactNode;
  full?: boolean;
  addressOpts?: UseFuelAddressOpts;
  fixed?: UseFuelAddressOpts['fixed'];
  linkPos?: 'left' | 'right';
};

export type AddressProps = BaseProps<AddressBaseProps> & WithAsProps;
export type AddressLinkProps = Omit<LinkProps, 'children'> & {
  children?: ReactNode;
};

export const AddressRoot = createComponent<AddressProps, typeof HStack>({
  id: 'Address',
  baseElement: HStack,
  render: (
    Root,
    {
      value,
      linkPos = 'right',
      full,
      fixed,
      prefix,
      className,
      addressOpts,
      children,
      ...props
    },
  ) => {
    const classes = styles();
    const { isValid, isShowingB256, address, short, toggle } = useFuelAddress(
      value || '',
      { ...addressOpts, fixed },
    );

    const type = isShowingB256 ? 'Bech32' : 'HEX';
    const tooltipMsg = `Click to show ${type} address or press CMD+k to toggle all`;
    const isToggleable = isValid && !fixed;
    const { isMobile } = useBreakpoints();
    const isFull = isMobile ? false : full;

    function handleClick(e: SyntheticEvent) {
      e.stopPropagation();
      toggle();
    }

    return (
      <Root
        gap="3"
        align="center"
        {...props}
        className={classes.root({ className })}
      >
        {linkPos === 'left' && children}
        <HStack align="center" gap="1">
          {prefix && <span className={classes.prefix()}>{prefix}</span>}
          <Copyable value={address} className={classes.address()} iconSize={16}>
            {isToggleable ? (
              <Tooltip content={tooltipMsg}>
                <Text
                  as="button"
                  className="text-[1em] text-muted"
                  onClick={(e: SyntheticEvent) => {
                    handleClick(e);
                  }}
                >
                  {isFull ? address : short}
                </Text>
              </Tooltip>
            ) : (
              <span className="text-muted text-[1em]">
                {isFull ? address : short}
              </span>
            )}
          </Copyable>
        </HStack>
        {isToggleable && (
          <Tooltip content={tooltipMsg}>
            <IconButton
              data-active={!isShowingB256}
              icon={isShowingB256 ? IconLineScan : IconGridScan}
              variant="link"
              color="gray"
              iconSize={16}
              className={classes.toggleBtn()}
              onClick={(e: SyntheticEvent) => {
                handleClick(e);
              }}
            />
          </Tooltip>
        )}
        {linkPos === 'right' && children}
      </Root>
    );
  },
});

export const AddressLink = createComponent<AddressLinkProps, typeof Link>({
  id: 'AddressLink',
  render: (_, { className, children, ...props }) => {
    return (
      <Link
        {...props}
        className={cx('text-xs', className)}
        onClick={(e: SyntheticEvent) => {
          e.stopPropagation();
        }}
      >
        {children ?? <Icon icon={IconExternalLink} size={16} />}
      </Link>
    );
  },
});

export const Address = withNamespace(AddressRoot, {
  Link: AddressLink,
});

const styles = tv({
  slots: {
    root: 'text-sm',
    prefix: 'mt-[1px] text-[1em] text-secondary',
    address: 'text-[1em] text-muted mt-px',
    toggleBtn: [
      'transition-all duration-500 text-muted rotate-0',
      'data-[active=true]:rotate-180',
    ],
  },
});
