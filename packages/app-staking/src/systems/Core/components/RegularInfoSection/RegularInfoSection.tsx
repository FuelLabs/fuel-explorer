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
      <Text weight="medium" className="text-gray-10 text-sm">
        {header}
      </Text>
      <HStack gap="2" align="center">
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={loadingEl || <LoadingBox className="w-36 h-5" />}
          regularEl={
            <>
              {icon || null}
              <HStack gap="1" align="center">
                <Text weight="medium" className="text-heading text-base">
                  {text}
                </Text>
                <Text
                  weight="medium"
                  className="text-gray-10 text-sm leading-tight"
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
