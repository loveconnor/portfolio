const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDirectory = path.join(process.cwd(), 'content', 'articles');
const articleDates = new Map();

if (fs.existsSync(articlesDirectory)) {
  fs.readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith('.md') && !fileName.startsWith('_'))
    .forEach((fileName) => {
      const { data } = matter(fs.readFileSync(path.join(articlesDirectory, fileName), 'utf8'));
      if (data.draft) return;

      const slug = String(data.slug || fileName.replace(/\.md$/, ''));
      const dateValue = data.dateModified || data.updated || data.dateReleased || data.date;
      if (!dateValue) return;

      const parsedDate = dateValue instanceof Date ? dateValue : new Date(`${dateValue}T12:00:00Z`);
      if (!Number.isNaN(parsedDate.getTime())) {
        articleDates.set(`/articles/${slug}`, parsedDate.toISOString());
      }
    });
}

const latestArticleDate = [...articleDates.values()].sort().at(-1);

module.exports = {
  siteUrl: 'https://www.connorlove.com',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  exclude: ['/articles/feed.xml'],
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    const isHome = path === '/';
    const isProjectCaseStudy = path.startsWith('/projects/');
    const isArticle = articleDates.has(path);

    return {
      loc: path,
      changefreq: isProjectCaseStudy || isArticle ? 'monthly' : config.changefreq,
      priority: isHome ? 1 : isProjectCaseStudy || isArticle ? 0.8 : 0.9,
      lastmod: articleDates.get(path) || (path === '/articles' ? latestArticleDate : new Date().toISOString()),
    };
  },
};
