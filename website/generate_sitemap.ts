import { generateSitemap } from 'sitemap-ts'

generateSitemap({
  hostname: 'https://kotet.jp',
  basePath: '/suntime-ics-distribution',
  outDir: 'dist/client',
  generateRobotsTxt: false,
});