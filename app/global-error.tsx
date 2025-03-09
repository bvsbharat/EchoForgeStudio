'use client';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#141414] text-white p-4">
          <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
          <p className="text-[#89898a] mb-6">
            An error occurred in the application.
          </p>
          <Button
            onClick={reset}
            className="bg-[#3b8c7c] hover:bg-[#327a6b] text-white"
          >
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
