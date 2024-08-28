import { HStack, Text } from '@fuels/ui';

export default function NFTProfileHolderIcon() {
  return (
    <HStack gap="3" className="items-center">
      <img
        src="https://s3-alpha-sig.figma.com/img/abc1/b884/2bc5b382f27c5f6e4b46874fa1adf246?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IIZ6yqtcWOP0ZqSPyQMnYp0Lja7Of2PZ5WeAZlsUovtGIgFsGVtC2OJtMDFaaxG83gaSUBrDAY835BS9z9AiiNJ8FTkWPq8tpBI7dlGjHRp2XSEpmFc6Me5ilTjYhKa8gNcTV68zC~LrgURk3RdbUaMP1eO~rPZohP4bx0gzKvUtRcj5jJ3Gfca32ItX06Pg6V8SV5DVkAfAFgNhLjpMVPf-vMoNsB4bXR8MnersUuSKZhBAUUySeSBQVWVzkvWpKcbi8lSJ4-bJiXRcNHE0nglojqD0zsFNqredtauOJ-WvO6jTIqpvO~AU8HR1-tc9wXJQIcF8BNOZYfBIQ4fnlg__"
        alt="profile_image"
        className="h-7 w-7 rounded-full"
      />
      <Text className="font-mono font-semibold text-sm">0x52....13d1</Text>
    </HStack>
  );
}
