/* eslint-disable react/no-danger */
import NextHead from 'next/head';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CONTACT_EMAIL } from '@src/constants/contact';
import { LOCATION_NAME, OG_IMAGE, OG_IMAGE_ALT, PROFESSIONAL_TITLE, SITE_NAME, SITE_URL, TWITTER_HANDLE, sameAsProfiles, serviceAreas, serviceFocus } from '@src/constants/seo';

const PERSON_ID = `${SITE_URL}/#person`;
const SERVICE_ID = `${SITE_URL}/#professional-service`;
const WEBSITE_ID = `${SITE_URL}/#website`;

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

const getPersonSchema = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE_NAME,
  jobTitle: PROFESSIONAL_TITLE,
  description: `${SITE_NAME} is a ${PROFESSIONAL_TITLE.toLowerCase()} based in ${LOCATION_NAME}.`,
  url: SITE_URL,
  image: `${SITE_URL}/connor/front.webp`,
  email: CONTACT_EMAIL,
  worksFor: {
    '@id': SERVICE_ID,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Columbus',
    addressRegion: 'OH',
    addressCountry: 'US',
  },
  knowsAbout: ['Web development', 'Frontend development', 'Web applications', 'React', 'Next.js', 'Three.js', 'Accessible web development', 'Web performance', 'Interaction design'],
  knowsLanguage: 'en-US',
  sameAs: sameAsProfiles,
});

const getProfessionalServiceSchema = ({ includeOfferCatalog = true } = {}) => {
  const schema = {
    '@type': 'ProfessionalService',
    '@id': SERVICE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    image: OG_IMAGE,
    logo: `${SITE_URL}/icon.png`,
    email: CONTACT_EMAIL,
    founder: {
      '@id': PERSON_ID,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Columbus',
      addressRegion: 'OH',
      addressCountry: 'US',
    },
    areaServed: serviceAreas,
    description: `${SITE_NAME} is a ${PROFESSIONAL_TITLE.toLowerCase()} in ${LOCATION_NAME}, building custom websites, web applications, and interactive product experiences.`,
    sameAs: sameAsProfiles,
  };

  if (includeOfferCatalog) {
    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Web development services',
      itemListElement: serviceFocus.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          serviceType: service.title,
          description: service.text,
          provider: {
            '@id': SERVICE_ID,
          },
          areaServed: serviceAreas,
        },
      })),
    };
  }

  return schema;
};

const getWebsiteSchema = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: SITE_NAME,
  alternateName: 'Connor Love Portfolio',
  publisher: {
    '@id': SERVICE_ID,
  },
  inLanguage: 'en-US',
});

const getArticleSchema = ({ canonicalUrl, title, description, article, articles = [] }) => {
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const blogId = `${SITE_URL}/articles#blog`;
  const commonGraph = [
    getPersonSchema(),
    getProfessionalServiceSchema({ includeOfferCatalog: false }),
    getWebsiteSchema(),
    {
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: getBreadcrumbItems(canonicalUrl),
    },
  ];

  if (article) {
    const articleId = `${canonicalUrl}#article`;
    const imageUrl = getAbsoluteAssetUrl(article.ogImage);

    return {
      '@context': 'https://schema.org',
      '@graph': [
        ...commonGraph,
        {
          '@type': 'WebPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: title,
          description,
          isPartOf: {
            '@id': WEBSITE_ID,
          },
          breadcrumb: {
            '@id': breadcrumbId,
          },
          mainEntity: {
            '@id': articleId,
          },
          inLanguage: 'en-US',
        },
        {
          '@type': 'BlogPosting',
          '@id': articleId,
          url: canonicalUrl,
          headline: article.title,
          alternativeHeadline: article.subtitle || undefined,
          description: article.description,
          image: {
            '@type': 'ImageObject',
            url: imageUrl,
            width: 1200,
            height: 630,
          },
          datePublished: article.dateReleased,
          dateModified: article.dateModified,
          author: {
            '@id': PERSON_ID,
            name: article.author,
          },
          publisher: {
            '@id': SERVICE_ID,
          },
          mainEntityOfPage: {
            '@id': `${canonicalUrl}#webpage`,
          },
          isPartOf: {
            '@id': blogId,
          },
          articleSection: article.category,
          keywords: article.tags,
          about: article.tags.map((tag) => ({
            '@type': 'Thing',
            name: tag,
          })),
          wordCount: article.wordCount,
          inLanguage: 'en-US',
        },
      ],
    };
  }

  const blogPosts = articles.map((item) => {
    const url = `${SITE_URL}/articles/${item.slug}`;
    return {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      url,
      headline: item.title,
      description: item.description,
      datePublished: item.dateReleased,
      dateModified: item.dateModified,
      image: getAbsoluteAssetUrl(item.ogImage),
      author: {
        '@id': PERSON_ID,
      },
      articleSection: item.category,
      keywords: item.tags,
    };
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...commonGraph,
      {
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        isPartOf: {
          '@id': WEBSITE_ID,
        },
        breadcrumb: {
          '@id': breadcrumbId,
        },
        mainEntity: {
          '@id': blogId,
        },
        hasPart: {
          '@id': `${canonicalUrl}#article-list`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Blog',
        '@id': blogId,
        url: `${SITE_URL}/articles`,
        name: 'Connor Love Articles',
        description,
        publisher: {
          '@id': SERVICE_ID,
        },
        mainEntityOfPage: {
          '@id': `${canonicalUrl}#webpage`,
        },
        blogPost: blogPosts,
        inLanguage: 'en-US',
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#article-list`,
        name: 'Connor Love articles',
        numberOfItems: blogPosts.length,
        itemListElement: blogPosts.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@id': item['@id'],
          },
        })),
      },
    ],
  };
};

