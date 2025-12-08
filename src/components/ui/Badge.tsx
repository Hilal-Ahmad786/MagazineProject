import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider',
          {
            'bg-yellow-400 text-black': variant === 'default',
            'bg-green-500 text-black': variant === 'success',
            'bg-orange-500 text-black': variant === 'warning',
            'bg-red-500 text-white': variant === 'error',
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
