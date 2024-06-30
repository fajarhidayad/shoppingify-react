import { ReactNode } from '@tanstack/react-router';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Button(props: {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
  type?: 'submit' | 'button';
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
}) {
  return (
    <button
      type={props.type}
      className={twMerge(
        clsx({
          'font-bold rounded-xl p-5 text-white': true,
          'bg-primary': props.variant === 'primary',
          'bg-lblue': props.variant === 'secondary',
          'bg-red-500': props.variant === 'danger',
          'text-slate-800 hover:bg-gray-200': props.variant === 'ghost',
        }),
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
