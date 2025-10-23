import { Box, Button, Link, Text } from '@fuels/ui';

export function MobileWarning() {
  return (
    <Box className="flex flex-col items-center justify-center p-6 text-center min-h-[400px]">
      <Text className="text-lg text-gray-500 max-w-md">
        This app is currently available only on desktop devices (computers and
        laptops); a mobile version is coming soon.
      </Text>
      <Box className="mt-8">
        <Button variant="outline">
          <Link href="/">Go to Explorer</Link>
        </Button>
      </Box>
    </Box>
  );
}
