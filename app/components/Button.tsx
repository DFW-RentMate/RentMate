'use client';

import { MouseEventHandler } from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  icon?: IconType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  small?: boolean;
  outline?: boolean;
}

const Button = ({
  label,
  disabled,
  icon: Icon,
  onClick,
  small,
  outline,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
          flex items-center justify-center gap-1
          disabled:opacity-70 
          disabled:cursor-not-allowed 
          rounded-lg 
          hover:opacity-80 
          transition 
          
          ${outline ? 'bg-white' : 'bg-primary'}
          ${outline ? 'text-neutral-600' : 'text-white'}
          ${outline ? 'border border-neutral-300' : ''}
          ${small ? 'w-35 px-4 py-3 text-sm font-semibold' : 'w-70 py-3 px-20 text-md font-bold'}
          `}
    >
      {label}
      {Icon && <Icon />}
    </button>
  );
};

export default Button;
