/* eslint-disable react/no-danger */
import NextHead from 'next/head';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://connorlove.com').replace(/\/$/, '');
const SITE_NAME = 'Connor Love';
const TWITTER_HANDLE = '@cando145';
const OG_IMAGE = `${SITE_URL}/og.png`;
const OG_IMAGE_ALT = 'Connor Love creative developer portfolio preview';

const normalizePath = (path) => {
  const cleanPath = path?.split('?')[0].split('#')[0] || '/';
  return cleanPath === '/' ? '' : cleanPath.replace(/\/$/, '');
};

const getBreadcrumbItems = (canonicalUrl) => {
  const path = canonicalUrl.replace(SITE_URL, '');
  const segments = path.split('/').filter(Boolean);
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ];

  segments.forEach((segment, index) => {
    const itemPath = segments.slice(0, index + 1).join('/');
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      item: `${SITE_URL}/${itemPath}`,
    });
  });

  return items;
};

const getSchema = ({ canonicalUrl, title, description, project }) => {
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const projectSchema = project
    ? [
        {
          '@type': 'CreativeWork',
          '@id': `${canonicalUrl}#creative-work`,
          name: `${project.title} case study`,
          url: canonicalUrl,
          image: `${SITE_URL}${project.img}`,
          dateCreated: project.date,
          creator: {
            '@id': `${SITE_URL}/#person`,
          },
          about: ['Creative development', 'Frontend development', 'Website development', 'Interactive web applications'],
          description: project.desc.join(' '),
        },
      ]
    : [];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Connor Love',
        jobTitle: 'Creative Developer & Frontend Developer',
        url: SITE_URL,
        image: OG_IMAGE,
        email: 'mailto:loveconnor2005@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Columbus',
          addressRegion: 'OH',
          addressCountry: 'US',
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Columbus',
          },
          {
            '@type': 'State',
            name: 'Ohio',
          },
          {
            '@type': 'Place',
            name: 'Northeast Ohio',
          },
        ],
        knowsAbout: [
          'Creative development',
          'Creative developer',
          'Website development',
          'Frontend development',
          'Web applications',
          'Interactive websites',
          'React development',
          'Next.js development',
          'AI product development',
          'Generative engine optimization',
        ],
        knowsLanguage: 'en-US',
        sameAs: ['https://www.linkedin.com/in/loveconnor/', 'https://github.com/loveconnor', 'https://twitter.com/cando145', 'https://www.instagram.com/connorlove__/'],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#services`,
        name: 'Connor Love Creative Development',
        url: SITE_URL,
        image: OG_IMAGE,
        founder: {
          '@id': `${SITE_URL}/#person`,
        },
        areaServed: ['Columbus, Ohio', 'Ohio', 'Northeast Ohio', 'United States'],
        serviceType: ['Creative development', 'Frontend development', 'Website development', 'Interactive web applications', 'AI product interfaces'],
        knowsAbout: ['React', 'Next.js', 'Three.js', 'TypeScript', 'AI product interfaces', 'Performance optimization'],
        description: 'Connor Love builds custom websites, web applications, and interactive digital experiences with a focus on performance, polished interaction, and scalable frontend systems.',
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Connor Love Portfolio',
        publisher: {
          '@id': `${SITE_URL}/#person`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#person`,
        },
        breadcrumb: {
          '@id': breadcrumbId,
        },
        mainEntity: project
          ? {
              '@id': `${canonicalUrl}#creative-work`,
            }
          : {
              '@id': `${SITE_URL}/#services`,
            },
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: getBreadcrumbItems(canonicalUrl),
      },
      ...projectSchema,
    ],
  };
};

function CustomHead({ title = '', description, keywords, project }) {
  const router = useRouter();
  const normalizedPath = normalizePath(router.asPath);
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const openGraphType = project ? 'article' : 'website';

  return (
    <>
      <NextHead>
        {/* General Meta Tags */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta httpEquiv="x-dns-prefetch-control" content="off" />
        <meta name="robots" content={process.env.NODE_ENV !== 'development' ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,nofollow'} />
        <meta name="googlebot" content={process.env.NODE_ENV !== 'development' ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,nofollow'} />
        <meta name="bingbot" content={process.env.NODE_ENV !== 'development' ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,nofollow'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {keywords?.length ? <meta name="keywords" content={keywords.join(',')} /> : null}
        <meta name="author" content="Connor Love" />
        <meta name="application-name" content={SITE_NAME} />
        <meta name="referrer" content="no-referrer" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="content-language" content="en-US" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Columbus, Ohio" />
        <meta name="description" content={description} />

        {/* Canonical and Title */}
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en-US" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        <title>{title}</title>

        {/* OpenGraph Meta Tags */}
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:secure_url" content={OG_IMAGE} />
        <meta property="og:image:alt" content={OG_IMAGE_ALT} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:type" content={openGraphType} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <meta name="twitter:creator" content={TWITTER_HANDLE} />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms.txt`} title="AI-readable site summary" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#333333" />
        <meta name="msapplication-TileColor" content="#f8e9cc" />
        <meta name="theme-color" content="#f8e9cc" />

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSchema({ canonicalUrl, title, description, project })),
          }}
        />
      </NextHead>
      <NextSeo
        title={title}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          title,
          description,
          url: canonicalUrl,
          type: openGraphType,
          locale: 'en_US',
          siteName: SITE_NAME,
          images: [{ url: OG_IMAGE, alt: OG_IMAGE_ALT }],
        }}
        twitter={{
          handle: TWITTER_HANDLE,
          site: TWITTER_HANDLE,
          cardType: 'summary_large_image',
        }}
      />
    </>
  );
}

CustomHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    desc: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

CustomHead.defaultProps = {
  keywords: [],
  project: null,
};

export default CustomHead;
