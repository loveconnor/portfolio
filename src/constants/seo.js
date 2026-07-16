const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.connorlove.com';

// Vercel serves this site from the www host. Keep every canonical, Open Graph,
// and structured-data URL on that host so social crawlers never have to follow
// a cross-host redirect before they can build a preview.
export const SITE_URL = configuredSiteUrl.replace(/^https:\/\/connorlove\.com(?=\/|$)/, 'https://www.connorlove.com').replace(/\/$/, '');

export const SITE_NAME = 'Connor Love';

export const TWITTER_HANDLE = '@cando145';

export const OG_IMAGE = `${SITE_URL}/og.png`;

export const OG_IMAGE_ALT = 'Connor Love Ohio web developer portfolio preview';

export const sameAsProfiles = ['https://www.linkedin.com/in/loveconnor/', 'https://github.com/loveconnor', 'https://twitter.com/cando145', 'https://www.instagram.com/connorlove__/'];

export const serviceFocus = [
  {
    title: 'Websites and web apps',
    text: 'Custom builds shaped around the product, audience, and way the team needs to work.',
  },
  {
    title: 'Frontend systems',
    text: 'Responsive layouts, reusable components, semantic HTML, and architecture that is easy to extend.',
  },
  {
    title: 'Interaction and motion',
    text: 'Purposeful animation, 3D experiences, and polished details that make an interface feel intuitive.',
  },
  {
    title: 'Product interfaces',
    text: 'Dashboards, learning tools, AI products, workflows, and design systems built for real use.',
  },
  {
    title: 'Performance and accessibility',
    text: 'Fast, crawlable pages with clear content, structured data, and accessible interactions.',
  },
];

export const serviceAreas = [
  {
    '@type': 'City',
    name: 'Columbus',
  },
  {
    '@type': 'Place',
    name: 'Central Ohio',
  },
  {
    '@type': 'State',
    name: 'Ohio',
  },
  {
    '@type': 'City',
    name: 'Cleveland',
  },
  {
    '@type': 'City',
    name: 'Cincinnati',
  },
  {
    '@type': 'City',
    name: 'Dayton',
  },
  {
    '@type': 'City',
    name: 'Toledo',
  },
  {
    '@type': 'City',
    name: 'Akron',
  },
  {
    '@type': 'Country',
    name: 'United States',
  },
  {
    '@type': 'Place',
    name: 'Worldwide',
  },
];
