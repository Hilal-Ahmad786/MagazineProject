'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, resize = 'vertical', id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-neutral-300 mb-2"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'w-full px-4 py-3 bg-neutral-900 border rounded-lg text-white placeholder:text-neutral-500',
            'focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500',
            'transition-colors duration-200',
            'min-h-[120px]',
            resizeClasses[resize],
            error
              ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500'
              : 'border-neutral-800 hover:border-neutral-700',
            props.disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
