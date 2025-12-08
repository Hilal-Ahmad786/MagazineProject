import Image from 'next/image'
import { cn } from '@/lib/utils/cn'

interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Avatar({ src, alt, size = 'md', className }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }

  return (
    <div className={cn('relative rounded-full overflow-hidden', sizeClasses[size], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  )
}
