'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollToTopProps {
  threshold?: number;
  smooth?: boolean;
  position?: 'left' | 'right';
  className?: string;
}

export function ScrollToTop({
  threshold = 400,
  smooth = true,
  position = 'right',
  className,
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 z-40 p-3 bg-yellow-500 hover:bg-yellow-400 text-neutral-900 rounded-full shadow-lg transition-all duration-300',
        position === 'right' ? 'right-6' : 'left-6',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none',
        className
      )}
      aria-label="Yukarı çık"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

// Scroll to element utility
interface ScrollToElementProps {
  targetId: string;
  children: React.ReactNode;
  offset?: number;
  smooth?: boolean;
  className?: string;
}

export function ScrollToElement({
  targetId,
  children,
  offset = 0,
  smooth = true,
  className,
}: ScrollToElementProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
