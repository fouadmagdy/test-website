/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'zcadminpanel.zcltsdev.com',
      'via.placeholder.com',
      'tecdn.b-cdn.net',
      'zcadminpanel.zcltsdev.comundefined',
      'zcadminpanel.zcltsdev.com',
      'placehold.co',
      'placehold.jp',
      'encrypted-tbn0.gstatic.com'
    ],
  },
  output: 'standalone',
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
