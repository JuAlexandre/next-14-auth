'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { logout } from '@/lib/logout';
import { useCurrentUser } from '@/hooks/use-current-user';

const Page = () => {
  const user = useCurrentUser();
  console.log(user);

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      {user?.image && (
        <Image
          src={user.image}
          alt="Avatar"
          width={100}
          height={100}
          className="rounded-full mb-5"
        />
      )}
      <p>{user?.email}</p>
      <p>{user?.name}</p>
      <p>{user?.role}</p>

      <Button className="mt-3" onClick={async () => await logout()}>
        Logout
      </Button>
    </main>
  );
};

export default Page;
