import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Card(props: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={props.onClick}
      className={twMerge(
        'bg-white px-4 py-3 rounded-xl shadow',
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
