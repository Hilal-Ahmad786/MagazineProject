import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-yellow-400 text-black hover:bg-white hover:translate-x-1': variant === 'primary',
            'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black': variant === 'secondary',
            'bg-transparent text-white hover:text-yellow-400': variant === 'ghost',
          },
          {
            'px-4 py-2 text-xs': size === 'sm',
            'px-8 py-3 text-sm': size === 'md',
            'px-10 py-4 text-sm': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
