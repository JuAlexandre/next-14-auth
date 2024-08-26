import { ModeToggle } from '@/components/toggle-theme';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = () => {
  return (
    <main className="w-full h-screen flex flex-col p-10">
      <div className="self-end">
        <ModeToggle />
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center space-y-6">
        <h1 className="font-bold text-5xl tracking-tighter">Welcome!</h1>
        <Button size="lg">
          <Link href={'/sign-in'}>Login</Link>
        </Button>
      </div>
    </main>
  );
};

export default page;
