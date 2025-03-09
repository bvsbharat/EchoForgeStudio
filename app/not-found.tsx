import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#141414] text-white p-4">
      <h2 className="text-xl font-bold mb-4">Page Not Found</h2>
      <p className="text-[#89898a] mb-6">
        The page you are looking for does not exist.
      </p>
      <Link href="/">
        <Button className="bg-[#3b8c7c] hover:bg-[#327a6b] text-white">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
