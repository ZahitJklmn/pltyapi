/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://pltyapitokat.com',
  generateRobotsTxt: true,
  sourceDir: '.next',
  exclude: [
    '/app/debug',
    '/app/api',
    '/app/test-storage'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/app/debug',
          '/app/api',
          '/app/test-storage'
        ]
      }
    ]
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  }
}
