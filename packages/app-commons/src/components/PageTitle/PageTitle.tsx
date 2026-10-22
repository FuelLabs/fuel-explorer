import {
  Flex,
  HStack,
  type HStackProps,
  SectionTitle,
  Text,
  cx,
} from '@fuels/ui';

export type PageTitleProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  subtitle?: React.ReactNode;
  inverse?: boolean;
  mb?: HStackProps['mb'];
  className?: string;
  /** Use h2 when the page already has its own h1. */
  as?: 'h1' | 'h2';
};

export const DEFAULT_PAGETITLE_MB: HStackProps['mb'] = '7';

export function PageTitle({
  title,
  children,
  subtitle,
  className,
  inverse = false,
  mb = DEFAULT_PAGETITLE_MB,
  as = 'h1',
}: PageTitleProps) {
  return (
    <HStack
      justify="between"
      mb={mb}
      className={cx(as === 'h1' && 'pt-6', className)}
    >
      <Flex gap="2" direction={inverse ? 'column-reverse' : 'column'}>
        <SectionTitle as={as} className="min-h-[34px]">
          {title}
        </SectionTitle>
        {subtitle && (
          <Text as="div" size="2" className="text-[var(--fuel-element-low-em)]">
            {subtitle}
          </Text>
        )}
      </Flex>

      {children}
    </HStack>
  );
}
