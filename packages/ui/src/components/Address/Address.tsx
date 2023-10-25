import {
  IconExternalLink,
  IconGridScan,
  IconLineScan,
} from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

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

import { useFuelAddress } from './useFuelAddress';

export type AddressBaseProps = {
  value: string;
  prefix?: ReactNode;
  full?: boolean;
};

export type AddressProps = BaseProps<AddressBaseProps> & WithAsProps;
export type AddressLinkProps = Omit<LinkProps, 'children'> & {
  children?: ReactNode;
};

export const AddressRoot = createComponent<AddressProps, typeof HStack>({
  id: 'Address',
  baseElement: HStack,
  render: (Root, { value, full, prefix, className, children, ...props }) => {
    const classes = styles();
    const { isValid, isShowingB256, address, short, toggle } =
      useFuelAddress(value);

    const type = isShowingB256 ? 'Bech32' : 'HEX';
    const tooltipMsg = `Click to show ${type} address or press CMD+k to toggle all`;

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
            {isValid ? (
              <Tooltip content={tooltipMsg}>
                <Text
                  as="button"
                  className="text-sm text-muted"
                  onClick={toggle}
                >
                  {full ? address : short}
                </Text>
              </Tooltip>
            ) : (
              <span className="text-muted">{full ? address : short}</span>
            )}
          </Copyable>
        </HStack>
        {isValid && (
          <Tooltip content={tooltipMsg}>
            <IconButton
              data-active={!isShowingB256}
              icon={isShowingB256 ? IconLineScan : IconGridScan}
              variant="link"
              color="gray"
              iconSize={16}
              className={classes.toggleBtn()}
              onClick={toggle}
            />
          </Tooltip>
        )}
        {children}
      </Root>
    );
  },
});

export const AddressLink = createComponent<AddressLinkProps, typeof Link>({
  id: 'AddressLink',
  render: (_, { className, children, ...props }) => {
    return (
      <Link {...props} className={cx('text-xs', className)}>
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
    root: '',
    prefix: 'text-sm text-secondary',
    address: 'text-sm text-muted mt-px',
    toggleBtn: [
      'transition-all duration-500 text-muted rotate-0',
      'data-[active=true]:rotate-180',
    ],
  },
});
