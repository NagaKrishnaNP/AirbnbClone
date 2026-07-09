# Airbnb Clone — Frontend (Angular 17, standalone components)

Desktop-only clone of an Airbnb listing page, built with hand-written SCSS
(no Angular Material / Tailwind) against design tokens in `src/styles.scss`
that mirror Airbnb's real palette, radii, and motion easing.

## Requirements
- Node 18+
- Angular CLI 17 (`npm i -g @angular/cli@17`)
- The backend running on `http://localhost:8080` (see `airbnb-clone-backend/README.md`)

## Run locally
```bash
cd airbnb-clone-frontend
npm install
npm start
```
Opens on `http://localhost:4200`.

## Structure
```
src/app/
  core/
    models/listing.model.ts       # DTOs mirroring the Spring Boot API
    services/listing.service.ts   # HttpClient calls to the backend
    services/gallery-state.service.ts  # signal-based store shared by the two overlays
  features/
    listing-page/    # Main property page: hero grid, overview, amenities, reviews, booking card
    photo-tour/       # Full-screen gallery grouped by room, opened from "Show all photos" / any hero photo
    lightbox/         # Single-photo viewer with prev/next + arrow-key navigation
  shared/components/icon/  # Inline SVG icon set (share, heart, star, chevrons, close, grid)
```

## The three views
1. **Listing Page** (`/`) — title row with Share/Save, 5-photo hero grid, overview/rating badges,
   host row, description (expand/collapse), amenities, reviews, house rules, and a sticky booking card.
2. **Photo Tour** — opened by clicking the hero grid or "Show all photos". Full-screen overlay,
   sticky thumbnail nav to jump between rooms, vertically stacked full-width photos with room name + caption.
3. **Lightbox** — opened by clicking any photo inside the Photo Tour. Single photo, prev/next arrows,
   ←/→ keyboard navigation, Esc to close, photo counter, focus moves to the close button on open and
   returns to the previously focused element on close.

## Accessibility notes
- Both overlays use `role="dialog"` + `aria-modal="true"` and manage focus on open/close.
- Escape closes the topmost overlay only (Lightbox first, then Photo Tour).
- All interactive elements are real `<button>`s, so they're natively keyboard-reachable and get the
  global focus-visible ring defined in `styles.scss`.
- Images have descriptive `alt` text derived from the room name.

## Known gaps vs. a true pixel-perfect match
I could not browse or fetch the actual reference URL (`airbnb-clone-umber-two.vercel.app`) — its
`robots.txt` blocks automated fetches, and this environment has no live browser/screenshot tool.
This implementation is built from the PDF's screenshots plus general knowledge of Airbnb's real
production listing-page design (spacing, palette, grid layout, interaction patterns). If you can
share the reference's actual computed styles (DevTools → Elements/Computed, or a font/color export)
or more screenshots of hover/scroll states, I can tighten colors, spacing, font sizing, and the exact
hero-grid corner radii to match 1:1.

Also note: Airbnb's real typeface ("Circular") isn't publicly licensed, so this uses **Inter** as a
free stand-in — swap `styles.scss`'s font-face if you have access to Circular.
