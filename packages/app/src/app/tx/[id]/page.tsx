import { redirect } from 'next/navigation';

export default async function main({
  params: { id },
}: {
  params: { id: string };
}) {
  redirect(`/tx/${id}/simple`);
}
