import { HStack } from '@fuels/ui';
import BlockHashItem from '../BlockHashItem/BlockHashItem';

type BlockValidatorItemProps = {
  hashAddress: string;
};

export default function BlockValidatorItem({
  hashAddress,
}: BlockValidatorItemProps) {
  return (
    <HStack gap="2" width={'100px'} flexBasis={'100%'}>
      <img
        alt="token-image"
        className="h-6 w-6 rounded-mg"
        src="https://s3-alpha-sig.figma.com/img/e277/e70a/7d31d7c806a31e7b6d3b103fcc13c7b0?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W8NXFXFRXFo95uObTjxmaUI9BJf8uyaLK-QKg4ZI8sFQopN4p8vJSAviLMYMGNTi4Qzk7FJw~MPTefqGBZoeKa7OyG6yc1DZzS9qFyTHKvX82Wm2cP7eEyzd6l4Ru~qKfMAelUrO8ssCoN7BJUG~VxdojaAYoUTaNQts2WxFGtkv-VNYRQReA9es8OQInZit-GDT9WonuJAVk5TZj2LyOvBCgjwVuVJuf0qov9zDlCp26fmFOYZGPFgh~67-CIGNAlbM1762y9BSfTJ2SLxNDnj~9Ii7jUf48FChcHk7AhGBSLKpJyPW1mkYrmvY1pY48mcR7AXaCElsydXkUpthqQ__"
      />
      <BlockHashItem hashAddress={hashAddress} width="100px" />
    </HStack>
  );
}
