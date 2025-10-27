import { Alert, HStack, Text } from '@fuels/ui';
import { IconInfoCircleFilled } from '@tabler/icons-react';

interface PausedContractAlertProps {
  name: string;
}

export const PausedContractAlert = ({ name }: PausedContractAlertProps) => {
  return (
    <Alert
      variant="soft"
      color="gray"
      size="3"
      className="border border-gray-6"
    >
      <HStack align="center" gap="2">
        <Alert.Icon>
          <IconInfoCircleFilled className="text-orange-11 w-5 h-5" />
        </Alert.Icon>
        <Text weight="medium" size="3" className="text-gray-12">
          Operations are temporarily paused.
        </Text>
      </HStack>

      <Text
        weight="regular"
        size="3"
        className="text-gray-11 dark:text-[rgba(246,243,226,0.5)]"
      >
        The {name} module is currently being updated.
      </Text>

      <Text
        size="3"
        weight="medium"
        className="text-gray-12 dark:text-[#F6F3E2]"
      >
        No action is needed from your side.
      </Text>
    </Alert>
  );
};
