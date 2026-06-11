/* eslint-disable react/no-danger */
import NextHead from 'next/head';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { OG_IMAGE, OG_IMAGE_ALT, SITE_NAME, SITE_URL, TWITTER_HANDLE, faqContent, getProjectFaqs, sameAsProfiles, serviceAreas, serviceFocus } from '@src/constants/seo';

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

const getAbsoluteAssetUrl = (path) => (path?.startsWith('http') ? path : `${SITE_URL}${path}`);

const getProjectImages = (project) => {
  const images = project?.images?.filter((image) => image.tag !== 'video').map((image) => getAbsoluteAssetUrl(image.src)) || [];
  return [getAbsoluteAssetUrl(project.img), ...images].filter(Boolean);
};

const getSchema = ({ canonicalUrl, title, description, project, pageType }) => {
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const selectedFaqs = project ? getProjectFaqs(project) : faqContent[pageType] || faqContent.home;
  const projectSchema = project
    ? [
        {
          '@type': 'CreativeWork',
          '@id': `${canonicalUrl}#creative-work`,
          name: `${project.title} case study`,
          url: canonicalUrl,
          image: getProjectImages(project),
          dateCreated: project.date,
          creator: {
            '@id': `${SITE_URL}/#person`,
          },
          about: project.topics || ['Creative development', 'Frontend development', 'Website development', 'Interactive web applications', 'Product interface design'],
          description: project.desc.join(' '),
          sameAs: [project.liveLink, project.githubLink].filter(Boolean),
        },
      ]
    : [];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        jobTitle: 'Creative Developer & Frontend Developer',
        url: SITE_URL,
        image: OG_IMAGE,
        email: 'mailto:loveconnor2005@gmail.com',
        worksFor: {
          '@id': `${SITE_URL}/#organization`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Columbus',
          addressRegion: 'OH',
          addressCountry: 'US',
        },
        homeLocation: {
          '@type': 'Place',
          name: 'Columbus, Ohio',
        },
        workLocation: serviceAreas,
        knowsAbout: [
          'Creative development',
          'Creative developer',
          'Website development',
          'Frontend development',
          'Web applications',
          'Interactive websites',
          'React development',
          'Next.js development',
          'Product interface development',
          'AI product interfaces',
          'Global remote web development',
          'Structured data and search visibility',
        ],
        knowsLanguage: 'en-US',
        sameAs: sameAsProfiles,
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        legalName: SITE_NAME,
        alternateName: 'Connor Love Creative Development',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/icon.png`,
        },
        image: OG_IMAGE,
        email: 'mailto:loveconnor2005@gmail.com',
        founder: {
          '@id': `${SITE_URL}/#person`,
        },
        sameAs: sameAsProfiles,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#services`,
        name: SITE_NAME,
        alternateName: 'Connor Love Creative Development',
        url: SITE_URL,
        image: OG_IMAGE,
        logo: `${SITE_URL}/icon.png`,
        founder: {
          '@id': `${SITE_URL}/#person`,
        },
        provider: {
          '@id': `${SITE_URL}/#organization`,
        },
        areaServed: serviceAreas,
        availableLanguage: {
          '@type': 'Language',
          name: 'English',
        },
        serviceType: serviceFocus.map((service) => service.title),
        knowsAbout: ['React', 'Next.js', 'Three.js', 'TypeScript', 'Product interfaces', 'AI product interfaces', 'Performance optimization'],
        description: 'Connor Love builds custom websites, web applications, and interactive digital experiences for Columbus, Ohio clients and remote teams worldwide.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Creative development services',
          itemListElement: serviceFocus.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.text,
              provider: {
                '@id': `${SITE_URL}/#organization`,
              },
              areaServed: serviceAreas,
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: 'Connor Love Portfolio',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
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
        author: {
          '@id': `${SITE_URL}/#person`,
        },
        publisher: {
          '@id': `${SITE_URL}/#organization`,
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
        hasPart: [{ '@id': `${canonicalUrl}#services-list` }, { '@id': `${canonicalUrl}#faq` }],
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: getBreadcrumbItems(canonicalUrl),
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: selectedFaqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#services-list`,
        name: 'Connor Love services',
        itemListElement: serviceFocus.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            name: service.title,
            description: service.text,
            provider: {
              '@id': `${SITE_URL}/#organization`,
            },
            areaServed: serviceAreas,
          },
        })),
      },
      ...projectSchema,
    ],
  };
};

function CustomHead({ title = '', description, keywords, project, pageType }) {
  const router = useRouter();
  const normalizedPath = normalizePath(router.asPath);
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const openGraphType = project ? 'article' : 'website';

  return (
    <NextHead>
      {/* General Meta Tags */}
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta httpEquiv="x-dns-prefetch-control" content="off" />
      <meta name="robots" content={process.env.NODE_ENV !== 'development' ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,nofollow'} />
      <meta name="googlebot" content={process.env.NODE_ENV !== 'development' ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,nofollow'} />
      <meta name="bingbot" content={process.env.NODE_ENV !== 'development' ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,nofollow'} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {keywords?.length ? <meta name="keywords" content={keywords.join(',')} /> : null}
      <meta name="author" content="Connor Love" />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="geo.region" content="US-OH" />
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
          __html: JSON.stringify(
            getSchema({
              canonicalUrl,
              title,
              description,
              project,
              pageType,
            }),
          ),
        }}
      />
    </NextHead>
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
    topics: PropTypes.arrayOf(PropTypes.string),
    faqs: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
      }),
    ),
    liveLink: PropTypes.string,
    githubLink: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
      }),
    ),
  }),
  pageType: PropTypes.oneOf(['home', 'about', 'projects']),
};

CustomHead.defaultProps = {
  keywords: [],
  project: null,
  pageType: 'home',
};

export default CustomHead;
