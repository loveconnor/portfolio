import NextHead from 'next/head';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const SITE_URL = 'https://www.connorlove.com';
const OG_IMAGE = `${SITE_URL}/og.png`;

const normalizePath = (path) => {
  const cleanPath = path?.split('?')[0].split('#')[0] || '/';
  return cleanPath === '/' ? '' : cleanPath.replace(/\/$/, '');
};

const getSchema = ({ canonicalUrl, title, description }) => ({
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
      inLanguage: 'en-US',
    },
  ],
});

function CustomHead({ title = '', description, keywords }) {
  const router = useRouter();
  const canonicalUrl = `${SITE_URL}${normalizePath(router.asPath)}`;

  return (
    <>
      <NextHead>
        {/* General Meta Tags */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta httpEquiv="x-dns-prefetch-control" content="off" />
        <meta name="robots" content={process.env.NODE_ENV !== 'development' ? 'index,follow' : 'noindex,nofollow'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="keywords" content={keywords && keywords.length ? keywords.join(',') : keywords} />
        <meta name="author" content="Connor Love" />
        <meta name="referrer" content="no-referrer" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Columbus, Ohio" />
        <meta name="description" content={description} />

        {/* Canonical and Title */}
        <link rel="canonical" href={canonicalUrl} />
        <title>{title}</title>

        {/* OpenGraph Meta Tags */}
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="AI-readable site summary" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#333333" />
        <meta name="msapplication-TileColor" content="#f8e9cc" />
        <meta name="theme-color" content="#f8e9cc" />

        {/* Schema */}
        {/* eslint-disable-next-line react/no-danger */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getSchema({ canonicalUrl, title, description })) }} />
      </NextHead>
      <NextSeo title={title} description={description} canonical={canonicalUrl} openGraph={{ title, description, url: canonicalUrl, images: [{ url: OG_IMAGE }] }} />
    </>
  );
}

CustomHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
};

CustomHead.defaultProps = {
  keywords: [],
};

export default CustomHead;
