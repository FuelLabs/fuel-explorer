import { IconChevronRight } from '@tabler/icons-react';
import { Children } from 'react';

import { tv } from 'tailwind-variants';
import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';
import { Icon } from '../Icon/Icon';
import { Link } from '../Link/Link';
import type { LinkProps } from '../Link/Link';

export type BreadcrumbProps = PropsOf<'ul'>;
export type BreadcrumbItemProps = PropsOf<'li'>;
export type BreadcrumbLinkProps = LinkProps;

const styles = tv({
  slots: {
    root: 'flex gap-4 items-stretch *:flex *:items-center',
    link: 'inline-flex',
  },
});

export const BreadcrumbRoot = createComponent<BreadcrumbProps, 'ul'>({
  id: 'Breadcrumb',
  className: ({ className }) => styles().root({ className }),
  render: (_, { children, ...props }) => {
    const newChildren = Children.toArray(children).flatMap((child, index) => {
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
    return <ul {...props}>{newChildren}</ul>;
  },
});

export const BreadcrumbItem = createComponent<BreadcrumbItemProps, 'li'>({
  id: 'BreadcrumbItem',
  baseElement: 'li',
});

export const BreadcrumbLink = createComponent<BreadcrumbLinkProps, typeof Link>(
  {
    id: 'BreadcrumbLink',
    className: ({ className }) => styles().link({ className }),
    baseElement: Link,
  },
);

export const Breadcrumb = withNamespace(BreadcrumbRoot, {
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
});
