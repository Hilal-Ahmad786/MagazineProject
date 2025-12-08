import { cn } from '@/lib/utils/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-mazhar-light-grey dark:bg-mazhar-grey',
        className
      )}
    />
  )
}
