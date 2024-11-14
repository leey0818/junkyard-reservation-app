import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: process.env.CI ? 'standalone' : undefined,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
