import { HStack, Text } from '@fuels/ui';

export default function NFTProfileIcon() {
  return (
    <HStack gap="3" className="items-center">
      <img
        src="https://s3-alpha-sig.figma.com/img/4c74/ad78/93f71c0690747dda8a9cf38e2ed1254e?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gdfOZDgXAZkPsrVPBDiFtaj1VflA89gXMtJu2sTcCDAu7DeSh77QuIIU0NuG6yc5S9oN2f6lASilH7UhONL9ylDsxnSdo7ofrWDvEhWmZCPt5xBabocpTnhck4o~fgxi7aK0EK3~a7QB1dFWeIsF5~JwYM59Wfg90eizeuY4W2~BSCWDzusLZ9POfThCLbzoQFkQWadAfYBuJdeMqtK5~350kvOrB8B2s9FNIWflP3E4vdnDzXh32GqyezeVg8-MqMyMTWr5IxmCxO6ddY-sQox4XOdQ-BMyvS3Wgvw~j1EJeR0dOmbMsVmCz~3iVU4td9TdBEZ~rBZo~J55UQcZuA__"
        alt="profile_image"
        className="h-7 w-7 rounded"
      />
      <Text className="font-mono font-semibold text-sm"> DeGod #5990</Text>
    </HStack>
  );
}
