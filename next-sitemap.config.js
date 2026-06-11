module.exports = {
  siteUrl: 'https://connorlove.com',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    const isHome = path === '/';
    const isProjectCaseStudy = path.startsWith('/projects/');

    return {
      loc: path,
      changefreq: isProjectCaseStudy ? 'monthly' : config.changefreq,
      priority: isHome ? 1 : isProjectCaseStudy ? 0.8 : 0.9,
      lastmod: new Date().toISOString(),
    };
  },
};
