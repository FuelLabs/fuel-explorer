'use client';

import { Alert, Text } from '@fuels/ui';
import { IconAlertTriangle } from '@tabler/icons-react';

export const MaintenanceBanner = () => {
  return (
    <Alert
      color="orange"
      size="1"
      variant="surface"
      className="rounded-none justify-center"
    >
      <Alert.Icon>
        <IconAlertTriangle className="text-orange-12" />
      </Alert.Icon>
      <Text className="text-orange-12">
        The network is undergoing a scheduled migration today starting 17:30
        UTC. We expect it to be up again shortly.
      </Text>
    </Alert>
  );
};
