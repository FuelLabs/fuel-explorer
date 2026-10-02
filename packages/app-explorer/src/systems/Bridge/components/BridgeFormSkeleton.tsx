import { LoadingBox } from '@fuels/ui';

// Heights match the loaded form: banner, title row, tabs, network, amount, terms and button, callout.
export function BridgeFormSkeleton() {
  return (
    <div aria-hidden className="mx-auto flex w-full max-w-[520px] flex-col">
      <LoadingBox className="h-[84px] w-full" />
      <LoadingBox className="mt-8 h-[34px] w-full" />
      <div className="mt-7 flex flex-col gap-4">
        <LoadingBox className="h-9 w-full" />
        <LoadingBox className="h-[236px] w-full" />
        <LoadingBox className="h-[152px] w-full" />
        <LoadingBox className="h-[72px] w-full" />
        <LoadingBox className="h-[92px] w-full" />
      </div>
    </div>
  );
}
