import { Card, Flex, Text, VStack } from '@fuels/ui';
import { IconArrowUpRight } from '@tabler/icons-react';

export const LayerSwapBanner = () => {
  return (
    <Card
      className="w-full mb-8 cursor-pointer py-3 relative"
      onClick={() => {
        window.open('https://app.layerswap.io/app', '_blank');
      }}
    >
      <Card.Body className="pl-3 pr-9">
        <Flex>
          <IconArrowUpRight
            size={24}
            stroke={1}
            color="gray"
            className="absolute top-2 right-2"
          />
          <Flex
            className="rounded-full bg-gray-1 inline-flex max-w-[60px] max-h-[60px] min-w-[60px] min-h-[60px] border border-gray-8"
            align="center"
            justify="center"
          >
            <img
              alt="LayerSwap Logo"
              height={30}
              src="/projects/layerswap.svg"
              width={30}
            />
          </Flex>
          <VStack className="ml-4" justify="center" gap="2">
            <Text className="text-gray-11 leading-3">
              Enjoy <b>Fast Bridging</b> to Fuel Ignition by using{' '}
              <b>LayerSwap</b>
            </Text>
          </VStack>
        </Flex>
      </Card.Body>
    </Card>
  );
};
