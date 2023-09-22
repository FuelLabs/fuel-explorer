import { IconChevronRight } from '@tabler/icons-react';
import { Children } from 'react';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';
import { HStack } from '../Box';
import type { HStackProps } from '../Box';
import { Icon } from '../Icon/Icon';
import { Link } from '../Link/Link';
import type { LinkProps } from '../Link/Link';

export type BreadcrumbProps = PropsOf<'ul'> & Omit<HStackProps, 'asChild'>;
export type BreadcrumbItemProps = PropsOf<'li'>;
export type BreadcrumbLinkProps = LinkProps;

export const BreadcrumbRoot = createComponent<BreadcrumbProps, 'ul'>({
  id: 'Breadcrumb',
  baseElement: 'ul',
  render: (Comp, { children, ...props }) => {
    const newChildren = Children.toArray(children).flatMap((child, index) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const id = (child as any)?.type?.id;
      if (id !== 'BreadcrumbItem' && id !== 'BreadcrumbLink') {
        throw new Error(
          'Breadcrumb only accepts Breadcrumb.Item or Breadcrumb.Link as children',
        );
      }

      const count = Children.count(children);
      if (index < count - 1) {
        return [
          child,
          <li key={`icon:${index}`} className="fuel_Breadcrumb-divider">
            <Icon className="text-icon" icon={IconChevronRight} />
          </li>,
        ];
      }
      return child;
    });
    return (
      <HStack {...props} asChild>
        <Comp>{newChildren}</Comp>
      </HStack>
    );
  },
});

export const BreadcrumbItem = createComponent<BreadcrumbItemProps, 'li'>({
  id: 'BreadcrumbItem',
  baseElement: 'li',
});

export const BreadcrumbLink = createComponent<BreadcrumbLinkProps, typeof Link>(
  {
    id: 'BreadcrumbLink',
    baseElement: Link,
  },
);

export const Breadcrumb = withNamespace(BreadcrumbRoot, {
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
});
