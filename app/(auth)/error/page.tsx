'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

enum Error {
  Configuration = 'Configuration',
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{' '}
      <code className="text-xs bg-slate-100 p-1 rounded-sm">Configuration</code>
    </p>
  ),
};

export default function AuthErrorPage() {
  const search = useSearchParams();
  const error = search.get('error') as Error;

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="font-normal text-gray-700 dark:text-gray-400">
            {errorMap[error] || 'Please contact us if this error persists.'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
