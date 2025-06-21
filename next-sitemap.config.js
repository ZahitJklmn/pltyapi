/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.pltyapitokat.com', // ← Burayı kendi domaininle değiştir
    generateRobotsTxt: true,
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
    }
  };
  