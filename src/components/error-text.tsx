import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function ErrorText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={twMerge('mt-2 text-sm text-red-500', className)}>
      {children}
    </p>
  );
}
