/* eslint-disable react/jsx-props-no-spreading */
import CustomHead from '@src/components/dom/CustomHead';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import { getAllArticles, getArticleBySlug } from '@src/lib/articles';
import formatArticleDate from '@src/utils/articles';
import remarkGfm from 'remark-gfm';
import SamenessMachine from '@src/pages/articles/components/SamenessMachine';
import styles from '@src/pages/articles/styles/article.module.scss';

const articleImageDimensions = {
  '/articles/internet-sameness/default-websites-transparent.png': { width: 1462, height: 754 },
  '/articles/internet-sameness/purpose-shaped-websites-transparent.png': { width: 1450, height: 832 },
};

const markdownComponents = {
  p: ({ node, children }) => {
    const containsOnlyImage = node.children.length === 1 && node.children[0].tagName === 'img';

    return containsOnlyImage ? children : <p>{children}</p>;
  },
  img: ({ src, alt, title }) => {
    const dimensions = articleImageDimensions[src] || { width: 1536, height: 1024 };

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
          <SamenessMachine />
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
        <Link className={clsx(styles.backLink, 'p-x')} scroll={false} href="/articles">
          <span aria-hidden="true">←</span> All articles
        </Link>

        <div className={styles.heading}>
          <time className={clsx(styles.meta, 'p-x')} dateTime={article.dateReleased}>
            {formatArticleDate(article.dateReleased, true)}
          </time>
          <h1 className={clsx(styles.title, 'h1')}>{article.title}</h1>
          <p className={clsx(styles.subtitle, 'h5')}>{article.subtitle || article.description}</p>
        </div>
      </section>

      <section className={clsx(styles.articleSection, 'layout-grid-inner')}>
        <aside className={styles.articleAside} aria-label="Article details">
          <div>
            <p className={clsx(styles.asideLabel, 'p-x')}>Written by</p>
            <p className="p-l">{article.author}</p>
          </div>
          {article.tags.length > 0 && (
            <div>
              <p className={clsx(styles.asideLabel, 'p-x')}>Topics</p>
              <ul className={styles.topicList}>
                {article.tags.map((tag) => (
                  <li className="p-x" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <article className={clsx(styles.articleBody, 'typeset', 'typeset-docs')}>
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
