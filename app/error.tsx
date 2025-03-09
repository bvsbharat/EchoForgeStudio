'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#141414] text-white p-4">
      <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-[#89898a] mb-6">
        An error occurred while rendering the page.
      </p>
      <Button
        onClick={reset}
        className="bg-[#3b8c7c] hover:bg-[#327a6b] text-white"
      >
        Try again
      </Button>
    </div>
  );
}
