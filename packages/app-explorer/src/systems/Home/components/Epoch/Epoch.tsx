import { RoundedContainer } from '@fuels/ui';

const Epoch = () => {
  return (
    <RoundedContainer className="py-4 px-5">
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] leading-[24px] text-white font-semibold">
            Current EPOCH
          </h3>
        </div>
        <h2 className="text-[32px] leading-[36px] text-white font-bold">657</h2>
      </div>
      <div className="mt-[8px]">
        <div className="w-full h-[8px] rounded-full bg-white/10">
          <div className="w-[55%] h-full bg-brand rounded-full" />
        </div>
      </div>

      <div className="text-[14px] leading-[24px] text-white font-semibold mt-[8px]">
        0d 15h 32m 30s
      </div>
    </RoundedContainer>
  );
};

export default Epoch;
