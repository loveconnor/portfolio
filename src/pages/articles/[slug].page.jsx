/* eslint-disable react/jsx-props-no-spreading */
import CustomHead from '@src/components/dom/CustomHead';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import { getAllArticles, getArticleBySlug } from '@src/lib/articles';
import formatArticleDate from '@src/utils/articles';
import remarkGfm from 'remark-gfm';
import styles from '@src/pages/articles/styles/article.module.scss';

function Page({ article }) {
  return (
    <>
      <CustomHead title={`${article.title} | Connor Love`} description={article.description} keywords={['Connor Love', article.title, ...article.tags]} pageType="articles" article={article} />

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
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
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
