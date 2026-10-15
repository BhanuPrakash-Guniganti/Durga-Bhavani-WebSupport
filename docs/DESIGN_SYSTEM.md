# Design System: Durga Bhavani Seva Samiti - Dodlapahad

## 1. Visual Direction & Cultural Aesthetics

The design evokes **devotion, cultural heritage, community service, and trust**. It combines traditional Indian temple aesthetics with a modern, clean, accessible user interface.

### Color Palette

| Token | Hex Code | Role | Usage |
|---|---|---|---|
| `--color-maroon-dark` | `#580808` | Primary Header / Deep Background | Navigation bar, modal headers, major accents |
| `--color-maroon-primary` | `#7A0C0C` | Primary Brand Color | Primary buttons, page titles, active links |
| `--color-maroon-light` | `#9B1B1B` | Primary Hover / Border | Button hover states, subtle card borders |
| `--color-saffron` | `#E65100` | Festive Cultural Accent | Badges, highlighted dates, auspicious tags |
| `--color-saffron-light` | `#FFF3E0` | Saffron Tint | Notice background, alert banners |
| `--color-gold-accent` | `#D4AF37` | Restrained Metallic Accent | Subtle borders, ornamental dividers, icons |
| `--color-cream-bg` | `#FAF7F2` | Body Background | Page background (soft, warm, avoids harsh pure white) |
| `--color-surface` | `#FFFFFF` | Surface / Card Background | Content cards, modal dialogs, drawers |
| `--color-text-primary` | `#1A1A1A` | High Contrast Text | Main headings, body paragraphs (WCAG AAA compliant) |
| `--color-text-secondary` | `#555555` | Secondary Text | Captions, dates, photographer credits |
| `--color-border` | `#E8DFD5` | Warm Subtle Border | Card dividers, table borders, input outlines |

---

## 2. Typography

- **Heading Font**: Serif with dignified character (e.g., `Playfair Display`, `Cinzel`, or standard `Georgia, serif`) for the temple title and section headers.
- **Body Font**: Clean, modern, highly legible sans-serif (`Inter`, `system-ui`, `-apple-system`, `sans-serif`) for comfortable reading across all screen sizes.
- **Scale**:
  - `h1`: 2rem (32px) on mobile / 2.75rem (44px) on desktop
  - `h2`: 1.5rem (24px) on mobile / 2rem (32px) on desktop
  - `h3`: 1.25rem (20px) on mobile / 1.5rem (24px) on desktop
  - `body`: 1rem (16px) with 1.6 line height
  - `small`: 0.875rem (14px) for meta info, dates, and credits

---

## 3. Responsive Breakpoints & Mobile-First Standards

We develop **mobile-first**, ensuring seamless scaling from 320px smartphones to ultra-wide displays:

| Breakpoint | Target Viewports | Layout Behavior |
|---|---|---|
| **< 480px** | 320px, 375px, 425px (Mobile) | Single column, hamburger drawer navigation, stacked cards, full-width touch buttons. |
| **481px - 768px** | 768px (Tablets / Foldables) | 2-column card grids, flexible drawer, compact data tables. |
| **769px - 1024px** | 1024px (Small Laptops / iPad Pro) | Horizontal navigation bar, 3-column album grids, sidebar admin view. |
| **> 1025px** | 1440px+ (Desktops) | Max container width of 1280px, rich multi-column layouts, expanded admin dashboard. |

### Mobile Touch & Ergonomics Rules:
- Minimum touch target: **44px × 44px** for buttons, pagination pills, and links.
- **No unwanted horizontal overflow**: `overflow-x: hidden` enforced on page wrapper with strict max-width constraints on media.
- Lightbox controls positioned for reachable one-handed thumb interaction on mobile devices.

---

## 4. Reusable UI Components Architecture

1. **TopNav**: Cultural motif, responsive menu toggler, accessible keyboard trap in mobile drawer.
2. **Footer**: Quick links, temple committee notice, developer attribution, copyright.
3. **Card**: Elevated surface with warm border, rounded corners (8px), subtle shadow.
4. **Lightbox**: Full-screen modal with image zoom/fit, keyboard arrows, touch swipe, caption display.
5. **Badge**: Status indicators (`Published` - emerald, `Draft` - amber, `Archived` - slate, `Auspicious` - saffron).
6. **Form Controls**: Floating labels, clear error states with red border and helper text, focus outlines.
