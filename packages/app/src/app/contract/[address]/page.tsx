import { redirect } from 'next/navigation';

export default async function main({
  params: { address },
}: {
  params: { address: string };
}) {
  redirect(`/contract/${address}/assets`);
}
