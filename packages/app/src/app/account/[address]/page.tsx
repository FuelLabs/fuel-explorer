import { redirect } from 'next/navigation';

export default async function main({
  params: { address },
}: {
  params: { address: string };
}) {
  redirect(`/account/${address}/assets`);
}

export const revalidate = Infinity;