const getSchema = ({ canonicalUrl, title, description, project, pageType, article, articles }) => {
  if (pageType === 'articles') {
    return getArticleSchema({ canonicalUrl, title, description, article, articles });
  }

  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
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
            '@id': PERSON_ID,
          },
          about: project.topics || ['Creative development', 'Frontend development', 'Website development', 'Interactive web applications', 'Product interface design'],
          description: project.desc.join(' '),
          sameAs: [project.liveLink, project.githubLink].filter(Boolean),
        },
      ]
    : [];
  let mainEntity;

  if (project) {
    mainEntity = { '@id': `${canonicalUrl}#creative-work` };
  } else if (pageType === 'about') {
    mainEntity = { '@id': PERSON_ID };
  } else if (pageType === 'home') {
    mainEntity = { '@id': SERVICE_ID };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      getPersonSchema(),
      getProfessionalServiceSchema(),
      getWebsiteSchema(),
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        isPartOf: {
          '@id': WEBSITE_ID,
        },
        author: {
          '@id': PERSON_ID,
        },
        publisher: {
          '@id': SERVICE_ID,
        },
        about: {
          '@id': PERSON_ID,
        },
        breadcrumb: {
          '@id': breadcrumbId,
        },
        mainEntity,
        hasPart: {
          '@id': `${canonicalUrl}#services-list`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: getBreadcrumbItems(canonicalUrl),
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
            serviceType: service.title,
            description: service.text,
            provider: {
              '@id': SERVICE_ID,
            },
            areaServed: serviceAreas,
          },
        })),
      },
      ...projectSchema,
    ],
  };
};

function CustomHead({ title = '', description, project, pageType, article, articles }) {
  const router = useRouter();
  const normalizedPath = normalizePath(router.asPath);
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const openGraphType = project || article ? 'article' : 'website';
  const socialImage = article?.ogImage ? getAbsoluteAssetUrl(article.ogImage) : OG_IMAGE;
  const socialImageAlt = article ? `${article.title} — article by ${article.author}` : OG_IMAGE_ALT;

  return (
    <NextHead>
      {/* General Meta Tags */}
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta httpEquiv="x-dns-prefetch-control" content="off" />
      <meta name="robots" content={process.env.NODE_ENV !== 'development' ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,nofollow'} />
      <meta name="googlebot" content={process.env.NODE_ENV !== 'development' ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,nofollow'} />
      <meta name="bingbot" content={process.env.NODE_ENV !== 'development' ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,nofollow'} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content={article?.author || 'Connor Love'} />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="geo.region" content="US-OH" />
      <meta name="geo.placename" content="Columbus, Ohio" />
      <meta name="coverage" content="Columbus, Ohio; Central Ohio; Ohio; United States; Worldwide" />
      <meta name="description" content={description} />

      {/* Canonical and Title */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-US" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      {pageType === 'articles' ? <link rel="alternate" type="application/rss+xml" title="Connor Love — Articles" href={`${SITE_URL}/articles/feed.xml`} /> : null}
      <link rel="author" href={`${SITE_URL}/`} />
      <title>{title}</title>

      {/* OpenGraph Meta Tags */}
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:secure_url" content={socialImage} />
      <meta property="og:image:alt" content={socialImageAlt} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={openGraphType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      {article ? <meta property="article:published_time" content={article.dateReleased} /> : null}
      {article ? <meta property="article:modified_time" content={article.dateModified} /> : null}
      {article ? <meta property="article:author" content={`${SITE_URL}/`} /> : null}
      {article ? <meta property="article:section" content={article.category} /> : null}
      {article?.tags.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={socialImageAlt} />
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
              article,
              articles,
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
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    desc: PropTypes.arrayOf(PropTypes.string).isRequired,
    topics: PropTypes.arrayOf(PropTypes.string),
    liveLink: PropTypes.string,
    githubLink: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        tag: PropTypes.string.isRequired,
      }),
    ),
  }),
  pageType: PropTypes.oneOf(['home', 'about', 'projects', 'articles']),
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    description: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    dateReleased: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    ogImage: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    wordCount: PropTypes.number.isRequired,
  }),
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      dateReleased: PropTypes.string.isRequired,
      dateModified: PropTypes.string.isRequired,
      ogImage: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ),
};

CustomHead.defaultProps = {
  project: null,
  pageType: 'home',
  article: null,
  articles: [],
};

export default CustomHead;
