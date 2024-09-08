import { Link } from '@fuels/ui';

export function PointsProgramEyebrow() {
  return (
    <div className="w-full z-10 bg-[#26d07c] py-1 px-4 text-center text-black text-xs tablet:text-sm">
      Points Program: Earn rewards and contribute to the Fuel Network.
      <Link
        href="https://app.fuel.network/earn-points"
        className="ml-1 text-[#0828a3] gap-1 text-xs tablet:text-sm"
        isExternal={false}
      >
        Learn more →
      </Link>
    </div>
  );
}
