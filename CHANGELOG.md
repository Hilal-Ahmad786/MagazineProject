# Changelog - Mazhar Dergisi

## [2.0.0] - 2024-12-08

### 🎨 Major Design Overhaul - Contemporary Bold (Option 5)

#### Added
- **Full-Screen Hero Section**: Dramatic opening with large typography
- **Split Section Layout**: New `LatestIssue` component with image/content split
- **Dynamic Grid System**: 12-column flexible grid for articles
- **Contemporary Animations**: Fade-in, bounce, hover effects
- **Dark Theme**: Complete black background with yellow accents
- **Fixed Header**: Sticky navigation with gradient background

#### Changed
- **Color Palette**: 
  - Background: #F5F5F0 → #000000 (Black)
  - Primary: #8B7355 → #FFD700 (Yellow)
  - Text: Dark → White
  
- **Typography**:
  - Font: Playfair Display → Helvetica Neue
  - Weight: 400-700 → 900 (Black weight for headings)
  - Style: Serif → Sans-serif
  
- **Components**:
  - `Header.tsx`: Fixed position, yellow logo, gradient bg
  - `Footer.tsx`: Dark theme, 3-column layout, yellow links
  - `HeroSection.tsx`: Full-screen with scroll indicator
  - `FeaturedArticles.tsx`: Dynamic grid instead of 3-column
  - `AuthorsSection.tsx`: Circular avatars, hover effects
  - `NewsletterSection.tsx`: Yellow gradient background
  - `Button.tsx`: Bold uppercase style, yellow primary
  - `Card.tsx`: Dark with yellow accent bar
  - `Badge.tsx`: Uppercase bold style

#### Styling Updates
- `globals.css`: Black background, white text defaults
- `theme.css`: New animation utilities
- `typography.css`: Dark mode optimized
- `tailwind.config.ts`: Dark theme colors, custom animations

#### Files Modified
**Layout Components** (3):
- src/components/layout/Header.tsx
- src/components/layout/Navbar.tsx
- src/components/layout/Footer.tsx

**Home Components** (5):
- src/components/home/HeroSection.tsx
- src/components/home/LatestIssue.tsx (NEW)
- src/components/home/FeaturedArticles.tsx
- src/components/home/AuthorsSection.tsx
- src/components/home/NewsletterSection.tsx

**UI Components** (3):
- src/components/ui/Button.tsx
- src/components/ui/Card.tsx
- src/components/ui/Badge.tsx

**App Files** (4):
- src/app/layout.tsx
- src/app/page.tsx
- src/app/loading.tsx
- src/app/not-found.tsx

**Style Files** (4):
- src/styles/globals.css
- src/styles/theme.css
- src/styles/typography.css
- tailwind.config.ts

**Documentation** (2):
- README.md
- CHANGELOG.md

#### Technical Improvements
- Added `dark` class to html element
- Implemented smooth scroll behavior
- Added CSS custom properties for theme
- Optimized animation performance
- Improved responsive breakpoints

#### Design Philosophy
**From**: Classic Editorial (Traditional magazine aesthetic)  
**To**: Contemporary Bold (Modern, dramatic, high-contrast)

**Key Changes**:
- Light → Dark
- Serif → Sans-serif
- Subtle → Bold
- Classic → Contemporary
- Warm tones → High contrast (Black & Yellow)

---

## [1.0.0] - 2024-12-08

### Initial Release

#### Features
- Homepage with hero section
- Featured articles display
- Authors grid
- Newsletter subscription
- Dark mode toggle
- Responsive design
- JSON-based content
- TypeScript support
- Tailwind CSS styling
- Next.js 14 App Router

#### Components
- Layout: Header, Navbar, Footer, Breadcrumb
- Home: Hero, Featured Articles, Authors, Newsletter
- UI: Button, Card, Input, Badge, Avatar, Skeleton, Pagination, Tabs, Modal, Toast

#### Data
- 5 sample articles
- 4 authors
- 2 issues
- 8 themes
- 10 quotes
- Site settings

---

## Version Comparison

| Feature | v1.0 | v2.0 |
|---------|------|------|
| Theme | Light/Dark toggle | Dark only |
| Colors | Bronze/Cream | Black/Yellow |
| Typography | Serif (Playfair) | Sans-serif (Helvetica) |
| Hero | Quote + Issue card | Full-screen dramatic |
| Grid | 3-column | 12-column dynamic |
| Style | Classic editorial | Contemporary bold |
| Animations | Minimal | Multiple effects |
| Target | Traditional readers | Modern audience |
