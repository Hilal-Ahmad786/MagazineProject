'use client';

import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: {
    horizontal: 'w-72',
    vertical: 'h-72',
  },
  md: {
    horizontal: 'w-96',
    vertical: 'h-96',
  },
  lg: {
    horizontal: 'w-[480px]',
    vertical: 'h-[480px]',
  },
  xl: {
    horizontal: 'w-[640px]',
    vertical: 'h-[640px]',
  },
  full: {
    horizontal: 'w-full',
    vertical: 'h-full',
  },
};

const positionClasses = {
  left: 'left-0 top-0 bottom-0 -translate-x-full data-[open=true]:translate-x-0',
  right: 'right-0 top-0 bottom-0 translate-x-full data-[open=true]:translate-x-0',
  top: 'top-0 left-0 right-0 -translate-y-full data-[open=true]:translate-y-0',
  bottom: 'bottom-0 left-0 right-0 translate-y-full data-[open=true]:translate-y-0',
};

export function Drawer({
  isOpen,
  onClose,
  children,
  position = 'right',
  size = 'md',
  title,
  description,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
}: DrawerProps) {
  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    },
    [onClose, closeOnEscape]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  const isHorizontal = position === 'left' || position === 'right';
  const sizeClass = isHorizontal
    ? sizeClasses[size].horizontal
    : sizeClasses[size].vertical;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        data-open={isOpen}
        className={cn(
          'fixed z-50 bg-neutral-900 border-neutral-800 shadow-2xl transition-transform duration-300 ease-out',
          positionClasses[position],
          sizeClass,
          isHorizontal ? 'h-full border-l' : 'w-full border-t',
          position === 'left' && 'border-r border-l-0',
          position === 'top' && 'border-b border-t-0',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        aria-describedby={description ? 'drawer-description' : undefined}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
            <div>
              {title && (
                <h2
                  id="drawer-title"
                  className="text-lg font-semibold text-white"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="drawer-description"
                  className="text-sm text-neutral-400 mt-1"
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}

// Drawer sections for consistent styling
interface DrawerSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function DrawerHeader({ children, className }: DrawerSectionProps) {
  return (
    <div className={cn('px-6 py-4 border-b border-neutral-800', className)}>
      {children}
    </div>
  );
}

export function DrawerBody({ children, className }: DrawerSectionProps) {
  return (
    <div className={cn('px-6 py-4 flex-1 overflow-y-auto', className)}>
      {children}
    </div>
  );
}

export function DrawerFooter({ children, className }: DrawerSectionProps) {
  return (
    <div className={cn('px-6 py-4 border-t border-neutral-800', className)}>
      {children}
    </div>
  );
}
