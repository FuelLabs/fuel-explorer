import { HStack, Text, Copyable, Link, shortAddress } from '@fuels/ui';
import { IconExternalLink } from '@tabler/icons-react';
import NextLink from 'next/link';
import type { ReactNode } from 'react';

type AccountAddressProps = {
  id: string;
  label?: string;
  link?: (id: string) => string;
  linkLabel?: ReactNode;
  full?: boolean;
};

export function Address({
  id,
  full,
  label,
  link,
  linkLabel = <IconExternalLink size={15} />,
}: AccountAddressProps) {
  return (
    <HStack gap="2" align="center">
      {label && <Text className="text-sm text-secondary">{label}:</Text>}
      <Copyable value={id} className="text-sm text-muted" iconSize={16}>
        {full ? id : shortAddress(id)}
      </Copyable>
      {link && (
        <Link asChild className="text-xs">
          <NextLink href={link(id)}>{linkLabel}</NextLink>
        </Link>
      )}
    </HStack>
  );
}
