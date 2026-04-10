// File: portfolio/ideas.md

# Awards Section – Future Ideas & Placement

## Why an Awards Section?
- **Credibility** – Showcasing recognitions builds trust with potential clients.
- **Differentiation** – Highlights achievements that set the portfolio apart.
- **SEO** – Structured data for awards can improve search visibility.

## Possible Content Types
| Type | Description | Example |
|------|-------------|---------|
| **Badge / Logo Grid** | Simple grid of award logos (e.g., “Awwwards”, “CSS Design Awards”). | ![Awwwards badge](/public/awards/awwwards.svg) |
| **Carousel / Slider** | Horizontal carousel with each slide showing logo, title, year, and short description. | Use `react-slick` or custom GSAP‑driven slider. |
| **Timeline** | Vertical or horizontal timeline of award milestones with dates and brief notes. | Good for storytelling – “2022 – Best UI/UX”. |
| **Featured Card** | Larger card for a flagship award (e.g., “Webby Award 2023”) with an image, citation, and link to press coverage. |
| **Animated Counter** | Number of awards earned, animated when scrolled into view. |
| **Modal Details** | Clicking an award opens a modal with more info, images, and external links. |

## Visual & Interaction Ideas
- **Micro‑animations:** Fade‑in, slide‑up, or scale‑in on scroll (GSAP + ScrollTrigger).
- **Hover Effects:** Slight rotation or color‑shift on award logos to hint interactivity.
- **Parallax Layer:** For a timeline, move the line or markers at a slower speed than the content.
- **Light/Dark Adaptation:** Use `invert` filters or SVG `fill` changes to stay visible in both themes.
- **Accessibility:** Alt text for each logo, keyboard‑navigable carousel, ARIA roles for timeline.

## Data Management
- Store award data in a JSON file (e.g., `src/constants/awards.js`) with fields:
  ```js
  export const awards = [
    {
      id: "awwwards-2022",
      title: "Awwwards Site of the Day",
      year: 2022,
      logo: "/public/awards/awwwards.svg",
      description: "Recognized for innovative UI and smooth interactions.",
      link: "https://www.awwwards.com/sites/..."
    },
    // …
  ];
  ```
- Import the data into the component and map over it – keeps content editable without code changes.

## Placement Options

| Location | Pros | Cons |
|----------|------|------|
| **Home Page – After “Selected Projects”** | Immediate visibility, reinforces credibility before visitors explore deeper. | Takes up prime real‑estate on the hero; must be concise. |
| **About Page – Within “Process / Services”** | Natural narrative flow: “Our process… award‑winning results.” | Visitors may not navigate to About, reducing exposure. |
| **Dedicated `/awards` Route** | Full page for detailed list, press links, and case studies. | Requires additional navigation; may be under‑utilized. |
| **Footer** | Always present, low‑impact. | Small space; not ideal for visual showcase. |
| **Overlay / Modal from Navbar** | Quick access without cluttering main layout. | May be hidden from users who don’t explore the menu. |

### Recommended Default Placement
- **Primary**: Insert a compact “Award Badges” carousel on the Home page, directly after the “Selected Projects” section.
- **Secondary**: Add a more detailed “Awards Timeline” within the About page’s “Process” section.
- **Optional**: Provide a link in the footer or navigation to a full `/awards` page for extensive coverage.

## Implementation Roadmap
1. **Create data file** – `src/constants/awards.js`.
2. **Build reusable `AwardBadge` component** (logo + hover tooltip).
3. **Add carousel component** using GSAP or a lightweight library.
4. **Integrate carousel into Home page (`src/pages/components/AwardsCarousel.jsx`).**
5. **Optional:** Build timeline component for About page.
6. **Update SEO** – Add structured data (`Award` schema) via `next-seo`.
7. **Write tests** – Verify component renders all awards and is accessible.
8. **Document** – Add usage notes to `README.md` and this `ideas.md`.

---

*End of ideas.md – feel free to iterate on design, animation, or placement based on design system constraints and user feedback.*