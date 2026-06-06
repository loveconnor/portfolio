# Connor Love Portfolio - Detailed Spec

This document is the full spec for this portfolio site.

It explains what the site does, how it is built, how pages work, and how to update it.

---

## 1) Project Purpose

This is a personal portfolio website for Connor Love.

Main goals:

- Show creative frontend and full-stack project work
- Present personal background and services
- Give fast contact paths (email + social links)
- Deliver a premium interactive user experience with motion, 3D, and smooth scroll

---

## 2) Tech Stack

### Core

- Next.js 14 (Pages Router)
- React 18
- Sass (SCSS modules + global styles)

### Animation and Interaction

- GSAP + ScrollTrigger for timeline/scroll animations
- Lenis for smooth scrolling
- split-type for text splitting animations
- react-transition-group for page transitions

### 3D and Visual Systems

- three
- @react-three/fiber
- @react-three/drei
- @react-three/postprocessing
- @react-three/rapier (physics)
- Custom GLSL shaders via `raw-loader` + `glslify-loader`

### State and Utilities

- Zustand (global app state)
- clsx (className composition)
- @darkroom.engineering/hamo + tempus (timing/window helpers)

### SEO and Analytics

- next-seo
- next-sitemap
- @vercel/analytics

---

## 3) App Structure (High-Level)

- `src/pages` - route entry points (`*.page.jsx`)
- `src/pages/components` - homepage section components
- `src/components/dom` - shared UI shell (loader, navbar, layout, footer, etc.)
- `src/components/canvas` - 3D and shader-based visual systems
- `src/constants/projects.js` - project data source for project pages
- `src/store.js` - global app state (Zustand)
- `src/hooks` - custom hooks (scroll, mobile detection, isomorphic layout effect, etc.)
- `src/styles` - global SCSS system (tokens, reset, layout, typography)

---

## 4) Routing Spec

This site uses Next.js Pages Router with custom page extension: `*.page.jsx`.

### Public Routes

- `/` - Home page with multiple sections:
  - Hero
  - About preview
  - Work/clients block
  - Quote/value statement
  - Selected projects
- `/about` - About page with:
  - Hero image/intro
  - Personal overview
  - Services section
  - Process/workflow section
- `/projects` - All projects overview page
- `/projects/[id]` - Static project detail pages (from project constants)

### Other Route Behavior

- `404.page.jsx` immediately redirects to `/`
- Next config redirects:
  - `/home` -> `/`
  - `/404` -> `/`

---

## 5) Core UX Behavior

### Initial Load Sequence

- App starts with a full-screen loader.
- Progress animates from `0%` to `100%`.
- Loader transitions into the main layout.
- After intro:
  - `introOut` becomes `true`
  - `isLoading` becomes `false`
  - Lenis smooth scrolling starts

### Page Transitions

- Route transitions are managed in `Layout` using `SwitchTransition`.
- Exit animation runs first, then enter animation.
- During transition:
  - Header/menu states are adjusted
  - Scroll resets to top
  - Main container is animated in/out

### Smooth Scroll

- Lenis wraps `<main>` and controls scrolling globally.
- GSAP ScrollTrigger updates are synced with Lenis.
- Menu open/close can stop/start Lenis to avoid interaction conflicts.

---

## 6) Global State Spec (`src/store.js`)

Global Zustand state keys:

- `lenis`: Lenis instance
- `introOut`: whether intro loader sequence completed
- `isMenuOpen`: overlay menu state
- `isLoading`: loading/transition flag
- `fluidColor`: color value for fluid post-processing effect
- `isAbout`: true when current route is `/about` (used for visual behavior)

Each key has a paired setter function in store.

---

## 7) Page-Level Spec

## Home (`/`)

Composed in this order:

1. Home hero section
2. About preview section
3. Clients/work section
4. Quote section
5. Selected projects section

### Home hero details

- Animated SVG grid rectangles move over time
- Includes floating 3D meshes
- Has short value statement text
- Shows "Scroll Down" infinite text prompt

### About preview details

- Intro text and portrait image
- Scroll-based image/text movement
- CTA button to `/about`

### Work/clients details

- Work section with animated badge and text
- Desktop has richer copy; mobile has simplified copy

### Quote details

- Animated text opacity reveal while scrolling

### Selected projects details

- Displays 3 featured project cards:
  - LoveUI
  - LoveChat
  - Lyceum
- Scroll-based stacked card animation
- CTA button to `/projects`

---

## About (`/about`)

Sections:

1. Hero
2. Overview
3. Services
4. Process

### Hero

- Large statement ("I build fast, clean, scalable web applications.")
- Image parallax movement tied to scroll

### Overview

- Personal summary text
- Split desktop/mobile line layout for typography control

### Services

- Data-driven content from `services/constants/Containt.jsx`
- Hover/portal overlays show option title + description

### Process

- Data-driven content from `process/constants/Containt.jsx`
- Similar portal/hover presentation to Services

---

## Projects Index (`/projects`)

- Title: "All Projects"
- Renders all projects from `src/constants/projects.js`
- Uses stacked scroll animation like selected projects on home
- Each card links to `/projects/[id]`

---

