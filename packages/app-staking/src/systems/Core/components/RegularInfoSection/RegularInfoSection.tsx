import { Box, HStack, LoadingBox, LoadingWrapper, Text } from '@fuels/ui';
import type { ReactNode } from 'react';

interface RegularInfoSectionProps {
  header?: string | ReactNode;
  text?: string | ReactNode;
  textSupport?: string | ReactNode;
  icon?: ReactNode;
  isLoading?: boolean;
  loadingEl?: ReactNode;
}

export const RegularInfoSection = ({
  header,
  text,
  textSupport,
  icon,
  isLoading,
  loadingEl,
}: RegularInfoSectionProps) => {
  return (
    <Box className="flex flex-col gap-2">
      <span className="fuel-label">{header}</span>
      <HStack gap="2" align="center">
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={
            loadingEl || <LoadingBox className="w-36 h-5 !rounded-none" />
          }
          regularEl={
            <>
              {icon || null}
              <HStack gap="1" align="center">
                <Text weight="medium" className="text-heading text-[16px]">
                  {text}
                </Text>
                <Text
                  weight="medium"
                  className="text-[14px] leading-tight text-[var(--fuel-element-low-em)]"
                >
                  {textSupport}
                </Text>
              </HStack>
            </>
          }
        />
      </HStack>
    </Box>
  );
};
