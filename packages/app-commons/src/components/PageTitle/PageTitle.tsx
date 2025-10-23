import { Flex, HStack, type HStackProps, Text } from '@fuels/ui';

export type PageTitleProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  subtitle?: React.ReactNode;
  inverse?: boolean;
  mb?: HStackProps['mb'];
  className?: string;
};

export const DEFAULT_PAGETITLE_MB: HStackProps['mb'] = '7';

export function PageTitle({
  title,
  children,
  subtitle,
  className,
  inverse = false,
  mb = DEFAULT_PAGETITLE_MB,
}: PageTitleProps) {
  return (
    <HStack justify="between" mb={mb} className={className}>
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
