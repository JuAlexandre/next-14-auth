import * as React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

export function FormError({ message }: { message?: string | null }) {
  if (!message) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <FaExclamationTriangle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
}