## Project Details (`/projects/[id]`)

Static generation:

- `getStaticPaths()` creates paths from project IDs
- `getStaticProps()` injects current project `id`

Page layout:

- Left column: project details text and optional "Visit Live Site" button
- Right column: project media gallery (video/image by `tag`)
- Bottom section: "Next Project" card linking to next project (wraps to first item)

Desktop behavior:

- Left column is pinned while right media column scrolls (ScrollTrigger pin)

---

## 8) Project Data Model (`src/constants/projects.js`)

Each project object includes:

- `id`: URL-safe unique slug (used for route)
- `title`: display name
- `img`: main thumbnail image path
- `link`: route path (usually `/projects/{id}`)
- `date`: display year
- `liveLink`: optional external URL
- Theme/system color values:
  - `primary`
  - `secondary`
  - `accentColor`
  - `fillColor`
  - `menuColor`
  - `menuFontColor`
  - `fluidColor`
- `images`: media array for detail page
  - `src`
  - `tag` (`video`, `big`, `medium`, `small`)
  - `isRight` (used by some layouts)
- `desc`: paragraph array used in project detail text

Current active projects:

- loveui
- lovechat
- lyceum
- lovesans
- connorvault

---

## 9) Shared UI Shell Spec

### Navbar

- Left: brand text (`CONNOR`) linking home
- Right:
  - desktop "BOOK A CALL" Cal.com button
  - menu button

### Menu Overlay

Contains:

- Main links (Home, About me, Projects, Contact)
- Featured project links
- Book a call link
- Social links

Special behavior:

- "Contact" item scrolls to bottom of current page instead of route navigation
- Menu animation shifts/scales main content and hides fluid canvas while open

### Pre-Footer

- CTA text: build something together
- Interactive 3D "FruitNinja" style canvas:
  - Physics-driven floating tech logo stickers
  - Hovering a sticker swaps to sliced texture

### Footer

Contains:

- Sitemap links
- Social links
- Email link
- Location and current time
- Availability status
- Copyright
- "Go to top" action

---

## 10) SEO, Metadata, and Crawl Spec

### Per-page SEO

Each main page sets:

- page title
- meta description
- keywords

via `CustomHead` + `NextSeo`.

### Global metadata behavior

`CustomHead` provides:

- Open Graph tags
- Twitter card tags
- canonical URL
- robot indexing rule:
  - development: `noindex,nofollow`
  - non-development: `index,follow`
- JSON-LD Person schema
- favicon and manifest links

### Sitemap + robots

- `next-sitemap` runs in `postbuild`
- Configured site URL: `https://www.connorlove.com/`
- `robots.txt` is generated

---

## 11) Security Headers and Redirects

Configured in `next.config.js`:

Response headers for all routes:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`

Redirects:

- `/home` -> `/` (permanent)
- `/404` -> `/` (permanent)

---

## 12) Build and Runtime Setup

## Prerequisites

- Node.js 18+ recommended
- npm (project includes `package-lock.json`)

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm run start
```

## Lint

```bash
npm run lint
```

---

## 13) Static Assets and Fonts

- Site-level assets in `public/` (manifest, robots, sitemap, pinned tab, etc.)
- Image and media assets are referenced by absolute public paths in project data
- Custom fonts are linked in `_document.page.jsx`

---

## 14) Coding Standards and Tooling

- ESLint with Airbnb + Next + React + JSX a11y + @react-three plugin
- Prettier configured for single quotes and wide print width
- lint-staged + husky for pre-commit checks
- Alias support:
  - `@src/*` -> `src/*`

---

## 15) How to Update Content

### Add a new project

1. Add new object in `src/constants/projects.js`
2. Add required fields (`id`, `title`, `img`, `link`, `date`, colors, `images`, `desc`)
3. Add project media files under `public/` in matching folders
4. Confirm route works at `/projects/{id}`
5. If you want it on home "Selected Projects", include its `id` in `selectedProjectIds` in `src/pages/components/projects/Index.jsx`

### Update About services/process text

- Edit:
  - `src/pages/about/components/services/constants/Containt.jsx`
  - `src/pages/about/components/process/constants/Containt.jsx`

### Update nav/footer links

- Menu links: `src/components/dom/navbar/constants/menuLinks.js`
- Menu project links: `src/components/dom/navbar/constants/projectsLinks.js`
- Social links: `src/components/dom/navbar/constants/footerLinks.js`

---

## 16) Known Notes

- The project data description strings include leftover citation markers like `:contentReference[...]`. These are rendered as plain text unless cleaned.
- In the current clients section, mobile copy still contains placeholder lorem ipsum lines.
- `Stats` utility is mounted but does not render visible panel by default.

---

## 17) Definition of Done for This Site

This portfolio is considered healthy when:

- Intro loader runs once and app becomes interactive
- Smooth scrolling + scroll triggers stay in sync
- Main routes render without errors (`/`, `/about`, `/projects`, `/projects/[id]`)
- Project cards and project detail pages load all media correctly
- Menu opens/closes cleanly and contact actions work
- Footer and pre-footer interactions behave correctly on desktop and mobile
- Build, lint, and sitemap generation pass
