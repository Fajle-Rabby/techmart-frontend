/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.techmart.com.bd',
        pathname: '/image/**',
      },
    ],
  },
};

module.exports = nextConfig;
