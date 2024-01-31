import { Button } from '@fuels/ui';
import Link from 'next/link';

export function ErrorPageComponent() {
  return (
    <div className="flex flex-col items-center justify-center py-8 tablet:py-16">
      <h1 className="text-[100px] font-mono font-extralight mb-4">404</h1>
      <h2 className="text-3xl font-medium">Page Not Found</h2>
      <p className="mt-4 text-center">
        The page you are looking for doesn&apos;t exist or an other error
        occurred.
      </p>
      <Button className="mt-6" variant="solid">
        <Link prefetch href="/">
          Go back to home
        </Link>
      </Button>
    </div>
  );
}
