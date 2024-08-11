import { RoundedContainer } from '@fuels/ui';

export const LatestBlock = () => {
  return (
    <RoundedContainer className="py-4 px-5 space-y-[24px] bg-light-gradient dark:bg-dark-gradient">
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] leading-[24px] text-heading font-semibold">
            Latest Block
          </h3>
          <span className="text-[13px] leading-[20px] text-muted block">
            2s Ago
          </span>
        </div>
        <h2 className="text-[32px] leading-[36px] text-heading font-bold">
          1,960,152
        </h2>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[8px]">
          <img
            className="w-[16px] h-[16px] rounded-[4px] overflow-hidden"
            src="https://s3-alpha-sig.figma.com/img/404f/e544/a721b4897fea63c5007fea0819a062e4?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HQ4U-6SV-6Neqns-0oAsAQiV26pnff609Srfd-PFdNQJvjOH7t7CfkNNoA90jzSdyELyRALWQfQAf5yrQAdKzz-yLKDg1A5Y7VpRN5ZRnR6~eHBGovRzDEdLtiHSRRY04fTUR~DN6RAXpPZBwnporoqKgk3ntoYvskkkEl56Hn1WUYhnfM3OtgqaZu327f39qdvO3VZudMUpVLxOWVk92ky4USKXEmu1AA9Y1luOexzTNyqQdabjaLQbr5zF-hPZtQV-pKHIKBCewNvhGiMp8hVU~XXnCcJvMvI9AaI~fZnq~6frNAAQEN9c22usX3kIwmTy9qoOXqzqFcOxoW4PGQ__"
            alt=""
          />

          <p className="w-full max-w-[144px] line-clamp-1 text-[13px] leading-[20px] text-muted">
            DUND26mEDfFeaPsVof3YvbXDRvpuQX7HMUJrLgEWzYw4
          </p>
        </div>
        <p className=" line-clamp-1 text-[13px] leading-[20px] text-muted">
          0.008293100 ETH
        </p>
      </div>
    </RoundedContainer>
  );
};
