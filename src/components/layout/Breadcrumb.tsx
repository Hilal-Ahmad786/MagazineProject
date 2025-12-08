import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center gap-2 text-sm text-mazhar-grey', className)}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-mazhar-bronze">
              {item.label}
            </Link>
          ) : (
            <span className="text-mazhar-dark dark:text-mazhar-cream">{item.label}</span>
          )}
          {index < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  )
}
