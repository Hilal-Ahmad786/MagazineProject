import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-gray-800 relative overflow-hidden',
          hoverable && 'hover:bg-gray-700 transition-all duration-300 hover:scale-105',
          className
        )}
        {...props}
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400" />
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
