/* eslint-disable react/no-danger */
import NextHead from 'next/head';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { OG_IMAGE, OG_IMAGE_ALT, SITE_NAME, SITE_URL, TWITTER_HANDLE, sameAsProfiles, serviceAreas, serviceFocus } from '@src/constants/seo';

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

const getArticleSchema = ({ canonicalUrl, title, description, article, articles = [] }) => {
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const personId = `${SITE_URL}/#person`;
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const blogId = `${SITE_URL}/articles#blog`;
  const commonGraph = [
    {
      '@type': 'Person',
      '@id': personId,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/icon.png`,
      sameAs: sameAsProfiles,
    },
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.png`,
      },
      founder: {
        '@id': personId,
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: {
        '@id': organizationId,
      },
      inLanguage: 'en-US',
    },
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
            '@id': websiteId,
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
            '@id': personId,
            name: article.author,
          },
          publisher: {
            '@id': organizationId,
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
        '@id': personId,
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
          '@id': websiteId,
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
          '@id': organizationId,
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
        jobTitle: 'Ohio Web Developer, Creative Developer & Frontend Developer',
        alternateName: ['Connor Love Web Developer', 'Connor Love Ohio Web Developer', 'Connor Love Columbus Web Developer'],
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
          'Web developer',
          'Ohio web developer',
          'Columbus Ohio web developer',
          'Website development',
          'Web development',
          'Web development in Ohio',
          'Creative development',
          'Creative developer',
          'Frontend development',
          'Frontend developer',
          'Web applications',
          'Interactive websites',
          'React development',
          'Next.js development',
          'Product interface development',
          'AI product interfaces',
          'Global remote web development',
          'SEO',
          'AEO',
          'GEO',
          'Generative engine optimization',
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
        alternateName: ['Connor Love Creative Development', 'Connor Love Web Development', 'Connor Love Ohio Web Developer'],
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
        name: 'Connor Love Web Development',
        alternateName: ['Connor Love', 'Connor Love Creative Development', 'Connor Love Ohio Web Developer'],
        url: SITE_URL,
        image: OG_IMAGE,
        logo: `${SITE_URL}/icon.png`,
        founder: {
          '@id': `${SITE_URL}/#person`,
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Columbus',
          addressRegion: 'OH',
          addressCountry: 'US',
        },
        areaServed: serviceAreas,
        knowsAbout: [
          'Web development',
          'Website development',
          'Ohio web development',
          'React',
          'Next.js',
          'Three.js',
          'TypeScript',
          'Product interfaces',
          'AI product interfaces',
          'Performance optimization',
          'SEO',
          'AEO',
          'GEO',
          'Structured data',
        ],
        description:
          'Connor Love is an Ohio web developer based in Columbus who builds custom websites, web applications, interactive digital experiences, and AI product interfaces for businesses across Ohio and remote teams worldwide.',
        hasOfferCatalog: {
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
        alternateName: ['Connor Love Portfolio', 'Connor Love Web Developer Portfolio', 'Ohio Web Developer Portfolio'],
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

function CustomHead({ title = '', description, keywords, project, pageType, article, articles }) {
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
      {keywords?.length ? <meta name="keywords" content={keywords.join(',')} /> : null}
      <meta name="author" content={article?.author || 'Connor Love'} />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="geo.region" content="US-OH" />
      <meta name="geo.placename" content="Columbus, Ohio" />
      <meta name="coverage" content="Columbus, Ohio; Central Ohio; Ohio; United States; Worldwide" />
      <meta name="subject" content="Ohio web development, website development, frontend development, React development, Next.js development, SEO, AEO, and GEO" />
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
  keywords: PropTypes.arrayOf(PropTypes.string),
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
  keywords: [],
  project: null,
  pageType: 'home',
  article: null,
  articles: [],
};

export default CustomHead;
