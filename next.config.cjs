/** Next.js config for static export and GitHub Pages */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/oss_catalog' : '',
  assetPrefix: isProd ? '/oss_catalog' : '',
};
