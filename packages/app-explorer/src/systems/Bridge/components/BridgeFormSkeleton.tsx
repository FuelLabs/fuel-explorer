import { LoadingBox } from '@fuels/ui';

// Heights match the loaded form: LayerSwap link, tabs row, network, amount, terms and button, callout.
export function BridgeFormSkeleton() {
  return (
    <div aria-hidden className="mx-auto flex w-full max-w-[520px] flex-col">
      <LoadingBox className="h-[18px] w-[240px]" />
      <LoadingBox className="mt-6 h-9 w-full" />
      <div className="mt-4 flex flex-col gap-4">
        <LoadingBox className="h-[160px] w-full" />
        <LoadingBox className="h-[88px] w-full" />
        <LoadingBox className="h-[72px] w-full" />
        <LoadingBox className="h-[48px] w-full" />
      </div>
    </div>
  );
}
