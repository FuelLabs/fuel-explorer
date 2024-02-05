import { TxScreenSimple } from "./TxScreenSimple";

export function TxScreenLoader() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TxScreenSimple isLoading transaction={{} as any} />;
}
