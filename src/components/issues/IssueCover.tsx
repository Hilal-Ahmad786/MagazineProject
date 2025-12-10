'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Issue } from '@/types';

interface IssueCoverProps {
  issue: Issue;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  interactive?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-24 h-32',
  md: 'w-36 h-48',
  lg: 'w-48 h-64',
  xl: 'w-64 h-[340px]',
};

export function IssueCover({
  issue,
  size = 'md',
  showBadge = true,
  interactive = true,
  className,
}: IssueCoverProps) {
  const coverContent = (
    <div
      className={cn(
        'relative rounded-lg overflow-hidden shadow-xl',
        sizeClasses[size],
        interactive && 'group cursor-pointer',
        className
      )}
    >
      {/* Cover Image */}
      <Image
        src={issue.coverImage}
        alt={`Sayı ${issue.number} Kapak`}
        fill
        className={cn(
          'object-cover',
          interactive && 'group-hover:scale-105 transition-transform duration-500'
        )}
      />

      {/* Featured Badge */}
      {showBadge && issue.featured && (
        <div className="absolute top-2 left-2 bg-yellow-500 text-neutral-900 px-2 py-0.5 rounded-full text-xs font-bold">
          Güncel
        </div>
      )}

      {/* Hover Overlay */}
      {interactive && (
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3 right-3">
            <span className="text-yellow-500 text-xs font-bold">
              Sayı {issue.number}
            </span>
            <h4 className="text-white text-sm font-semibold line-clamp-2 mt-1">
              {issue.title}
            </h4>
          </div>
        </div>
      )}

      {/* Border Effect */}
      <div className="absolute inset-0 border border-white/10 rounded-lg pointer-events-none" />
    </div>
  );

  if (interactive) {
    return (
      <Link href={`/sayilar/${issue.id}`} className="block">
        {coverContent}
      </Link>
    );
  }

  return coverContent;
}

// Horizontal scroll gallery of issue covers
interface IssueCoverGalleryProps {
  issues: Issue[];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function IssueCoverGallery({
  issues,
  size = 'md',
  className,
}: IssueCoverGalleryProps) {
  return (
    <div
      className={cn(
        'flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900',
        className
      )}
    >
      {issues.map((issue) => (
        <IssueCover
          key={issue.id}
          issue={issue}
          size={size}
          className="flex-shrink-0"
        />
      ))}
    </div>
  );
}

// Stacked cover display for decorative purposes
interface IssueCoverStackProps {
  issues: Issue[];
  className?: string;
}

export function IssueCoverStack({ issues, className }: IssueCoverStackProps) {
  const displayIssues = issues.slice(0, 3);

  return (
    <div className={cn('relative w-64 h-80', className)}>
      {displayIssues.map((issue, index) => (
        <div
          key={issue.id}
          className="absolute"
          style={{
            top: `${index * 16}px`,
            left: `${index * 16}px`,
            zIndex: displayIssues.length - index,
            transform: `rotate(${(index - 1) * 3}deg)`,
          }}
        >
          <IssueCover
            issue={issue}
            size="lg"
            showBadge={index === 0}
            interactive={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
