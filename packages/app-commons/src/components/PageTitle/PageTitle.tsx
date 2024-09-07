'use client';
import { Flex, HStack, HStackProps, Text } from '@fuels/ui';

export type PageTitleProps = {
  title: string;
  children?: React.ReactNode;
  subtitle?: React.ReactNode;
  inverse?: boolean;
  mb?: HStackProps['mb'];
};

export function PageTitle({
  title,
  children,
  subtitle,
  inverse = false,
  mb = '7',
}: PageTitleProps) {
  return (
    <HStack justify="between" mb={mb}>
      <Flex gap="2" direction={inverse ? 'column-reverse' : 'column'}>
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
