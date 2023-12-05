'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type PrefetchRoutesProps = {
  routes: string[];
};

export function PrefetchRoutes({ routes }: PrefetchRoutesProps) {
  const router = useRouter();

  useEffect(() => {
    console.log(routes);
    routes.map((route) => router.prefetch(route));
  }, [routes.toString()]);

  return null;
}
