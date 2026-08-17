/* eslint-disable react/jsx-props-no-spreading */
import CustomHead from '@src/components/dom/CustomHead';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import Link from 'next/link';
import clsx from 'clsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@src/components/ui/DropdownMenu';
import { getAllArticles } from '@src/lib/articles';
import formatArticleDate from '@src/utils/articles';
import { useRouter } from 'next/router';
import styles from '@src/pages/articles/styles/articles.module.scss';

const POSTS_PER_PAGE = 5;

const seo = {
  title: 'Articles on Design & Development | Connor Love',
  description: 'Notes on web development, artificial intelligence, design, and building thoughtful digital products.',
};

const getPageHref = (tag, page) => {
  const query = new URLSearchParams();
  if (tag) query.set('tag', tag);
  if (page > 1) query.set('page', String(page));
  return query.size ? `/articles?${query.toString()}` : '/articles';
};

function ArticleRow({ article }) {
  return (
    <article className={styles.articleItem}>
      <Link className={styles.articleRow} scroll={false} href={`/articles/${article.slug}`} aria-label={`Read ${article.title}`}>
        <div className={styles.articleDetails}>
          <time className="p-x" dateTime={article.dateReleased}>
            {formatArticleDate(article.dateReleased)}
          </time>
          <p className={clsx(styles.author, 'p-x')}>By {article.author}</p>
        </div>

        <div className={styles.articleCopy}>
          {article.tags.length > 0 && <p className={clsx(styles.tags, 'p-x')}>{article.tags.join(' · ')}</p>}
          <h2 className={clsx(styles.articleTitle, 'h4')}>{article.title}</h2>
          <p className={clsx(styles.articleDescription, 'p-l')}>{article.description}</p>
          <span className={clsx(styles.readLink, 'p-x')}>
            Read article <span aria-hidden="true">↗</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

function Page({ articles }) {
  const router = useRouter();
  const tags = [...new Set(articles.flatMap((article) => article.tags))];
  const selectedTag = typeof router.query.tag === 'string' && tags.includes(router.query.tag) ? router.query.tag : '';
  const requestedPage = typeof router.query.page === 'string' ? Number.parseInt(router.query.page, 10) : 1;
  const filteredArticles = selectedTag ? articles.filter((article) => article.tags.includes(selectedTag)) : articles;
  const pageCount = Math.max(1, Math.ceil(filteredArticles.length / POSTS_PER_PAGE));
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 && requestedPage <= pageCount ? requestedPage : 1;
  const visibleArticles = filteredArticles.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handleTagChange = (tag) => {
    router.push(getPageHref(tag, 1), undefined, { scroll: false });
  };

  return (
    <>
      <CustomHead {...seo} pageType="articles" articles={articles} />

      <section className={clsx(styles.hero, 'layout-grid-inner')}>
        <p className={clsx(styles.eyebrow, 'p-x')}>Notes on design & development</p>
        <h1 className={clsx(styles.pageTitle, 'h1')}>Articles</h1>
        <p className={clsx(styles.intro, 'h5')}>Ideas, experiments, and practical lessons from making digital products for the web.</p>
      </section>

      <section className={clsx(styles.archive, 'layout-grid-inner')} aria-label="Article archive">
        <div className={styles.archiveHeader}>
          <div className={styles.archiveActions}>
            {tags.length > 0 && (
              <div className={styles.filter}>
                <span className="p-x">Filter by topic</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button" className={clsx(styles.topicTrigger, 'p-x')} aria-label="Filter articles by topic">
                      <span>{selectedTag || 'All topics'}</span>
                      <span className={styles.chevron} aria-hidden="true">
                        <svg viewBox="0 0 20 20">
                          <path d="m5 7.5 5 5 5-5" />
                        </svg>
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup value={selectedTag} onValueChange={handleTagChange}>
                      <DropdownMenuRadioItem className="p-x" value="">
                        All topics
                      </DropdownMenuRadioItem>
                      {tags.map((tag) => (
                        <DropdownMenuRadioItem className="p-x" value={tag} key={tag}>
                          {tag}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            <ButtonLink href="/articles/feed.xml" label="RSS FEED" reloadDocument />
          </div>
        </div>

        <div className={styles.articleList}>
          {visibleArticles.length > 0 ? (
            visibleArticles.map((article) => <ArticleRow article={article} key={article.slug} />)
          ) : (
            <div className={styles.emptyState}>
              <h3 className="h4">No articles found.</h3>
              <p className="p-l">Choose another topic to see the available writing.</p>
            </div>
          )}
        </div>

        {pageCount > 1 && (
          <nav className={styles.pagination} aria-label="Article pages">
            {currentPage > 1 ? (
              <Link className="p-x" href={getPageHref(selectedTag, currentPage - 1)}>
                ← Previous
              </Link>
            ) : (
              <span />
            )}
            <span className="p-x">
              {currentPage} / {pageCount}
            </span>
            {currentPage < pageCount ? (
              <Link className="p-x" href={getPageHref(selectedTag, currentPage + 1)}>
                Next →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </section>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      articles: getAllArticles().map(({ content, ...article }) => article),
    },
  };
}

export default Page;
