'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  category: string;
  variant?: 'default' | 'outline' | 'solid' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

// Category color mapping
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Şiir': {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
  },
  'Hikaye': {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
  },
  'Deneme': {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/30',
  },
  'Eleştiri': {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/30',
  },
  'Söyleşi': {
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
  },
  'Çeviri': {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  'İnceleme': {
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    border: 'border-pink-500/30',
  },
  'Günlük': {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
  },
};

const defaultColors = {
  bg: 'bg-yellow-500/10',
  text: 'text-yellow-500',
  border: 'border-yellow-500/30',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export function CategoryBadge({
  category,
  variant = 'default',
  size = 'md',
  interactive = false,
  href,
  onClick,
  className,
}: CategoryBadgeProps) {
  const colors = categoryColors[category] || defaultColors;

  const baseClasses = cn(
    'inline-flex items-center justify-center font-medium rounded-full transition-all',
    sizeClasses[size],
    interactive && 'cursor-pointer hover:scale-105'
  );

  const variantClasses = {
    default: cn(colors.bg, colors.text),
    outline: cn('bg-transparent border', colors.text, colors.border),
    solid: cn('bg-yellow-500 text-neutral-900'),
    subtle: cn('bg-neutral-800', colors.text),
  };

  const combinedClasses = cn(baseClasses, variantClasses[variant], className);

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {category}
      </Link>
    );
  }

  // If onClick is provided, render as button
  if (onClick) {
    return (
      <button onClick={onClick} className={combinedClasses}>
        {category}
      </button>
    );
  }

  // Default: render as span
  return <span className={combinedClasses}>{category}</span>;
}

// Category filter list component
interface CategoryFilterProps {
  categories: string[];
  selected?: string | null;
  onChange?: (category: string | null) => void;
  showAll?: boolean;
  allLabel?: string;
  variant?: 'default' | 'outline' | 'pills';
  className?: string;
}

export function CategoryFilter({
  categories,
  selected = null,
  onChange,
  showAll = true,
  allLabel = 'Tümü',
  variant = 'default',
  className,
}: CategoryFilterProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-2',
        variant === 'pills' && 'gap-1',
        className
      )}
    >
      {showAll && (
        <button
          onClick={() => onChange?.(null)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            selected === null
              ? 'bg-yellow-500 text-neutral-900'
              : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
          )}
        >
          {allLabel}
        </button>
      )}
      {categories.map((category) => {
        const isSelected = selected === category;
        const colors = categoryColors[category] || defaultColors;

        return (
          <button
            key={category}
            onClick={() => onChange?.(category)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              isSelected
                ? 'bg-yellow-500 text-neutral-900'
                : cn(colors.bg, colors.text, 'hover:opacity-80')
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

// Category list for displaying multiple categories
interface CategoryListProps {
  categories: string[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'subtle';
  className?: string;
}

export function CategoryList({
  categories,
  size = 'sm',
  variant = 'default',
  className,
}: CategoryListProps) {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {categories.map((category) => (
        <CategoryBadge
          key={category}
          category={category}
          size={size}
          variant={variant}
        />
      ))}
    </div>
  );
}
