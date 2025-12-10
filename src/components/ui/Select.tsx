'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5',
  lg: 'px-5 py-3 text-lg',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      hint,
      options,
      placeholder,
      size = 'md',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-neutral-300 mb-2"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full appearance-none bg-neutral-900 border rounded-lg text-white',
              'focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500',
              'transition-colors duration-200 cursor-pointer',
              'pr-10', // Space for chevron
              sizeClasses[size],
              error
                ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
                : 'border-neutral-800 hover:border-neutral-700',
              props.disabled && 'opacity-50 cursor-not-allowed',
              !props.value && placeholder && 'text-neutral-500',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-neutral-900 text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown className="w-5 h-5 text-neutral-500" />
          </div>
        </div>
        {hint && !error && (
          <p className="mt-2 text-sm text-neutral-500">{hint}</p>
        )}
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// Native select group component
interface SelectGroupProps {
  label: string;
  children: React.ReactNode;
}

export function SelectGroup({ label, children }: SelectGroupProps) {
  return (
    <optgroup label={label} className="bg-neutral-900 text-white">
      {children}
    </optgroup>
  );
}
