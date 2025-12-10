// src/components/theme/ThemeScript.tsx
// Script to prevent flash of unstyled content (FOUC)
// Add this to the <head> section of your layout

export function ThemeScript() {
  // This script runs before React hydrates
  const script = `
    (function() {
      try {
        var theme = localStorage.getItem('mazhar_theme');
        var resolved = theme;
        
        if (theme === 'system' || !theme) {
          resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(resolved || 'dark');
        
        // Update meta theme-color
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
          meta.setAttribute('content', resolved === 'dark' ? '#000000' : '#ffffff');
        }
      } catch (e) {
        document.documentElement.classList.add('dark');
      }
    })();
  `

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      // This ensures the script runs immediately
      suppressHydrationWarning
    />
  )
}

export default ThemeScript
