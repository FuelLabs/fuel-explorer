'use client';

import { Alert, Text } from '@fuels/ui';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const MAINTENANCE_START = Date.UTC(2026, 3, 13, 17, 30); // April 13, 2026 17:30 UTC
const AUTO_HIDE_AFTER_MS = 60 * 60 * 1000; // 1 hour after start time

export const MaintenanceBanner = () => {
  const [visible, setVisible] = useState(
    () => Date.now() < MAINTENANCE_START + AUTO_HIDE_AFTER_MS,
  );

  useEffect(() => {
    const remaining = MAINTENANCE_START + AUTO_HIDE_AFTER_MS - Date.now();
    if (remaining <= 0) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(false), remaining);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

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
        UTC. We expect to be back up shortly.
      </Text>
    </Alert>
  );
};
