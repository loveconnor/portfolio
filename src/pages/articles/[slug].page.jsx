/* eslint-disable react/jsx-props-no-spreading */
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import CustomHead from '@src/components/dom/CustomHead';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import { getAllArticles, getArticleBySlug } from '@src/lib/articles';
import formatArticleDate from '@src/utils/articles';
import remarkGfm from 'remark-gfm';
import SamenessMachine from '@src/pages/articles/components/SamenessMachine';
import ArticleAnimation from '@src/pages/articles/components/ArticleAnimation';
import styles from '@src/pages/articles/styles/article.module.scss';

const articleImageDimensions = {
  '/articles/internet-sameness/default-websites-transparent.png': { width: 1462, height: 754 },
  '/articles/internet-sameness/purpose-shaped-websites-transparent.png': { width: 1450, height: 832 },
  '/articles/room/daylight.webp': { width: 1440, height: 900 },
  '/articles/room/desktop.webp': { width: 1440, height: 900 },
  '/articles/room/night.webp': { width: 1440, height: 900 },
  '/articles/room/entrance.mp4': { width: 960, height: 600, poster: '/articles/room/entrance.webp' },
  '/articles/room/book.mp4': { width: 960, height: 600, poster: '/articles/room/book.webp' },
};

const markdownComponents = {
  p: ({ node, children }) => {
    const containsOnlyImage = node.children.length === 1 && node.children[0].tagName === 'img';

    return containsOnlyImage ? children : <p>{children}</p>;
  },
  img: ({ src, alt, title }) => {
    const dimensions = articleImageDimensions[src] || { width: 1536, height: 1024 };

    if (dimensions.poster) {
      return <ArticleAnimation src={src} poster={dimensions.poster} alt={alt || ''} title={title} width={dimensions.width} height={dimensions.height} />;
    }

    return (
      <figure className={styles.articleFigure}>
        <Image src={src} alt={alt || ''} width={dimensions.width} height={dimensions.height} sizes="(max-width: 768px) 88vw, 42rem" />
        {title && <figcaption>{title}</figcaption>}
      </figure>
    );
  },
};

function ArticleContent({ content }) {
  const [beforeDemo, afterDemo] = content.split('[[SAMENESS_MACHINE]]');

  return (
    <>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {beforeDemo}
      </ReactMarkdown>
      {afterDemo !== undefined && (
        <>
          <div className={styles.wide}>
            <SamenessMachine />
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {afterDemo}
          </ReactMarkdown>
        </>
      )}
    </>
  );
}

function Page({ article }) {
  return (
    <>
      <CustomHead title={`${article.title} | Connor Love`} description={article.description} pageType="articles" article={article} />

      <section className={clsx(styles.hero, 'layout-grid-inner')}>
        <Link className={clsx(styles.backLink, 'p-l')} scroll={false} href="/articles">
          <span aria-hidden="true">←</span> All articles
        </Link>
        <div className={styles.heading}>
          <AppearTitle>
            <h1 className="h2">{article.title}</h1>
          </AppearTitle>
        </div>
        <div className={styles.subtitle}>
          <AppearTitle>
            <p className="h6">{article.subtitle || article.description}</p>
          </AppearTitle>
        </div>
        <dl className={styles.meta}>
          <div>
            <dt className="p-l">Published</dt>
            <dd className="p-l">
              <time dateTime={article.dateReleased}>{formatArticleDate(article.dateReleased)}</time>
            </dd>
          </div>
          {article.tags.length > 0 && (
            <div>
              <dt className="p-l">Topics</dt>
              <dd className="p-l">{article.tags.join(', ')}</dd>
            </div>
          )}
        </dl>
      </section>

      <section className={clsx(styles.articleSection, 'layout-grid-inner')}>
        <article className={clsx(styles.articleBody, 'typeset')}>
          <ArticleContent content={article.content} />
        </article>
      </section>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: getAllArticles().map((article) => ({ params: { slug: article.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug);
  return article ? { props: { article } } : { notFound: true };
}

export default Page;
