import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

const layout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default layout;
