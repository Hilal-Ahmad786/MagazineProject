import { cn } from '@/lib/utils/cn'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-1">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-3 py-2 border rounded-sm',
            'focus:outline-none focus:ring-2 focus:ring-mazhar-bronze',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
