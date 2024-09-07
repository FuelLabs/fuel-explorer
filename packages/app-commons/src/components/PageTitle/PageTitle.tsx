'use client';
import { Flex, HStack, Text } from '@fuels/ui';

export type PageTitleProps = {
  title: string;
  children?: React.ReactNode;
  subtitle?: React.ReactNode;
  inverse?: boolean;
};

export function PageTitle({
  title,
  children,
  subtitle,
  inverse = false,
}: PageTitleProps) {
  return (
    <HStack justify="between" mb="7">
      <Flex gap="1" direction={inverse ? 'column-reverse' : 'column'}>
        <Text as="h1" className="font-mono" size="5">
          {title}
        </Text>
        {subtitle && (
          <Text as="div" color="gray" size="2">
            {subtitle}
          </Text>
        )}
      </Flex>

      {children}
    </HStack>
  );
}
