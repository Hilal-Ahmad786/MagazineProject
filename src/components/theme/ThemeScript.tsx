'use client'

export function ThemeScript() {
  const themeScript = `
    (function() {
      const storageKey = 'mazhar_theme';
      
      function getTheme() {
        try {
          const stored = localStorage.getItem(storageKey);
          if (stored === 'light' || stored === 'dark') {
            return stored;
          }
          if (stored === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
        } catch (e) {}
        return 'dark'; // Default to dark
      }
      
      const theme = getTheme();
      const html = document.documentElement;
      
      // Remove any existing theme class
      html.classList.remove('light', 'dark');
      
      // Add the correct theme class
      html.classList.add(theme);
      
      // Set color-scheme for native elements
      html.style.colorScheme = theme;
      
      // Update meta theme-color
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
      }
    })();
  `

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  )
}
